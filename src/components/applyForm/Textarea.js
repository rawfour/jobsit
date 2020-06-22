import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

const TextareaWrapper = styled.div`
  @media ${({ theme }) => theme.breakpoints.xxl} {
    flex-basis: 100%;
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

const StyledTextarea = styled.textarea`
  margin-bottom: 20px;
  height: 100px;
  width: 100%;
  max-width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  transition: 0.2s;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-family: 'Montserrat', sans-serif;
  color: ${({ theme }) => theme.colors.text};
  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Textarea = ({ name, value, blur, action, label, errorMessage }) => {
  return (
    <TextareaWrapper>
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

      <StyledTextarea id={name} name={name} value={value} onBlur={blur} onChange={action} />
    </TextareaWrapper>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  blur: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default Textarea;
