import React, { useState, createRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  color: ${({ theme }) => theme.colors.primary};
`;

const FileName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.s};
  color: ${({ theme }) => theme.colors.primary};
`;

const FileInput = ({ field: { name }, label, setFieldValue, errorMessage }) => {
  const [file, setFile] = useState({ name: undefined, file: undefined });

  const fileUpload = createRef();

  const showFileUpload = () => {
    if (fileUpload) {
      fileUpload.current.click();
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const loadedFile = e.target.files[0];

    if (loadedFile) {
      reader.onload = () => {
        setFile({
          name: loadedFile.name,
          file: loadedFile,
        });
      };
      reader.readAsDataURL(loadedFile);
      setFieldValue(name, loadedFile);
    }
  };

  return (
    <InputWrapper>
      {label && (
        <LabelWrapper htmlFor={name}>
          <Label>{label}</Label>
          {errorMessage && (
            <>
              <pre> </pre>
              <ErrorText>* {errorMessage}</ErrorText>
            </>
          )}
        </LabelWrapper>
      )}
      <PlaceholderPreview htmlFor="file" onClick={showFileUpload}>
        <FileIcon />
        {file.name && <FileName>{file.name}</FileName>}
      </PlaceholderPreview>
      <StyledInput
        id={name}
        type="file"
        name={name}
        onChange={handleImageChange}
        ref={fileUpload}
      />
    </InputWrapper>
  );
};

FileInput.propTypes = {
  field: PropTypes.shape().isRequired,
  setFieldValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

FileInput.defaultProps = {
  errorMessage: false,
};

export default FileInput;
