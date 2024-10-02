'use client'
import { useState, useEffect } from "react";
import JsonData from "@/components/data/data.json";
import Link from "next/link";
import React from "react";
import axios from 'axios'
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = () => {
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

  const [{ name, email, message }, setState] = useState<{ name: string; email: string; message: string; }>(initialState);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });
  
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log(name, email, message);
    try {
     const response = await axios.post('/api/client/adminmails', { alias:name, email, mensaje:message })
    if(response.status === 200){
      toast.success('Mensaje enviado con éxito')
     }else{
      toast.error('Error al enviar el mensaje')
     }
    } catch (error) {
      console.log(error)
      toast.error('Error al enviar el mensaje')
    }

    clearState();
   
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Contactanos</h2>
                <p>
                  Rellena el formulario y nos pondremos en contacto contigo lo antes posible
                </p>
              </div>
              <form name="sentMessage" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        value={name}
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Tu nombre"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        value={email}
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    value={message}
                    name="message"
                    id="message"
                    className="form-control"
                    rows={4}
                    placeholder="Mensaje"
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Envía el mensaje
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            {/* <div className="contact-item">
              <h3>Información de Contacto</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Dirección
                </span>
                {landingPageData.Contact ? landingPageData.Contact.address : "loading"}
              </p>
            </div> */}
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Teléfono
                </span>{" "}
                {landingPageData.Contact ? landingPageData.Contact.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {landingPageData.Contact ? landingPageData.Contact.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <Link href={landingPageData.Contact && landingPageData.Contact.whatsapp ? `/${landingPageData.Contact.whatsapp}` : "/"}>
                      <i className="fa fa-whatsapp"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={landingPageData.Contact && landingPageData.Contact.instagram ? `/${landingPageData.Contact.instagram}` : "/"}>
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href={landingPageData.Contact && landingPageData.Contact.youtube ? `/${landingPageData.Contact.youtube}` : "/"}>
                      <i className="fa fa-youtube"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2024 BusInfoTachira. Template Design by{" "}
            <a href="http://www.templatewire.com" rel="nofollow">
              TemplateWire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
