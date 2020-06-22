import React from 'react';
import styled, { css, withTheme } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Map from '../components/map/Map';
import LevelRanking from '../components/offer/LevelRanking';
import SectionTile from '../components/offer/SectionTitle';
import ApplyForm from '../components/applyForm/Form';

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 80px);
`;

const OfferWrapper = styled.div`
  padding: 40px 20px;
  height: 100%;
  overflow-y: scroll;
  max-width: 100%;
  flex-basis: 100%;
  @media ${({ theme }) => theme.breakpoints.sm} {
    padding: 40px;
  }
  @media ${({ theme }) => theme.breakpoints.md} {
    padding: 40px 20px;
    flex-basis: 60%;
  }
  @media ${({ theme }) => theme.breakpoints.lg} {
    padding: 40px;
    flex-basis: 50%;
  }
`;

const OfferHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
  @media ${({ theme }) => theme.breakpoints.sm} {
    flex-wrap: nowrap;
  }
`;

const LogoWrapper = styled.div`
  width: 60px;
  @media ${({ theme }) => theme.breakpoints.sm} {
    width: 100px;
  }
`;

const Logo = styled.img`
  width: 100%;
`;

const InfoWrapper = styled.div`
  width: calc(100% - 60px);
  padding-left: 20px;
  @media ${({ theme }) => theme.breakpoints.sm} {
    padding-left: 40px;
    width: auto;
  }
`;

const CompanyWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Company = styled.span`
  margin-right: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.s};
  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`;

const BadgesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  color: white;
  border-radius: 20px;
  text-align: center;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: 4px 8px;
  margin-right: 5px;
  margin-bottom: 5px;
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

const Position = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.m};
  margin: 5px 0;
  @media ${({ theme }) => theme.breakpoints.sm} {
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
`;

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const Address = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

const DescriptionWrapper = styled.div`
  padding: 20px 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
`;

const Description = styled.p`
  line-height: ${({ theme }) => theme.fontSizes.xl};
  letter-spacing: 0.2px;
  margin-bottom: 30px;
`;

const MapWrapper = styled.div`
  flex-basis: 40%;
  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-basis: 50%;
  }
`;

const ListWrapper = styled.ul`
  margin-bottom: 30px;
`;

const Skill = styled.li`
  list-style: inside;
  line-height: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.2px;
`;

const Benefit = styled.li`
  list-style: inside;
  line-height: ${({ theme }) => theme.fontSizes.xl};
  letter-spacing: 0.2px;
`;

const Salary = styled.span`
  margin-bottom: 30px;
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.m};
  & > span {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BackButton = styled(Link)`
  display: flex;
  margin-bottom: 40px;
  align-items: center;
  border: none;
  background-color: transparent;
  transition: 0.2s;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.m};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BackIcon = styled(ArrowBackIosIcon)`
  width: 20px !important;
  height: 20px !important;
`;

export const query = graphql`
  query querySingleOffer($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      id
      frontmatter {
        slug
        company
        company_description
        position_description
        image {
          publicURL
        }
        new
        featured
        position
        role
        level
        postedAt
        contract
        location
        street
        street_number
        coordinates {
          lat
          lng
        }
        languages
        tools
        benefits
        salary
      }
    }
  }
`;

const OfferLayout = ({ data: { mdx }, theme }) => {
  const isDesktop = useMediaQuery({
    query: theme.breakpoints.md,
  });

  const { lat, lng } = mdx.frontmatter.coordinates;
  const {
    image,
    position,
    company,
    company_description,
    position_description,
    featured,
    street,
    street_number,
    location,
    level,
    languages,
    tools,
    benefits,
    salary,
  } = mdx.frontmatter;

  const mapOptions = {
    center: {
      lat: lat || 52,
      lng: lng || 18,
    },
    zoom: lat && lng ? 15 : 5,
  };

  return (
    <PageWrapper>
      <OfferWrapper>
        <BackButton to="/">
          <BackIcon /> Back
        </BackButton>
        <OfferHeader>
          <LogoWrapper>
            <Logo src={image.publicURL} />
          </LogoWrapper>
          <InfoWrapper>
            <CompanyWrapper>
              <Company>{company}</Company>
              <BadgesWrapper>
                {mdx.frontmatter.new && <Badge isNew={mdx.frontmatter.new}>New!</Badge>}
                {featured && <Badge isFeatured={featured}>Featured</Badge>}
              </BadgesWrapper>
            </CompanyWrapper>
            <Position>{position}</Position>
            <AddressWrapper>
              {street && street_number ? (
                <Address>{`${street} ${street_number}, ${location}`}</Address>
              ) : (
                <Address>{location}</Address>
              )}
            </AddressWrapper>
          </InfoWrapper>
          <LevelRanking level={level} />
        </OfferHeader>
        <DescriptionWrapper>
          <SectionTile>Who we are?</SectionTile>
          <Description>{company_description}</Description>
          <SectionTile>We are looking for</SectionTile>
          <Description>{position_description}</Description>
          <SectionTile>Experience and skills</SectionTile>
          <ListWrapper>
            {languages.map((item) => (
              <Skill key={item}>{item}</Skill>
            ))}

            {tools.map((item) => (
              <Skill key={item}>{item}</Skill>
            ))}
          </ListWrapper>
          <SectionTile>Benefits</SectionTile>
          <ListWrapper>
            {benefits.map((item) => (
              <Benefit key={item}>{item}</Benefit>
            ))}
          </ListWrapper>
          <SectionTile>Salary</SectionTile>
          <Salary>
            <span>{salary}</span>
            {` / month`}
          </Salary>
        </DescriptionWrapper>
        <ApplyForm />
      </OfferWrapper>
      {isDesktop && (
        <MapWrapper>
          <Map offers={[mdx]} options={mapOptions} />
        </MapWrapper>
      )}
    </PageWrapper>
  );
};

OfferLayout.propTypes = {
  data: PropTypes.shape().isRequired,
  theme: PropTypes.shape().isRequired,
};

export default withTheme(OfferLayout);
