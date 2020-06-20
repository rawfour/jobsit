import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { countPostedTime } from '../utils';

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 20px 20px;
  border-radius: 4px;
  margin: 60px 0;
  box-shadow: ${({ theme }) => theme.shadows.spreaded};
  position: relative;
  &:last-child{
    margin-bottom: 0; 
  }
  ${({ isFeatured }) =>
    isFeatured &&
    css`
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        border-radius: 4px 0 0 4px;
        background-color: ${({ theme }) => theme.colors.primary};
      }
    `}



    @media ${({ theme }) => theme.breakpoints.lg} {
    flex-direction: row;
    margin: 30px 0;
    padding: 20px;
    &:last-child {
    margin-bottom: 30px;
  }
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 100%;
  @media ${({ theme }) => theme.breakpoints.lg} {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
  }
  @media ${({ theme }) => theme.breakpoints.xl} {
    width: 60px;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  display: block;
  width: 60px;
  border-radius: 100%;
  @media ${({ theme }) => theme.breakpoints.lg} {
    transform: none;
    position: static;
    width: 50px;
  }
  @media ${({ theme }) => theme.breakpoints.xl} {
    width: 60px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 50px 0 15px 0;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  /* flex-basis: auto; */
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
  @media ${({ theme }) => theme.breakpoints.lg} {
    padding: 0;
    margin: 0;
    width: auto;
    border-bottom: none;
  }
`;

const CompanyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-wrap: nowrap;
  }
`;

const Company = styled.span`
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

const Badge = styled.span`
  color: white;
  border-radius: 20px;
  text-align: center;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: 4px 8px;
  margin-right: 5px;
  &:last-child {
    margin-right: 0;
  }

  ${({ isNew }) =>
    isNew &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
    `};

  ${({ isFeatured }) =>
    isFeatured &&
    css`
      background-color: ${({ theme }) => theme.colors.secondary};
    `}
`;

const Role = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.m};
  transition: 0.2s;
  margin: 8px 0;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const OtherInfo = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.s};
  margin-right: 9px;
  white-space: nowrap;
  &:after {
    content: '•';
    margin-left: 9px;
  }
  &:last-child {
    margin-right: 0;
    &:after {
      display: none;
    }
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  @media ${({ theme }) => theme.breakpoints.lg} {
    width: auto;
    margin-left: auto;
    justify-content: flex-end;
    padding-left: 10px;
  }
`;

const Tag = styled.span`
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.primary};
  transition: 0.2s;
  padding: 4px 5px;
  background-color: ${({ theme }) => theme.colors.lightPrimary};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  font-size: ${({ theme }) => theme.fontSizes.s};
  margin: 0 10px 10px 0;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.textInverse};
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const OfferItem = ({ item }) => {
  return (
    <ListItem isFeatured={item.featured}>
      <LogoWrapper>
        <Logo src={item.image.publicURL} alt={item.company} />
      </LogoWrapper>
      <ContentWrapper>
        <CompanyWrapper>
          <Company>{item.company}</Company>
          {item.new && <Badge isNew={item.new}>New!</Badge>}
          {item.featured && <Badge isFeatured={item.featured}>Featured</Badge>}
        </CompanyWrapper>
        <Role>{item.position}</Role>
        <div>
          <OtherInfo>{countPostedTime(item.postedAt)}</OtherInfo>
          <OtherInfo>{item.contract}</OtherInfo>
          <OtherInfo>{item.location}</OtherInfo>
        </div>
      </ContentWrapper>
      <TagsWrapper>
        <Tag>{item.role}</Tag>
        <Tag>{item.level}</Tag>
        {item.languages.map((language) => (
          <Tag key={language}>{language}</Tag>
        ))}
        {item.tools.map((tool) => (
          <Tag key={tool}>{tool}</Tag>
        ))}
      </TagsWrapper>
    </ListItem>
  );
};

OfferItem.propTypes = {
  item: PropTypes.shape().isRequired,
};

export default OfferItem;
