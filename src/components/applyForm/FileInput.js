import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const InputWrapper = styled.div`
  position: relative;
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

const StyledInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const PlaceholderPreview = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  max-width: 100%;
  border-radius: 4px;
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
`;

const FileIcon = styled(FileCopyIcon)`
  height: 48px !important;
  width: 48px !important;
  color: ${({ theme }) => theme.colors.white};
`;

const FileInput = ({ name, blur, label, errorMessage }) => {
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
      <PlaceholderPreview htmlFor="file" className="animated-img">
        <FileIcon />
      </PlaceholderPreview>
      <StyledInput id={name} type="file" name={name} onBlur={blur} />
    </InputWrapper>
  );
};

export default FileInput;
