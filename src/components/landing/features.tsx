'use client'
import React from "react";
import { useState, useEffect } from "react";
import JsonData from "@/components/data/data.json";
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


export const Features = () => {
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
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Características</h2>
        </div>
        <div className="row">
          {landingPageData.Features
            ? landingPageData.Features.map((d:any, i:any) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                  {" "}
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
