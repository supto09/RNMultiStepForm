import React from 'react';

import {Controller, useFormContext} from 'react-hook-form';
import {FormControl, HStack, Input, VStack} from 'native-base';

const CadetInfoStep = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  console.log('Error', errors);

  return (
    <VStack space={4} py={4}>
      <FormControl mt={4} isRequired isInvalid={'cadetName' in errors}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Cadet name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="cadetName"
        />
        {errors.cadetName && (
          <FormControl.ErrorMessage>
            {errors.cadetName.message}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <HStack space={4}>
        <FormControl flex={1} isRequired isInvalid={'cadetNo' in errors}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Cadet no"
                autoCapitalize={'none'}
                keyboardType={'numeric'}
                value={value > 0 ? value.toString() : ''}
                onChangeText={text => {
                  onChange(parseInt(text, 10) || 0);
                }}
                onBlur={onBlur}
              />
            )}
            name="cadetNo"
          />
          {errors.cadetNo && (
            <FormControl.ErrorMessage>
              {errors.cadetNo.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl flex={1} isRequired isInvalid={'intakeNo' in errors}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                autoCapitalize={'none'}
                keyboardType={'numeric'}
                placeholder="Intake no"
                value={value > 0 ? value.toString() : ''}
                onChangeText={text => {
                  onChange(parseInt(text, 10) || 0);
                }}
                onBlur={onBlur}
              />
            )}
            name="intakeNo"
          />
          {errors.intakeNo && (
            <FormControl.ErrorMessage>
              {errors.intakeNo.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      </HStack>
    </VStack>
  );
};

export default CadetInfoStep;
