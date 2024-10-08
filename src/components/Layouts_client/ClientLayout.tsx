"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar_client";
import Header from "@/components/Header_client";
import Link from "next/link";
import Image from "next/image";
interface DefaultLayoutProps {
    params?: { linea: any };
    children: React.ReactNode;
}


export default function DefaultLayout({ children }: DefaultLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
                <div className="relative flex flex-1 flex-col">
                    {/* <!-- ===== Header Start ===== --> */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
                        <div className="p-4 bg-slate-800">
                    <Link href="/">
                        <Image
                            width={200}
                            height={40}
                            src={"/images/logo/logo.png"}
                            alt="Logo"
                            priority
                        />
                    </Link>
                        </div>
                        </Header>
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
        </>
    );
}
