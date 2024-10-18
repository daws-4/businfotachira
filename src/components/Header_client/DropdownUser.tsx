'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<any>({});
 
  
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div className="py-4 justify-end flex flex-wrap">
        <Link className="hover:text-blue-500 px-4" href='/#contact'>¿Tienes alguna duda?</Link>
        <Link className="hover:text-blue-500 px-4" href='/client/qys'>Quejas y Sugerencias</Link>
      </div>
    </ClickOutside>
  );
};

export default DropdownUser;
