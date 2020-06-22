import React, { useState, useEffect } from 'react';
import styled, { css, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { useMediaQuery } from 'react-responsive';
import FilterPopover from './FilterPopover';
import Modal from './Modal';
import { changeActiveFilters as changeActiveFiltersAction } from '../state/actions';
import { firstLetterToUppercase } from '../utils';

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
  margin: 0 10px;
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
    `}
`;

const ButtonsWrapper = styled.div`
  margin-top: 20px;
  padding: 20px 10px 0 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ApproveButton = styled.button`
  color: ${({ theme }) => theme.colors.textInverse};
  transition: 0.2s;
  padding: 10px 20px;
  height: 100%;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.lightPrimary};
  }
`;

const Filters = ({ theme, activeFilters, changeActiveFilters }) => {
  const isDesktop = useMediaQuery({
    query: theme.breakpoints.md,
  });

  const data = useStaticQuery(graphql`
    {
      allMdx {
        languages: distinct(field: frontmatter___languages)
        location: distinct(field: frontmatter___location)
        role: distinct(field: frontmatter___role)
        contract: distinct(field: frontmatter___contract)
        level: distinct(field: frontmatter___level)
      }
    }
  `);

  const [selectedFilters, setSelectedFilters] = useState(activeFilters);

  useEffect(() => {
    setSelectedFilters(activeFilters);
  }, [activeFilters]);

  const [filterOpen, setFilterOpen] = useState({ isOpen: false, anchorEl: null });

  const onOpen = (event) => {
    setFilterOpen({ isOpen: true, anchorEl: event.currentTarget });
  };

  const onClose = () => {
    setFilterOpen({ isOpen: false, anchorEl: null });
  };

  const handleSelectFilter = (filterKey, filterValue) => {
    let updatedFilters = selectedFilters;
    const valuesOfCurrentFilter = selectedFilters[filterKey];

    if (valuesOfCurrentFilter) {
      let updatedValueList;

      if (valuesOfCurrentFilter.includes(filterValue)) {
        // there is already a key like this and there is a value like this, so I delete the value
        updatedValueList = valuesOfCurrentFilter.filter((item) => item !== filterValue);
      } else {
        // there is already such a key, but there is no value like this, so add this value
        updatedValueList = [...valuesOfCurrentFilter, filterValue];
      }

      updatedFilters = { ...selectedFilters, [filterKey]: updatedValueList };

      if (!updatedValueList.length) {
        // the value was removed but it was last in array so I delete the whole key
        delete updatedFilters[filterKey];
      }
    } else {
      // there is no key like this and no value like this so I add the key and value
      updatedFilters = { ...selectedFilters, [filterKey]: [filterValue] };
    }

    setSelectedFilters(updatedFilters);
  };

  const handleClearFilter = (filterKey) => {
    const updatedFilters = selectedFilters;
    const valuesOfCurrentFilter = selectedFilters[filterKey];

    if (valuesOfCurrentFilter) {
      delete updatedFilters[filterKey];
      changeActiveFilters({ ...updatedFilters });
    }
  };

  const handleResetAllFilters = () => {
    if (Object.keys(selectedFilters).length !== 0) {
      changeActiveFilters({});
    }
  };

  const handleApprove = () => {
    changeActiveFilters(selectedFilters);
    onClose();
  };

  return (
    <>
      <FiltersWrapper>
        <InnerWrapper>
          <FilterWrapper>
            <Filter name="languages" onClick={onOpen} active={selectedFilters.languages && true}>
              {selectedFilters.languages
                ? `${selectedFilters.languages[0]}${selectedFilters.languages[1] ? '...' : ''}`
                : 'Languages'}
            </Filter>
            {selectedFilters.languages && (
              <ResetFilter onClick={() => handleClearFilter('languages')}>
                <CloseIcon />
              </ResetFilter>
            )}
          </FilterWrapper>
          <FilterWrapper>
            <Filter name="location" onClick={onOpen} active={selectedFilters.location && true}>
              {selectedFilters.location
                ? `${selectedFilters.location[0]}${selectedFilters.location[1] ? '...' : ''}`
                : 'Location'}
            </Filter>
            {selectedFilters.location && (
              <ResetFilter onClick={() => handleClearFilter('location')}>
                <CloseIcon />
              </ResetFilter>
            )}
          </FilterWrapper>
          <FilterWrapper>
            <Filter name="role" onClick={onOpen} active={selectedFilters.role && true}>
              {selectedFilters.role
                ? `${selectedFilters.role[0]}${selectedFilters.role[1] ? '...' : ''}`
                : 'Role'}
            </Filter>
            {selectedFilters.role && (
              <ResetFilter onClick={() => handleClearFilter('role')}>
                <CloseIcon />
              </ResetFilter>
            )}
          </FilterWrapper>
          <FilterWrapper>
            <Filter name="contract" onClick={onOpen} active={selectedFilters.contract && true}>
              {selectedFilters.contract
                ? `${selectedFilters.contract[0]}${selectedFilters.contract[1] ? '...' : ''}`
                : 'Contract'}
            </Filter>
            {selectedFilters.contract && (
              <ResetFilter onClick={() => handleClearFilter('contract')}>
                <CloseIcon />
              </ResetFilter>
            )}
          </FilterWrapper>
          <FilterWrapper>
            <Filter name="level" onClick={onOpen} active={selectedFilters.level && true}>
              {selectedFilters.level
                ? `${selectedFilters.level[0]}${selectedFilters.level[1] ? '...' : ''}`
                : 'Level'}
            </Filter>
            {selectedFilters.level && (
              <ResetFilter onClick={() => handleClearFilter('level')}>
                <CloseIcon />
              </ResetFilter>
            )}
          </FilterWrapper>
        </InnerWrapper>
        <ResetAll onClick={handleResetAllFilters}>Clear</ResetAll>
      </FiltersWrapper>
      {filterOpen.isOpen && (
        <>
          {isDesktop ? (
            <FilterPopover onClose={onClose} anchorEl={filterOpen.anchorEl}>
              <FilterName>{firstLetterToUppercase(filterOpen.anchorEl.name)}</FilterName>
              <FilterItemsWrapper>
                {data.allMdx[filterOpen.anchorEl.name].map((item) => (
                  <FilterItem
                    key={item}
                    active={
                      selectedFilters[filterOpen.anchorEl.name] &&
                      selectedFilters[filterOpen.anchorEl.name].includes(item)
                    }
                    onClick={() => handleSelectFilter(filterOpen.anchorEl.name, item)}
                  >
                    {item}
                  </FilterItem>
                ))}
              </FilterItemsWrapper>
              <ButtonsWrapper>
                <ResetAll onClick={() => handleClearFilter(filterOpen.anchorEl.name)}>
                  Clear
                </ResetAll>
                <ApproveButton onClick={handleApprove}>Approve</ApproveButton>
              </ButtonsWrapper>
            </FilterPopover>
          ) : (
            <Modal open={filterOpen.isOpen} onClose={onClose}>
              <FilterName>{firstLetterToUppercase(filterOpen.anchorEl.name)}</FilterName>
              <FilterItemsWrapper>
                {data.allMdx[filterOpen.anchorEl.name].map((item) => (
                  <FilterItem
                    key={item}
                    active={
                      selectedFilters[filterOpen.anchorEl.name] &&
                      selectedFilters[filterOpen.anchorEl.name].includes(item)
                    }
                    onClick={() => handleSelectFilter(filterOpen.anchorEl.name, item)}
                  >
                    {item}
                  </FilterItem>
                ))}
              </FilterItemsWrapper>
              <ButtonsWrapper>
                <ResetAll onClick={() => handleClearFilter(filterOpen.anchorEl.name)}>
                  Clear
                </ResetAll>
                <ApproveButton onClick={handleApprove}>Approve</ApproveButton>
              </ButtonsWrapper>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

Filters.propTypes = {
  theme: PropTypes.shape().isRequired,
  activeFilters: PropTypes.shape().isRequired,
  changeActiveFilters: PropTypes.func.isRequired,
};

const mapStateToProps = ({ activeFilters }) => {
  return {
    activeFilters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeActiveFilters: (data) => dispatch(changeActiveFiltersAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Filters));
