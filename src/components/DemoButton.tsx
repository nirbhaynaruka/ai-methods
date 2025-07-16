"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function DemoLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Click-away handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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

  // Half-circle positions for 3 buttons (adjust radius as needed)
  const radius = 110;
  const optionAngles = [225, 180, 135]; // degrees for left half-circle
  const optionData = [
    {
      icon: "✨",
      label: "Try Prompt",
      href: "/prompts#sparkle-prompt",
      targetId: "sparkle-prompt",
      baseHref: "/prompts",
    },
    {
      icon: "💡",
      label: "AI Advantage",
      href: "/#ai-advantage",
      targetId: "ai-advantage",
      baseHref: "/",
    },
    {
      icon: "✏️",
      label: "Humanize Text",
      href: "/humanize",
      targetId: "humanize-text",
      baseHref: "/",
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 flex flex-col items-end"
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Half-circle menu */}
        {isOpen &&
          optionData.map((opt, idx) => {
            const angle = optionAngles[idx];
            const rad = (angle * Math.PI) / 180;
            const left = Math.cos(rad) * radius + 32; // 32 = w-16/2
            const top = Math.sin(rad) * radius + 32;  // 32 = h-16/2
            return (
              <div
                key={opt.label}
                className="absolute transition-all duration-300"
                style={{
                  left: left,
                  top: top,
                  zIndex: 10,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Link
                  href={opt.href}
                  onClick={(e) => handleLinkClick(e, opt.targetId, opt.baseHref)}
                  className="flex ring-1 ring-[#efefef] items-center bg-[#FFFFFF] text-[#0A0A0A] px-4 py-2 rounded-full shadow-md hover:bg-[#E0E0E0] transition-colors duration-200 text-sm font-semibold"
                >
                  <span className="mr-2 text-xl">{opt.icon}</span>
                  {opt.label}
                </Link>
              </div>
            );
          })}
        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-[#0A0A0A] opacity-75 text-white rounded-full shadow-lg 
            font-bold flex items-center justify-center
            transition-colors duration-200 w-16 h-16 ring-2 ring-[#000000] 
            hover:scale-105 group hover:opacity-100 cursor-pointer hover:animate-pulse z-20"
        >
          <Image
            src="/images/app_icon_512_transparent.png"
            alt="AI Methods Logo"
            width={38}
            height={38}
            style={{ maxWidth: "none" }}
          />
          {/* Tooltip: only show when menu is closed */}
          {!isOpen && (
            <span
              className="absolute left-1/2 -translate-x-1/2 -top-6 bg-black/90 text-white text-[10px] px-2 py-0.5 rounded font-semibold shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap"
            >
              Try AI Methods
            </span>
          )}
        </button>
      </div>
    </div>
  );
}