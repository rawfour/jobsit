import React from 'react';
import { Formik, Field } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';
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
  file: null,
};

const file_size = 1048576;
const supported_formats = ['application/pdf'];

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^([a-zA-ZĄąŻżŹźĆćĘęŚśÓóŁłŃń]+|[a-zA-ZĄąŻżŹźĆćĘęŚśÓóŁłŃń]+\s{1}[a-zA-ZĄąŻżŹźĆćĘęŚśÓóŁłŃń]{1,}|[a-zA-ZĄąŻżŹźĆćĘęŚśÓóŁłŃń]+\s{1}[a-zA-ZĄąŻżŹźĆćĘęŚśÓóŁłŃń]{3,}\s{1}[a-zA-ZĄąŻżŹźĆćĘęŚśÓóŁłŃń]{1,})$/g,
      {
        message: 'This field should contain only letters',
        excludeEmptyString: true,
      },
    )
    .min(2, 'Name is to short')
    .max(20, 'Name is too long')
    .required('Name is equired'),
  introduction: Yup.string()
    .min(10, 'Field has too few characters')
    .max(1000, 'Field contain too many characters')
    .required('Introduction is required'),
  email: Yup.string().email('Invalid email').required('E-mail is required'),
  file: Yup.mixed()
    .required('CV is required')
    .test(
      'fileFormat',
      'Unsupported format',
      (value) => value && supported_formats.includes(value.type),
    )
    .test('fileSize', 'File too large', (value) => value && value.size <= file_size),
});

const ApplyForm = () => {
  return (
    <FormWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const { name, email, introduction, file } = values;

          const apiKey = process.env.GATSBY_ELASTIC_EMAIL_API_KEY;
          const subject = `Thanks for your apply ${name}`;
          axios
            .get(
              `https://api.elasticemail.com/v2/email/send?apikey=${apiKey}&template=10736&subject=${subject}&bodyText=${introduction}&to=${email}&from=rdziedziela1@gmail.com`,
            )
            .then((res) => {
              const result = res.data;
              console.log(result);
              resetForm({});
            });

          setSubmitting(false);
        }}
        render={({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => {
          return (
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
                <Field
                  component={FileInput}
                  errorMessage={errors.file && errors.file}
                  label="Add your CV"
                  name="file"
                  title="Select a file"
                  setFieldValue={setFieldValue}
                  onBlur={handleBlur}
                />
              </Form>
              <ApplyButton type="submit" form="apply" disabled={isSubmitting}>
                Apply
              </ApplyButton>
            </>
          );
        }}
      />
    </FormWrapper>
  );
};

export default ApplyForm;
