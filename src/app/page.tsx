'use client'
import React, { useState, useEffect } from "react";
import { Navigation, About, Contact, Header, Team, Services, Testimonials, Features, Gallery } from "@/components/landing/index";
import JsonData from "@/components/data/data.json";
import "./App.css";
import SmoothScroll from "smooth-scroll";
import HeaderLand from "@/components/landing/headerland";


const Home = () => {
  interface LandingPageData {
    Header: any;
    Features: any;
    About: any;
    Services: any;
    Gallery: any;
    Testimonials: any;
    Team: any;
    Contact: any;
  }
  
  const [landingPageData, setLandingPageData] = useState<LandingPageData>({
    Header: {},
    Features: [],
    About: {},
    Services: [],
    Gallery: [],
    Testimonials: [],
    Team: [],
    Contact: {},
  });
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);



  return (
    <> <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="img/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="img/apple-touch-icon-114x114.png"
      />

      <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
      <link
        rel="stylesheet"
        type="text/css"
        href="fonts/font-awesome/css/font-awesome.css"
      />
      <link rel="stylesheet" type="text/css" href="css/style.css" />
      <link
        rel="stylesheet"
        type="text/css"
        href="css/nivo-lightbox/nivo-lightbox.css"
      />
      <link rel="stylesheet" type="text/css" href="css/nivo-lightbox/default.css" />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:400,700"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900"
        rel="stylesheet"
      />
      <div>
        <Navigation/>
        <Header data={landingPageData.Header} />
        <Features data={landingPageData.Features} />
        <About data={landingPageData.About} />
        <Gallery data={landingPageData.Gallery} />
        <Contact data={landingPageData.Contact} />
      </div>


      <script type="text/javascript" src="js/jquery.1.11.1.js"></script>
      <script type="text/javascript" src="js/bootstrap.js"></script>
      </>
    
  );
};

export default Home;
