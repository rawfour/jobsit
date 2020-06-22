import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';

const InputWrapper = styled.div`
  @media ${({ theme }) => theme.breakpoints.xxl} {
    flex-basis: 50%;
  }
`;

const LabelWrapper = styled.label`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.discard};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const StyledInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  border: none;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  transition: 0.2s;
  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Input = ({ name, type, value, blur, action, label, errorMessage }) => {
  return (
    <InputWrapper>
      {label && (
        <LabelWrapper htmlFor={name}>
          <Label>{label}</Label>

          <ErrorMessage name={errorMessage}>
            {(msg) => (
              <>
                <pre> </pre>
                <ErrorText>* {msg}</ErrorText>
              </>
            )}
          </ErrorMessage>
        </LabelWrapper>
      )}

      <StyledInput
        id={name}
        type={type}
        name={name}
        value={value}
        onBlur={blur}
        onChange={action}
      />
    </InputWrapper>
  );
};

export default Input;
