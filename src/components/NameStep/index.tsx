import React from 'react';
import {FormControl, HStack, Input, VStack} from 'native-base';

import {Controller, useFormContext} from 'react-hook-form';

const NameStep = () => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  return (
    <VStack space={4} py={4}>
      <HStack mt={4} space={4}>
        <FormControl flex={1} isRequired isInvalid={'firstName' in errors}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="First name"
                autoCapitalize={'none'}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="firstName"
          />

          {errors.firstName && (
            <FormControl.ErrorMessage>
              {errors.firstName.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl flex={1} isRequired isInvalid={'lastName' in errors}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Last name"
                autoCapitalize={'none'}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="lastName"
          />
          {errors.lastName && (
            <FormControl.ErrorMessage>
              {errors.lastName.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
      </HStack>

      <FormControl isRequired isInvalid={'middleName' in errors}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Middle name"
              autoCapitalize={'none'}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="middleName"
        />

        {errors.middleName && (
          <FormControl.ErrorMessage>
            {errors.middleName.message}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    </VStack>
  );
};

export default NameStep;
