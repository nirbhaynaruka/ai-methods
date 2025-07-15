// File: src/components/DemoLauncher.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function DemoLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
    href: string
  ) => {
    setIsOpen(false);
    if (pathname === href.split("#")[0]) {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 flex flex-col items-end">
      {/* Pop-up Options to the left of the button */}
      <div
        className={`absolute right-16 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <Link
          href="/prompts#sparkle-prompt"
          onClick={(e) => handleLinkClick(e, "sparkle-prompt", "/prompts")}
          className="flex ring-1 ring-[#efefef] items-center bg-[#FFFFFF] text-[#0A0A0A] px-4 py-2 rounded-full shadow-md hover:bg-[#E0E0E0] transition-colors duration-200 text-sm font-semibold"
        >
          <span className="mr-2 text-xl ">✨</span>
          Sparkle Prompt
        </Link>
        <Link
          href="/#ai-advantage"
          onClick={(e) => handleLinkClick(e, "ai-advantage", "/")}
          className="flex ring-1 ring-[#efefef] items-center bg-[#FFFFFF] text-[#0A0A0A] px-4 py-2 rounded-full shadow-md hover:bg-[#E0E0E0] transition-colors duration-200 text-sm font-semibold"
        >
          <span className="mr-2 text-xl">💡</span>
          AI Advantage
        </Link>
      </div>

      {/* Main Button */}
     <button
  onClick={() => setIsOpen(!isOpen)}
  className="bg-[#0A0A0A] opacity-75 text-white px-6 py-3 rounded-full shadow-lg 
    font-bold flex items-center justify-center space-x-2 
    transition-colors duration-200 w-16 h-16 ring-2 ring-[#000000] 
    hover:scale-105 group hover:opacity-100 cursor-pointer hover:animate-pulse"
>
  <Image
    src="/images/app_icon_512_transparent.png"
    alt="AI Methods Logo"
    width={38}
    height={38}
    className="ml-1"
    style={{ maxWidth: "none" }}
  />
  <span
    className="absolute left-1/2 -translate-x-1/2 -top-12 bg-black/90 text-white text-[10px] px-2 py-0.5 rounded font-semibold shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap"
  >
    Try AI Methods
  </span>
</button>
      
    </div>
  );
}
