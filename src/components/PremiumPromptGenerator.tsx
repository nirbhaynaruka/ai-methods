// File: src/components/DemoLauncher.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';

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
    <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 grid justify-items-end opacity-40">
      {/* Pop-up Options */}
      <div
        className={`flex flex-col items-end space-y-2 mb-2 transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Link
          href="/prompts#sparkle-prompt"
          onClick={(e) => handleLinkClick(e, "sparkle-prompt", "/prompts")}
          className="flex items-center bg-[#FFFFFF] text-[#0A0A0A] px-4 py-2 rounded-full shadow-md hover:bg-[#E0E0E0] transition-colors duration-200 text-sm font-semibold"
        >
          <span className="mr-2 text-xl">✨</span>
          Sparkle Prompt
        </Link>
        <Link
          href="/#ai-advantage"
          onClick={(e) => handleLinkClick(e, "ai-advantage", "/")}
          className="flex items-center bg-[#FFFFFF] text-[#0A0A0A] px-4 py-2 rounded-full shadow-md hover:bg-[#E0E0E0] transition-colors duration-200 text-sm font-semibold"
        >
          <span className="mr-2 text-xl">💡</span>
          AI Advantage
        </Link>
      </div>
    </div>
  );
}
