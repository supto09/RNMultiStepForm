import React, {useState} from 'react';

import {Box} from 'native-base';
import {Alert, Keyboard} from 'react-native';
import NameStep from '../components/NameStep';
import * as Yup from 'yup';
import {FormStep, MultiStepForm} from '../components/MultiStepForm';
import CadetInfoStep from '../components/CadetInfoStep';
import ContactInfoStep from '../components/ContactInfoStep';

export type SignUpRequestData = {
  firstName: string;
  lastName: string;
  middleName: string;

  cadetName: string;
  cadetNo: number;
  intakeNo: number;

  phoneNumber: string;
  email: string;
};

const defaultValues: SignUpRequestData = {
  firstName: '',
  lastName: '',
  middleName: '',
  cadetName: '',
  cadetNo: 0,
  intakeNo: 0,
  phoneNumber: '',
  email: '',
};

const Application = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Box flex={1}>
      <MultiStepForm<SignUpRequestData>
        defaultValue={defaultValues}
        onBackPressed={() => Alert.alert('Info', 'Go Back!!!')}
        isLoading={loading}
        onComplete={data => {
          console.log('Submit data', data);
          Keyboard.dismiss();

          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Form Submitted');
          }, 3000);
        }}>
        <FormStep
          label={'Name'}
          title={'What’s your name?'}
          validationSchema={Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
          })}>
          <NameStep />
        </FormStep>

        <FormStep
          label={'Cadet info'}
          title={'What’s your cadet info?'}
          validationSchema={Yup.object({
            cadetName: Yup.string().required('Cadet name is required'),
            cadetNo: Yup.number()
              .required('Cadet no is required')
              .typeError('You must specify a valid cadet no')
              .moreThan(0, 'You must specify a valid cadet no'),
            intakeNo: Yup.number()
              .typeError('You must specify a valid intake no')
              .required('Intake no is required')
              .moreThan(0, 'You must specify a valid intake no'),
          })}>
          <CadetInfoStep />
        </FormStep>

        <FormStep
          label={'Contact info'}
          title={'What’s your contact info?'}
          validationSchema={Yup.object({
            phoneNumber: Yup.string().required('Phone number can not be empty'),
            email: Yup.string().email().required('Email is required'),
          })}>
          <ContactInfoStep />
        </FormStep>
      </MultiStepForm>
    </Box>
  );
};

export default Application;
