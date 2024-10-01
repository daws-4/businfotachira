'use client'
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export const Navigation = (props: any) => {
  const [open, setOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const accordionRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 450) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    // Set initial state based on current window size
    handleResize();

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accordionRef.current && !accordionRef.current.contains(event.target as Node)) {
        setAccordionOpen(false);
      }
    };

    if (accordionOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accordionOpen]);


  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  return (
    <nav id="menu" className="fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-800 bg-slate-900 shadow-lg">
      <div id='1' className="sm:flex sm:justify-between sm:items-center">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <Image
              width={200}
              height={40}
              src={"/images/logo/logo.png"}
              alt="Logo"
              priority
            />
          </Link>

        
          <button
            type="button"
            className="block lg:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar block w-6 h-0.5 bg-white mb-1"></span>
            <span className="icon-bar block w-6 h-0.5 bg-white mb-1"></span>
            <span className="icon-bar block w-6 h-0.5 bg-white"></span>
          </button>
        </div>
        <div className={`${open ? 'block' : 'hidden'} lg:flex flex-col  flex-col lg:flex-row `}>
            <ul className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4">
              <li>
                <Link href="#features" className="mx-4 block py-2 lg:py-0 text-white text-3xl">
                  Características
                </Link>
              </li>
            <li>
              <Link href="#" className="mx-4 block py-2 lg:py-0 text-white text-3xl">
                Nuestra App
              </Link>
            </li>
              <li>
                <Link href="#about" className="mx-4 block py-2 lg:py-0 text-white text-3xl">
                  Nuestro Propósito
                </Link>
              </li >
            <li className="relative" ref={accordionRef}>
              <button onClick={toggleAccordion} className="mx-4 block py-2 lg:py-0 text-white text-3xl">
                Nuestras Líneas
              </button>
              {accordionOpen && (
                <ul className="absolute left-0 top-full mt-2 w-full bg-slate-800 shadow-lg z-50">
                  <li>
                    <Link href="#info1" className="block py-2 px-4 text-white text-2xl hover:bg-slate-700">
                      Información 1
                    </Link>
                  </li>
                  <li>
                    <Link href="#info2" className="block py-2 px-4 text-white text-2xl hover:bg-slate-700">
                      Información 2
                    </Link>
                  </li>
                </ul>
              )}
            </li>
              <li>
                <Link href="#contact" className="mx-4 block py-2 lg:py-0 text-white text-3xl">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
      </div>
    </nav>
  );
};