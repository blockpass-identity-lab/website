import React from 'react';
import Layout from "../components/Layout";

const  BlogTemplate = () => {
  return (<Layout>
    <div>THis is a template</div>
  </Layout>)
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
`


export default BlogTemplate;
