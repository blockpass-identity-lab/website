import React from 'react';
import {graphql} from "gatsby";
import ReactMarkdown from "react-markdown";
import Layout from "../components/Layout";
import markdownRenderer from "../components/MarkdownRenderer";
import Section from "../components/Section";
import Triangle from "../components/Triangle";

const Background = () => (
  <div>
    <Triangle
      color="primaryDark"
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

const MemberTemplate = ({data}) => {
  return (
    <Layout>
      <Section.Container Background={Background}>
        <Section.Header name={data.contentfulMember.name} icon="💻" />

      </Section.Container>
    </Layout>
  )
}

export const memberQuery = graphql`  
  query($id: String!) {
    contentfulMember(id: {eq: $id}) {
      id
      name
    }
  }
`;

export default MemberTemplate;
