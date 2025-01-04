import Link from "next/link";
import React from "react";
import FooterContactForm from "./FooterContactForm";

import Image from "next/image";
import FooterLearn from "./FooterLearn";

export default function Footer() {
  return (
    <footer className=" w-full bg-black  mt-12">
      <section className="flex flex-col md:flex-row">
        <FooterLearn />
        <FooterContactForm />
      </section>
      <section className=" px-6 xs:px-8 sm:px-12  lg:px-16 xl:px-24 2xl:px-32 py-2  place-items-center gap-2 ">

      
        <div>
          <p className="text-xs text-light">
            © 2024 <span className="text-light font-bold">&nbsp;Threads & </span>
            <span className="text-[#9c1313] font-bold">
               Trends&nbsp;
            </span>{" "}
            All rights reserved.
          </p>
        </div>



      </section>

    </footer>
  );
}