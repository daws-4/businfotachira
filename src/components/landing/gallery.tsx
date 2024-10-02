'use client'
import { useState, useEffect } from "react";
import JsonData from "@/components/data/data.json";
import { Image } from "./image";
import React from "react";



export const Gallery = () => {
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
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Nuestras Líneas</h2>
          <p>
            Las principales Líneas de transporte público que trabajan en el Estado Táchira
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {landingPageData.Gallery
              ? landingPageData.Gallery.map((d:any, i:any) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      title={d.title}
                      largeImage={d.largeImage}
                      smallImage={d.smallImage}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
