'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import axios from "axios";
import { set } from "mongoose";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<any>({});
 
  
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <h1>ola</h1>
    </ClickOutside>
  );
};

export default DropdownUser;
