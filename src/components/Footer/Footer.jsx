import { CodeXml, Mail } from "lucide-react";

import React from "react";
import Linkedin from "../../assets/linkedin";

const links = [
  {
    label: "github",
    url: "https://github.com/ZAKARIA-MOSBAHI/Typing-Game",
    icon: CodeXml,
  },
  {
    label: "linkedin",
    url: "https://www.linkedin.com/in/mosbahi-zakaria-999a72256/",
    icon: Linkedin,
  },
  {
    label: "contact",
    url: "mailto:zakaria.mosbahi.dev@gmail.com",
    icon: Mail,
  },
];
export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 flex flex-col justify-center items-center  w-full px-4 md:px-0 dark:text-[#646464] text-[#808080] ">
      <div className="flex gap-4 max-w-[900px] py-4 items-center">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            rel="noopener noreferrer"
            target="_blank"
            className="flex transition-all duration-300 gap-2 capitalize items-center hover:text-[#1e1e1e] dark:hover:text-[#eeeeee]"
          >
            <link.icon className="w-6" />
            {link.label}
          </a>
        ))}
      </div>
      <p className="w-full border-t dark:border-t-[#646464] border-t-[#808080] py-4 text-center">
        &copy; {new Date().getFullYear()} Zakaria Mosbahi. All rights reserved.
      </p>
    </div>
  );
}
