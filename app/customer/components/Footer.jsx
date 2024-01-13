"use client";
import "../../styles/globals.css";
import { Separator } from "@/components/ui/separator";
import { Input } from "../../../components/ui/input";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { LuClock } from "react-icons/lu";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

// COMPLETED

const Footer = () => {
  return (
    <footer
      className="h-full w-full"
      style={{ backgroundColor: "#1b1b1b", color: "#AAA", fontSize: "13px" }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="w-full">
            <h1 className="mb-3 mt-6 flex text-4xl font-extrabold text-white">
              Huge
              <span className="text-ring">Bites</span>
            </h1>
            <p className="text-sm my-3 flex text-white">
              Innovative Ideas, Exceptional Experiences.
            </p>
            <div className="flex space-x-4 w-full justify-between">
              <div className="w-full h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1124.1763060517787!2d121.16619192225095!3d14.243675908034426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd63bbc96161d3%3A0x5c170dc830979f4b!2sHuge%20Bites%20Cakes%20and%20Pastries!5e0!3m2!1sfil!2sph!4v1700647738618!5m2!1sfil!2sph"
                  width="325"
                  height="260"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="w-full h-full flex flex-col gap-2">
                <h1 className="text-2xl font-extrabold text-ring mt-2 mb-2">
                  Location
                </h1>
                <div className="flex flex-row h-fit justify-between">
                  <div className="w-8 mr-2">
                    <MdLocationOn className="ml-1 h-8 w-6 mx-auto my-auto" />
                  </div>
                  <p className="text-white my-auto">
                    Phase 1 B73 Mabuhay City Subdivision, Baclaran, Cabuyao,
                    Laguna
                  </p>
                </div>
                <div className="flex flex-row h-fit">
                  <div className="w-8 mr-2">
                    <LuClock className="h-6 w-6 mx-auto my-auto" />
                  </div>
                  <p className="text-white my-auto">Mon - Sun: 10AM - 8PM</p>
                </div>
                <div className="flex flex-row h-fit">
                  <div className="w-8 mr-2">
                    <FaPhoneVolume className="h-5 w-6 mx-auto my-auto" />
                  </div>
                  <p className="text-white my-auto">0927 662 3221</p>
                </div>
                <div className="flex flex-row h-fit">
                  <div className="w-8 mr-2">
                    <MdOutlineMail className="h-8 w-6 mx-auto my-auto" />
                  </div>
                  <p className="text-white my-auto">happyhugebites@gmail.com</p>
                </div>
                <div className="flex flex-row h-full gap-2">
                  <a
                    className="rounded-full p-2 bg-ring text-white"
                    href="https://www.facebook.com/happyhugebites"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    className="rounded-full p-2 bg-ring text-white"
                    href="https://www.instagram.com/happyhugebites/"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-1">
                <h1 className="text-2xl font-extrabold text-ring mt-2 mb-2">
                  Quick Menu
                </h1>
                <a className="rounded-full bg-transparent text-white text-md">
                  Human Cakes
                </a>
                <a className="rounded-full bg-transparent text-white text-md">
                  Dog Cakes
                </a>
                <a className="rounded-full bg-transparent text-white text-md">
                  Cupcakes
                </a>
                <a className="rounded-full bg-transparent text-white text-md">
                  Customized Cakes
                </a>
              </div>
              <div className="w-full h-full flex flex-col gap-3">
                <h1 className="text-2xl font-extrabold text-ring mt-2 mb-2">
                  Site Links
                </h1>
                <a className="rounded-full bg-transparent text-white text-md">
                  FAQ
                </a>
                <a className="rounded-full bg-transparent text-white text-md">
                  Privacy Policy
                </a>{" "}
                <a className="rounded-full bg-transparent text-white text-md">
                  Terms and Conditions
                </a>{" "}
                <a className="rounded-full bg-transparent text-white text-md">
                  About
                </a>
              </div>
              <div className="w-full h-full flex flex-col gap-3">
                <h1 className="text-2xl font-extrabold text-ring mt-2 mb-2">
                  Newsletter
                </h1>
                <p className="text-xs text-[#aaa]">
                  Stay informed about special offers. Subscribe to the
                  newsletter!
                </p>
                <Input
                  className="rounded-md w-full bg-white text-black text-md"
                  placeholder="Enter your email"
                />
                <Button className="w-fit h-fit bg-ring text-white ml-auto rounded-full hover:bg-ring hover:text-red-300">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Separator className="h-[1px] w-[95%] mx-auto my-2 mt-4 bg-[#AAA]" />
        <div className="flex flex-row justify-between items-center pb-8">
          <p>&copy;2015 Huge Bites. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="flex items-center hover:text-gray-400">
              <FaHome className="mr-2" />
              Home
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
