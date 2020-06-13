import React from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';

const Modal = ({ children, open, onClose }) => {
  const ContentWrapper = styled.div`
    padding: 20px;
  `;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <ContentWrapper>{children}</ContentWrapper>
    </Dialog>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
