import React from 'react';
import Layout from '../components/Layout';
import Landing from '../sections/Landing';
// import About from '../sections/About';
// import Projects from '../sections/Projects';
// import Writing from '../sections/Writing';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Members from "../sections/Members";

const IndexPage = () => (
  <Layout>
    <Header />
    <Landing />
    <Members />
    <Footer/>
  </Layout>
);

export default IndexPage;
