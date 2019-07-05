import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex, Box, Text } from 'rebass';
import TextLoop from 'react-text-loop';
import { SectionLink } from 'react-scroll-section';
import Section from '../components/Section';
import styled from 'styled-components';
import SocialLink from '../components/SocialLink';
import MouseIcon from '../components/MouseIcon';
import Triangle from '../components/Triangle';
import { Link} from "gatsby"
import Header_logo_circle from '../../media/header_logo_circle.svg';

const ImageDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />

    <Triangle
      color="secondary"
      height={['38vh', '80vh']}
      width={['50vw', '35vw']}
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const LandingPage = () => (
  <Section.Container id="home" Background={Background}>
    {/* <StaticQuery */}
    {/* query={graphql` */}
    {/* query SiteTitleQuery { */}
    {/* contentfulAbout { */}
    {/* name */}
    {/* roles */}
    {/* socialLinks { */}
    {/* id */}
    {/* url */}
    {/* name */}
    {/* fontAwesomeIcon */}
    {/* } */}
    {/* } */}
    {/* } */}
    {/* `} */}
    {/* render={data => { */}
    {/* const { name, socialLinks, roles } = data.contentfulAbout; */}

    {/* return ( */}
    <Fragment>
      <Heading
        textAlign="center"
        as="h1"
        color="primary"
        fontSize={[5, 6, 8]}
        mb={[3, 4, 5]}
        >
      </Heading>
      <ImageDiv>

           <img src={Header_logo_circle} width="53%" alt="Blockpass Identity Lab"/>
        </ImageDiv>

      <Heading
        as="h2"
        color="primary"
        fontSize={[4, 5, 6]}
        mb={[3, 5]}
        textAlign="center"
      >
        <TextLoop>
          {/* {roles.map(text => ( */}
          {/* <Text width={[300, 500]} key={text}> */}
          {/* {text} */}
          {/* </Text> */}
          {/* ))} */}
        </TextLoop>
      </Heading>

      <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
        {/* {socialLinks.map(({ id, ...rest }) => ( */}
        {/* <Box mx={3} fontSize={[5, 6, 6]} key={id}> */}
        {/* <SocialLink {...rest} /> */}
        {/* </Box> */}
        {/* ))} */}
      </Flex>
      <SectionLink section="about">
        {({ onClick }) => <MouseIcon onClick={onClick} />}
      </SectionLink>
    </Fragment>
    {/* ); */}
    {/* }} */}
    {/* /> */}
  </Section.Container>
);

export default LandingPage;
