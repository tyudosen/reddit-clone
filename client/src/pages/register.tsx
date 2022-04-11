import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/react';
import { useMutation } from 'urql';

const StyledForm = styled(Form)`
  display: grid;
  gap: 2em;
`;

const REGISTER_MUTATION = `mutation Register($username: String!, $password: String!){
  register(options: {username:$username, password: $password}) {
    errors {
      field
      message
    }
    user {
      username
    }
  }
}`;

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  console.log('running');
  const [, register] = useMutation(REGISTER_MUTATION);

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          return register(values);
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <InputField
              label='Username'
              placeholder='username...'
              name='username'
            />
            <InputField
              label='Password'
              placeholder='password...'
              name='password'
              type='password'
            />
            <Button
              type='submit'
              isLoading={isSubmitting}
              bgColor='teal.300'
              maxW='30%'
              textTransform='uppercase'
            >
              register
            </Button>
          </StyledForm>
        )}
      </Formik>
    </Wrapper>
  );
};

export default register;
