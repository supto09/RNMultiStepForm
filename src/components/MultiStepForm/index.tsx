import React, {useState} from 'react';
import {Platform, StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import {
  ArrowBackIcon,
  Box,
  Button,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import {useKeyboardState} from '../../hooks/useKeyboardState';

type FormStepProps = {
  label: string;
  title: string;
  validationSchema: any;
  children?: React.ReactNode;
};

type StepFormProps<T> = {
  defaultValue: T;
  onComplete: (data: T) => void;
  onBackPressed?: () => void;
  isLoading?: boolean;
  nextButtonLabel?: string;
  submitButtonLabel?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children: React.ReactElement<FormStepProps>[];
};

const FormStep = ({children}: FormStepProps) => {
  return <>{children}</>;
};

const MultiStepForm = <T extends {}>({
  defaultValue,
  onComplete,
  onBackPressed,
  isLoading = false,
  nextButtonLabel = 'Next',
  submitButtonLabel = 'Submit',
  contentContainerStyle,
  children,
}: StepFormProps<T>): JSX.Element => {
  const {keyboardHeight, keyboardShown} = useKeyboardState();

  const [activeStep, setActiveStep] = useState(0);

  const currentStep = children[activeStep];
  const currentValidationSchema = currentStep.props.validationSchema;

  const formMethods = useForm({
    shouldUnregister: false,
    // @ts-ignore why are you not working
    defaultValues: defaultValue,
    resolver: yupResolver(currentValidationSchema),
    mode: 'onChange',
  });
  const {handleSubmit, trigger, clearErrors} = formMethods;

  // whenever a step is changed immediately set the opacity animated value to 0
  // useEffect will make it to 1, so that there is a fadein animation
  const changeStep = (direction: 'forward' | 'backward') => {
    if (direction === 'forward') {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

  const handleNext = async () => {
    const isStepValid = await trigger();
    if (!isStepValid) {
      return;
    }

    if (activeStep < children.length - 1) {
      changeStep('forward');
    } else {
      console.log('Handle Submit');
      await handleSubmit(data => {
        console.log('Handle Submit on Complete calling');
        onComplete(data);
      })();
    }
  };

  const handleBack = () => {
    clearErrors();
    if (activeStep === 0) {
      onBackPressed?.();
    } else {
      changeStep('backward');
    }
  };

  return (
    <FormProvider {...formMethods}>
      <VStack>
        <HStack p={4} space={4} alignItems={'center'}>
          <TouchableOpacity onPress={handleBack} disabled={isLoading}>
            <ArrowBackIcon />
          </TouchableOpacity>
          <Text flex={1}>{currentStep.props.label}</Text>
          <Box borderRadius={'2xl'} bgColor={'gray.100'} px={2} py={1}>
            <Text fontSize={'xs'}>
              Step {activeStep + 1}/{children.length}
            </Text>
          </Box>
        </HStack>
        <Divider orientation={'horizontal'} bgColor={'gray.300'} />

        <ScrollView keyboardShouldPersistTaps={'always'}>
          <Box
            pb={
              keyboardShown
                ? Platform.OS === 'ios'
                  ? keyboardHeight + 64
                  : 120
                : 4
            }>
            <Box style={contentContainerStyle} p={4}>
              <Text fontSize={'lg'} fontWeight={'600'} textAlign={'center'}>
                {currentStep.props.title}
              </Text>
              {currentStep}
            </Box>

            <Button mx={4} isLoading={isLoading} onPress={handleNext}>
              {activeStep < children.length - 1
                ? nextButtonLabel
                : submitButtonLabel}
            </Button>
          </Box>
        </ScrollView>
      </VStack>
    </FormProvider>
  );
};

export {MultiStepForm, FormStep};
