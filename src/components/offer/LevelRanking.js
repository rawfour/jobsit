import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const LevelWrapper = styled.div`
  display: none;
  @media ${({ theme }) => theme.breakpoints.sm} {
    flex-basis: auto;
    display: flex;
    align-items: center;
    margin-left: auto;
    justify-content: center;
    padding-left: 10px;
  }
`;

const Levels = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 4px;
  margin-right: 10px;
`;

const Level = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.gray};
  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
    `}
`;

const LevelValue = styled.span`
  color: ${({ theme }) => theme.colors.text};

  font-size: ${({ theme }) => theme.fontSizes.s};
`;

const LevelRanking = ({ level }) => {
  return (
    <LevelWrapper>
      <Levels>
        <Level active={level === 'Junior' || 'Mid' || 'Senior'} />
        <Level active={level === 'Mid' || 'Senior'} />
        <Level active={level === 'Senior'} />
      </Levels>
      <LevelValue>{level}</LevelValue>
    </LevelWrapper>
  );
};

LevelRanking.propTypes = {
  level: PropTypes.string.isRequired,
};

export default LevelRanking;
