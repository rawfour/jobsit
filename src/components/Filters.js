import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import CloseIcon from '@material-ui/icons/Close';
import { useMediaQuery } from 'react-responsive';
import FilterPopover from './FilterPopover';
import Modal from './Modal';
// import { CHANGE_ACTIVE_FILTERS } from '../context/actionTypes';

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

const FilterName = styled.h5`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`;

const FilterItemsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterItem = styled.button`
  flex-basis: auto;
  color: ${({ theme }) => theme.colors.primary};
  transition: 0.2s;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.lightPrimary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.textInverse};
    background-color: ${({ theme }) => theme.colors.primary};
  }
  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.colors.textInverse};
      background-color: ${({ theme }) => theme.colors.primary};
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
        background-color: ${({ theme }) => theme.colors.lightPrimary};
      }
    `}
`;

const Filters = ({ theme }) => {
  const isDesktop = useMediaQuery({
    query: theme.breakpoints.md,
  });

  const data = useStaticQuery(graphql`
    {
      allMdx {
        technologies: distinct(field: frontmatter___languages)
        location: distinct(field: frontmatter___location)
        category: distinct(field: frontmatter___role)
        contract: distinct(field: frontmatter___contract)
        experience: distinct(field: frontmatter___level)
      }
    }
  `);

  const [filterOpen, setFilterOpen] = React.useState({ isOpen: false, anchorEl: null });

  const onOpen = (event) => {
    setFilterOpen({ isOpen: true, anchorEl: event.currentTarget });
  };

  const onClose = () => {
    setFilterOpen({ isOpen: false, anchorEl: null });
  };

  const firstLetterToUppercase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <FiltersWrapper>
        <InnerWrapper>
          <FilterWrapper>
            <Filter name="technologies" onClick={onOpen} active>
              Technologies
            </Filter>
            <ResetFilter>
              <CloseIcon />
            </ResetFilter>
          </FilterWrapper>
          <FilterWrapper>
            <Filter name="location" onClick={onOpen} active>
              Location
            </Filter>
            <ResetFilter>
              <CloseIcon />
            </ResetFilter>
          </FilterWrapper>
          <FilterWrapper>
            <Filter name="category" onClick={onOpen} active>
              Category
            </Filter>
            <ResetFilter>
              <CloseIcon />
            </ResetFilter>
          </FilterWrapper>
          <FilterWrapper>
            <Filter name="contract" onClick={onOpen} active>
              Contract
            </Filter>
            <ResetFilter>
              <CloseIcon />
            </ResetFilter>
          </FilterWrapper>
          <FilterWrapper>
            <Filter name="experience" onClick={onOpen} active>
              Experience
            </Filter>
            <ResetFilter>
              <CloseIcon />
            </ResetFilter>
          </FilterWrapper>
        </InnerWrapper>
        <ResetAll>Clear</ResetAll>
      </FiltersWrapper>
      {filterOpen.isOpen && (
        <>
          {isDesktop ? (
            <>
              <FilterPopover onClose={onClose} anchorEl={filterOpen.anchorEl}>
                <FilterName>{firstLetterToUppercase(filterOpen.anchorEl.name)}</FilterName>
                <FilterItemsWrapper>
                  {data.allMdx[filterOpen.anchorEl.name].map((item) => (
                    <FilterItem key={item}>{item}</FilterItem>
                  ))}
                </FilterItemsWrapper>
              </FilterPopover>
            </>
          ) : (
            <Modal open={filterOpen.isOpen} onClose={onClose}>
              <FilterName>{firstLetterToUppercase(filterOpen.anchorEl.name)}</FilterName>
              <FilterItemsWrapper>
                {data.allMdx[filterOpen.anchorEl.name].map((item) => (
                  <FilterItem key={item}>{item}</FilterItem>
                ))}
              </FilterItemsWrapper>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

Filters.propTypes = {
  theme: PropTypes.shape().isRequired,
};

export default withTheme(Filters);
