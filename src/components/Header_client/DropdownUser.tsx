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
      <Link href='/#contact'>¿Tienes alguna duda?</Link>
    </ClickOutside>
  );
};

export default DropdownUser;
