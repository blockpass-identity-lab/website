import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
// import SocialLink from '../components/SocialLink';
import Triangle from '../components/Triangle';
// import ImageSubtitle from '../components/ImageSubtitle';
// import Hide from '../components/Hide';
import ReactMarkdown from "react-markdown";
// import SocialLink from '../components/SocialLink';
import markdownRenderer from '../components/MarkdownRenderer';
import Modal from "styled-react-modal";
import { Link} from "gatsby"


const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="background"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertX
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const CARD_HEIGHT = '200px';

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

const StyledModal = Modal.styled`
  width: 80%;
  height: 800px;
    padding: 20px 10%;
  margin: 10px
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  overflow: scroll;

  opacity: 0.95;
  background-color: ${props => props.theme.colors.backgroundDark};
`;

const ModalDiv = styled.div`

`;

// const BlogPost = styled(Image)`
//   width: ${CARD_HEIGHT};
//   height: ${CARD_HEIGHT};
//   padding: 40px;
//   margin-top: 0px;

//   ${MEDIA_QUERY_SMALL} {
//     height: calc(${CARD_HEIGHT} / 2);
//     width: calc(${CARD_HEIGHT} / 2);
//     margin-top: calc(${CARD_HEIGHT} / 4);
//     padding: 10px;
//   }
// `;

const BlogTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} - 3.5px
  ); /*don't know why I have to add 3.5px here ... */

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
`;

const BlogPostView = ({
  title,
  id
  // Blog Post,
}) => {
  return (
    <Link to={id}>

    <Card  p={0}>
      <Flex style={{ height: CARD_HEIGHT }}>
        <TextContainer>
          <Title my={2} pb={1}>
            {title}
          </Title>
        </TextContainer>

      </Flex>
    </Card>
    </Link>
  );
}

BlogPostView.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  BlogPost: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
  }).isRequired,
};

const BlogPosts = () => {

  const [selectedBlog, setSelectedBlog] = React.useState(null);

  return (
    <Section.Container id="BlogPost" Background={Background}>
      <Section.Header name="BlogPost" icon="💻" Box="notebook" />
      <StaticQuery
        query={graphql`
      query AllBlogPostQuery {
        allContentfulBlogPost {
          edges {
            node {
              blog {
                childMarkdownRemark {
                    rawMarkdownBody
                }
               }
               title
               id
             }
            }
          }
        }
      `}
        render={({ allContentfulBlogPost }) => (
          <CardContainer minWidth="350px">
            {allContentfulBlogPost.edges.map((p, i) => {
              console.log(p.node)
              return (
                <Fade bottom delay={i * 200}>
                  <BlogPostView id={p.node.id} onSelectBlog={() => setSelectedBlog(p.node)} key={p.node.id} title={p.node.title} />
                  {/* documentToReactComponents(node.bodyRichText.json, RichTextContainer) */}
                </Fade>
              )
            })}
          </CardContainer>

        )}
      />
      {selectedBlog && (
        <StyledModal
          isOpen={selectedBlog != null}
          onBackgroundClick={() => setSelectedBlog(null)}
          onEscapeKeydown={() => setSelectedBlog(null)}
        >
          {/* TODO add member detail! */}
          {/*<ModalDiv>*/}
          <h1>{selectedBlog.title}</h1>
          <ReactMarkdown source={selectedBlog.blog.childMarkdownRemark.rawMarkdownBody}
                         renderers={markdownRenderer}
          />
          {/*</ModalDiv>*/}
          <button onClick={() => setSelectedBlog(null)}>Close me</button>
        </StyledModal>
      )}
    </Section.Container>
  );
}

export default BlogPosts;
