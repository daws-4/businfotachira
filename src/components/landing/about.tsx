'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
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



export const About = () => {
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
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <Image src="/img/about.jpg" className="img-responsive" alt=""  width={400} height={400}/>{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Nuestro Propósito</h2>
              <p>{landingPageData.About ? landingPageData.About.paragraph : "loading..."}</p>
              <h3>¿Por qué usar nuestros servicios?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {landingPageData.About && landingPageData.About.Why
                      ? landingPageData.About.Why.map((d: any, i: any) => (
                        <li key={`${d}-${i}`}>{d}</li>
                      ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {landingPageData.About && landingPageData.About.Why
                      ? landingPageData.About.Why2.map((d: any, i: any) => (
                        <li key={`${d}-${i}`}>{d}</li>
                      ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
