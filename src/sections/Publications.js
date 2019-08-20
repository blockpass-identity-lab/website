import React from "react";
import Triangle from "../components/Triangle";
import Section from "../components/Section";
import { graphql, Link, StaticQuery } from "gatsby";
import { CardContainer, Card } from "../components/Card";
import ReactMarkdown from "react-markdown";
import markdownRenderer from "../components/MarkdownRenderer";
import Fade from "react-reveal/Fade";
import { Flex, Text } from "rebass";
import styled from "styled-components";

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

const CARD_HEIGHT = '300px';

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

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

  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 5));
  }
`;

const StyledA = styled.a`
  text-decoration: none;
  color: black;
`

const PublicationCard = ({url, title, abstract}) => (
  <StyledA target="_blank" rel="noopener noreferrer" href={url}>
    <Card  p={0}>
      <Flex style={{ height: CARD_HEIGHT }}>
        <TextContainer>
          <Title my={2} pb={1}>
            {title}
          </Title>
          {/*<Text width={[1]} style={{ overflow: "auto" }}>*/}
            <ReactMarkdown source={abstract.childMarkdownRemark.rawMarkdownBody}
                           renderers={markdownRenderer}/>
          {/*</Text>*/}
        </TextContainer>

      </Flex>
    </Card>
  </StyledA>
)

const Publications = () => {

  const [selectedBlog, setSelectedBlog] = React.useState(null);

  return (
    <Section.Container id="Publications" Background={Background}>
      <Section.Header name="Publications" icon="💻" Box="notebook"/>
      <StaticQuery
        query={graphql`
      query AllPublicationQuery {
        allContentfulPublication {
          edges {
            node {
              title
              link
              abstract {
                childMarkdownRemark {
                    rawMarkdownBody
                }
              }
              authors {
                name
              }


             }
            }
          }
        }
      `}
        render={({ allContentfulPublication }) => {
          return (
            <CardContainer minWidth="250px">
              {allContentfulPublication.edges.map((p, i) => {
                return (<Fade bottom delay={i * 200}>
                  <PublicationCard
                    url={p.node.link}
                    title={p.node.title}
                    abstract={p.node.abstract}
                  />
                </Fade>);


              })}
            </CardContainer>


          );
        }}
      />
      {/*{selectedBlog && (*/}
      {/*<StyledModal*/}
      {/*isOpen={selectedBlog != null}*/}
      {/*onBackgroundClick={() => setSelectedBlog(null)}*/}
      {/*onEscapeKeydown={() => setSelectedBlog(null)}*/}
      {/*>*/}
      {/*/!* TODO add member detail! *!/*/}
      {/*/!*<ModalDiv>*!/*/}
      {/*<h1>{selectedBlog.title}</h1>*/}
      {/*<ReactMarkdown source={selectedBlog.blog.childMarkdownRemark.rawMarkdownBody}*/}
      {/*renderers={markdownRenderer}*/}
      {/*/>*/}
      {/*/!*</ModalDiv>*!/*/}
      {/*<button onClick={() => setSelectedBlog(null)}>Close me</button>*/}
      {/*</StyledModal>*/}
      {/*)}*/}
    </Section.Container>
  );
};

export default Publications;
