'use client'
import { useState, useEffect } from "react";
import JsonData from "@/components/data/data.json";
import React from "react";
import './style.css';
export const Header = () => {
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
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {landingPageData.Header ? landingPageData.Header.title : "Loading"}
                  <span></span>
                </h1>
                <p>{landingPageData.Header ? landingPageData.Header.paragraph : "Loading"}</p>
                <a
                  href="/client"
                  className="btn btn-custom btn-lg page-scroll"
                >
                 Empezar
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
