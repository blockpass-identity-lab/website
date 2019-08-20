import React from "react";
import ReactMarkdown from "react-markdown";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import markdownRenderer from "../components/MarkdownRenderer";
import Section from "../components/Section";
import Triangle from "../components/Triangle";

const Background = () => (
  <div>
    <Triangle
      color="primaryDark"
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

const BlogTemplate = ({ data }) => {
  console.log(data);
  return (<Layout>
    <Section.Container Background={Background}>
      <Section.Header name={data.contentfulBlogPost.title} icon="💻"/>

      <ReactMarkdown source={data.contentfulBlogPost.blog.childMarkdownRemark.rawMarkdownBody}
                     renderers={markdownRenderer}
      />
    </Section.Container>
  </Layout>);
};


export const blogQuery = graphql`  
  query($id: String!) {
    contentfulBlogPost(id: {eq: $id}) {
      id
      title
      blog {
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
    }
  }
`;


export default BlogTemplate;
