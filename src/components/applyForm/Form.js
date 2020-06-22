import React from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import Input from './Input';
import Textarea from './Textarea';
import FileInput from './FileInput';

const FormWrapper = styled.div`
  padding: 20px 0;
  margin: 20px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.breakpoints.xxl} {
    flex-direction: row;
    flex-wrap: wrap;
    & > div:first-child {
      padding-right: 10px;
    }
    & > div:nth-child(2) {
      padding-left: 10px;
    }
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  color: ${({ theme }) => theme.colors.textInverse};
  transition: 0.2s;
  padding: 10px 20px;
  height: 100%;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.m};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.lightPrimary};
  }
  @media ${({ theme }) => theme.breakpoints.xxl} {
    width: auto;
    padding: 10px 40px;
  }
`;

const initialValues = {
  email: '',
  name: '',
  introduction: '',
  file: undefined,
};

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-z]+$/i, {
      message: 'Product name should contain only letters',
      excludeEmptyString: true,
    })
    .min(2, 'Product name is too short')
    .max(20, 'Product name is too long')
    .required('Required'),
  introduction: Yup.string()
    .matches(/^[a-z]+$/i, {
      message: 'Product name should contain only letters',
      excludeEmptyString: true,
    })
    .min(2, 'Product name is too short')
    .max(20, 'Product name is too long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const ApplyForm = () => {
  return (
    <FormWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const { name, email, introduction } = values;
          console.log(name, email, introduction);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <>
            <Form id="apply" onSubmit={handleSubmit} noValidate>
              <Input
                type="email"
                name="email"
                value={values.email}
                blur={handleBlur}
                action={handleChange}
                label="E-mail"
                errorMessage="email"
              />
              <Input
                value={values.name}
                name="name"
                type="text"
                blur={handleBlur}
                action={handleChange}
                label="Full name"
                errorMessage="name"
              />
              <Textarea
                value={values.introduction}
                label="Short introduction"
                errorMessage="introduction"
                name="introduction"
                blur={handleBlur}
                action={handleChange}
              />
              <FileInput name="file" label="Upload CV" errorMessage="file" onBlur={handleBlur} />
            </Form>
            <ApplyButton type="submit" form="apply" disabled={isSubmitting}>
              Apply
            </ApplyButton>
          </>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default ApplyForm;
