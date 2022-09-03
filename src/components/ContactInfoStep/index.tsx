import React from 'react';
import {FormControl, Input, VStack} from 'native-base';
import {Controller, useFormContext} from 'react-hook-form';

const ContactInfoStep = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  return (
    <VStack space={4} py={4}>
      <FormControl isRequired isInvalid={'phoneNumber' in errors}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Phone Number"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="phoneNumber"
        />
        {errors.phoneNumber && (
          <FormControl.ErrorMessage>
            {errors.phoneNumber.message}
          </FormControl.ErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired isInvalid={'email' in errors}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              autoCapitalize={'none'}
              placeholder="Email"
              keyboardType={'email-address'}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="email"
        />
        {errors.email && (
          <FormControl.ErrorMessage>
            {errors.email.message}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};

export default ContactInfoStep;
