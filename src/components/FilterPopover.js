import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const ContentWrapper = styled.div`
  padding: 20px;
`;

const FilterPopover = ({ children, onClose, anchorEl }) => {
  const useStyles = makeStyles(() => ({
    backdrop: {
      zIndex: 100,
    },
    popover: {
      marginTop: 15,
    },
  }));

  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Backdrop className={classes.backdrop} open={open} onClick={onClose} />
      <Popover
        style={{ zIndex: 999 }}
        className={classes.popover}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ContentWrapper>{children}</ContentWrapper>
      </Popover>
    </>
  );
};

FilterPopover.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
  anchorEl: PropTypes.shape().isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterPopover;
