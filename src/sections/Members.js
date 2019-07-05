import React from "react";
import PropTypes from "prop-types";
import { Image, Text, Flex } from "rebass";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import Modal from "styled-react-modal";
import Section from "../components/Section";
import { CardContainer, Card } from "../components/Card";
import ReactMarkdown from "react-markdown";
// import SocialLink from '../components/SocialLink';
import Triangle from "../components/Triangle";
import markdownRenderer from '../components/MarkdownRenderer';
// import ImageSubtitle from '../components/ImageSubtitle';
// import Hide from '../components/Hide';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={["80vh", "80vh"]}
      width={["100vw", "100vw"]}
      invertX
    />

    <Triangle
      color="background"
      height={["50vh", "20vh"]}
      width={["50vw", "50vw"]}
      invertX
    />

    <Triangle
      color="primaryDark"
      height={["25vh", "40vh"]}
      width={["75vw", "60vw"]}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={["25vh", "20vh"]}
      width={["100vw", "100vw"]}
      invertY
    />
  </div>
);

const CARD_HEIGHT = "200px";

const MEDIA_QUERY_SMALL = "@media (max-width: 400px)";

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  width: calc(100% - ${CARD_HEIGHT});

  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 2));
  }
`;

const ImageContainer = styled.div`
  margin: auto;
  width: ${CARD_HEIGHT};

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`;

const ProfileImage = styled(Image)`
  width: ${CARD_HEIGHT};
  height: ${CARD_HEIGHT};
  padding: 40px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${CARD_HEIGHT} / 2);
    width: calc(${CARD_HEIGHT} / 2);
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`;

const StyledModal = Modal.styled`
  width: 80%;
  height: 80%;
  padding: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  background-color: ${props => props.theme.colors.backgroundDark};
`;

const MemberTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} - 3.5px
  ); /*don't know why I have to add 3.5px here ... */

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
`;

const MemberProfile = ({
                         name,
                         researchFocus,
                         profilePicture,
                         onSelectMember
                       }) => {

  console.log(profilePicture);
  return (
    <Card p={0} onClick={onSelectMember}>
      <Flex style={{ height: CARD_HEIGHT }}>
        <TextContainer>
          <span>
            <Title my={2} pb={1}>
              {name}
            </Title>
          </span>
          <Text width={[1]} style={{ overflow: "auto" }}>
            {researchFocus}
          </Text>
        </TextContainer>

        <ImageContainer>
          {profilePicture && <ProfileImage src={profilePicture.file.url} alt={profilePicture.title}/>}
          <MemberTag>
            <Flex
              style={{
                float: "right"
              }}
            >
              {/* <Box mx={1} fontSize={5}> */}
              {/* <SocialLink */}
              {/* name="See project" */}
              {/* fontAwesomeIcon="globe" */}
              {/* url={projectUrl} */}
              {/* /> */}
              {/* </Box> */}
            </Flex>
            {/* <ImageSubtitle */}
            {/* bg="primaryLight" */}
            {/* color="white" */}
            {/* y="bottom" */}
            {/* x="right" */}
            {/* round */}
            {/* > */}
            {/* {type} */}
            {/* </ImageSubtitle> */}
            {/* <Hide query={MEDIA_QUERY_SMALL}> */}
            {/* <ImageSubtitle bg="backgroundDark">{publishedDate}</ImageSubtitle> */}
            {/* </Hide> */}
          </MemberTag>
        </ImageContainer>
      </Flex>
    </Card>
  );
};

MemberProfile.propTypes = {
  name: PropTypes.string.isRequired,
  researchFocus: PropTypes.string.isRequired,
  profilePicture: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string
    })
  }).isRequired
};

const Members = () => {

  const [selectedMember, setSelectedMember] = React.useState(null);


  return (

    <Section.Container id="members" Background={Background}>
      <Section.Header name="Members" icon="💻" Box="notebook"/>
      <StaticQuery
        query={graphql`
        query AllMemberQuery {
          allContentfulMember {
            edges {
              node {
                name
                researchFocus
                detail {
                  childMarkdownRemark {
                    rawMarkdownBody
                  }
                }
                profilePicture {
                  title
                  file {
                    url
                  }
                }
              }
            }
          }
        }
      `}
        render={({ allContentfulMember }) => (
          <CardContainer minWidth="350px">
            {allContentfulMember.edges.map((p, i) => {
              console.log(p.node);
              return (
                <Fade bottom delay={i * 200}>
                  <MemberProfile onSelectMember={() => setSelectedMember(p.node)} key={p.node.id} name={p.node.name}
                                 researchFocus={p.node.researchFocus} profilePicture={p.node.profilePicture}/>
                </Fade>
              );
            })}
            {selectedMember && (
              <StyledModal
                isOpen={selectedMember != null}
                onBackgroundClick={() => setSelectedMember(null)}
                onEscapeKeydown={() => setSelectedMember(null)}
              >
                {/* TODO add member detail! */}
                <ReactMarkdown source={selectedMember.detail.childMarkdownRemark.rawMarkdownBody}
                               renderers={markdownRenderer}
                />
                <button onClick={() => setSelectedMember(null)}>Close me</button>
              </StyledModal>
            )}

          </CardContainer>
        )}
      />
    </Section.Container>
  );
};

export default Members;
