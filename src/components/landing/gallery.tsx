'use client'
import { useState, useEffect } from "react";
import JsonData from "@/components/data/data.json";
import { Image } from "./image";
import React from "react";
import Link from "next/link";



export const Gallery = (linea:any) => {
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

  const [data, setData] = useState([]);
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
    setData(linea.linea)
    console.log(linea.linea)
  }, [linea.linea]);
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
                <Link href={`/client/${d.username}`}
                  key={`${d.title}-${i}`}>
                  <div className="col-sm-6 col-md-4 col-lg-4">
                    <Image
                      title={d.title}
                      largeImage={`/client/${d.username}`}
                      smallImage={d.smallImage}
                    />
                  </div>
                </Link>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
