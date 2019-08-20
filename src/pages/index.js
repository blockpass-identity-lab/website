import React from "react";
import {createGlobalStyle} from 'styled-components'
import Layout from "../components/Layout";
import Landing from "../sections/Landing";

// import About from '../sections/About';
// import Projects from '../sections/Projects';
// import Writing from '../sections/Writing';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Members from "../sections/Members";
import About from "../sections/About";
import BlogPosts from "../sections/BlogPosts";
import Publications from "../sections/Publications";

const GlobalStyle = createGlobalStyle`
    a {
        text-decoration: none;
        color: black;
    }
`

const IndexPage = () => (
  <Layout>
      <GlobalStyle/>
    <Header/>
    <Landing/>
    <About/>
    <Members/>
    <Publications/>
    <BlogPosts/>
    <Footer/>
  </Layout>
);

export default IndexPage;
