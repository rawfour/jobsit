import React from 'react';
import styled, { css } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: calc(100% - 60px);
  padding: 20px;
  position: relative;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.spreaded};
  border-radius: 4px;
  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 30px;
  }

  @media ${({ theme }) => theme.breakpoints.lg} {
    padding: 0 40px;
    width: 100%;
    height: 200px;
    border-radius: 0;
    background-color: transparent;
    box-shadow: none;
    position: static;
    transform: none;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    height: 150px;
  }

  @media ${({ theme }) => theme.breakpoints.xxxl} {
    height: 100px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media ${({ theme }) => theme.breakpoints.lg} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media ${({ theme }) => theme.breakpoints.xl} {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media ${({ theme }) => theme.breakpoints.xxl} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media ${({ theme }) => theme.breakpoints.xxxl} {
    /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
     */
    display: flex;
    grid-template-columns: none;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  position: relative;
  margin: 10px;
  border-radius: 4px;
  overflow: hidden;
  height: 35px;
  @media ${({ theme }) => theme.breakpoints.lg} {
    margin: 10px 20px 10px 0;
  }
  @media ${({ theme }) => theme.breakpoints.xxxl} {
    margin: 0 20px 0 0;
  }
`;

const Filter = styled.button`
  flex-basis: auto;
  color: ${({ theme }) => theme.colors.primary};
  transition: 0.2s;
  padding: 0 20px;
  height: 100%;
  border: none;
  background-color: ${({ theme }) => theme.colors.lightPrimary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.textInverse};
    background-color: ${({ theme }) => theme.colors.primary};
  }
  ${({ active }) =>
    active &&
    css`
      padding-right: 50px;
    `}
`;

const ResetFilter = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  transition: 0.2s;
  border: none;
  height: 100%;
  width: 35px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ResetAll = styled.button`
  flex-basis: 50px;
  margin-left: auto;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  transition: 0.2s;
  margin: 5px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
  @media ${({ theme }) => theme.breakpoints.lg} {
    margin: 0;
  }
`;

const Filters = () => {
  return (
    <FiltersWrapper>
      <InnerWrapper>
        <FilterWrapper>
          <Filter active>Technologies</Filter>
          <ResetFilter>
            <CloseIcon />
          </ResetFilter>
        </FilterWrapper>
        <FilterWrapper>
          <Filter active>Location</Filter>
          <ResetFilter>
            <CloseIcon />
          </ResetFilter>
        </FilterWrapper>
        <FilterWrapper>
          <Filter active>Category</Filter>
          <ResetFilter>
            <CloseIcon />
          </ResetFilter>
        </FilterWrapper>
        <FilterWrapper>
          <Filter active>Contract</Filter>
          <ResetFilter>
            <CloseIcon />
          </ResetFilter>
        </FilterWrapper>
        <FilterWrapper>
          <Filter active>Experience</Filter>
          <ResetFilter>
            <CloseIcon />
          </ResetFilter>
        </FilterWrapper>
      </InnerWrapper>
      <ResetAll>Clear</ResetAll>
    </FiltersWrapper>
  );
};

export default Filters;
