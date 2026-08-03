import React from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

import {
  Footer,
  FooterTitle,
  FooterLinkGroup,
  FooterLink,
} from "flowbite-react";

export default function CustomFooter() {
  return (
    <Footer container className="border-t-4 border-teal-500">
      <div className="w-full max-w-7xl mx-auto px-6 py-6">

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8">

          {/* Logo */}
          <div>
            <Link
              to="/"
              className="whitespace-nowrap text-lg sm:text-xl font-semibold"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Asad's
              </span>
              <span className="ml-2">Blog</span>
            </Link>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

            {/* About */}
            <div>
              <FooterTitle title="ABOUT" />
              <FooterLinkGroup col>
                <FooterLink href="https://www.100jsprojects.com">
                  100 JS Projects
                </FooterLink>
                <FooterLink href="/">
                  Asad's Blog
                </FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Follow */}
            <div>
              <FooterTitle title="FOLLOW US" />
              <FooterLinkGroup col>
                <FooterLink href="https://github.com">Github</FooterLink>
                <FooterLink href="https://discord.com">Discord</FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Legal */}
            <div>
              <FooterTitle title="LEGAL" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms & Conditions</FooterLink>
              </FooterLinkGroup>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center border-t pt-4">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Asad's Blog
          </p>

          {/* Icons (manual, not Flowbite) */}
          <div className="flex gap-6 mt-4 sm:mt-0 text-gray-500">
            <a href="#"><BsFacebook /></a>
            <a href="#"><BsInstagram /></a>
            <a href="#"><BsTwitter /></a>
            <a href="#"><BsGithub /></a>
            <a href="#"><BsDribbble /></a>
          </div>

        </div>
      </div>
    </Footer>
  );
}