"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Calculator, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CloudImage } from "./CloudImage";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { href: "/categories/pension-and-insurance", label: "פנסיה וביטוחים" },
    { href: "/categories/personal-finance", label: "התנהלות כלכלית" },
    { href: "/categories/real-estate", label: 'נדל"ן' },
    { href: "/categories/stock-market", label: "שוק ההון" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
      <div className="container mx-auto px-4 ">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center ">
            <Link
              href="/"
              className="shrink-0 flex-1"
              aria-label="השקעה נבונה - דף הבית"
            >
              <div className=" w-fit rounded flex items-center justify-center gap-2">
                <CloudImage
                  className="rounded-full"
                  src="https://res.cloudinary.com/dz5yhvdqt/image/upload/v1748872292/ql58marlkisllc1jxzcj_xcsok2.avif"
                  height={55}
                  width={55}
                  alt="לוגו השקעה נבונה"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:mr-10 lg:flex lg:items-center lg:space-x-6 lg:space-x-reverse"
              aria-label="תפריט ראשי"
            >
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-200"
              >
                דף הבית
              </Link>

              <Link
                href="/posts"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-200"
              >
                מאמרים
              </Link>

              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-200 flex items-center gap-1"
                  >
                    קטגוריות
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.href} asChild>
                      <Link
                        href={category.href}
                        className="w-full text-right cursor-pointer"
                      >
                        {category.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Financial Tools - Special styling */}
              <Link
                href="/tools/compound-interest-calculator"
                className="relative group mx-3"
              >
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  ריבית דריבית
                </Button>
              </Link>

              {/* Special Offer - Special styling */}
              <Link href="/special-offer" className="relative group">
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg animate-pulse flex items-center gap-2"
                >
                  <Gift className="h-4 w-4" />
                  הצעה מיוחדת
                </Button>
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden bg-white absolute w-full shadow-md transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <nav
          className="flex flex-col space-y-1 px-4 pb-4"
          aria-label="תפריט נייד"
        >
          <Link
            href="/"
            className="text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 text-base font-medium rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            דף הבית
          </Link>

          <Link
            href="/posts"
            className="text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-3 text-base font-medium rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            מאמרים
          </Link>

          {/* Mobile Categories */}
          <div className="px-3 py-2">
            <div className="text-gray-700 font-medium mb-2">קטגוריות</div>
            <div className="mr-4 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 text-sm rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Financial Tools */}
          <Link
            href="/tools/compound-interest-calculator"
            className="mx-3 my-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Button
              variant="outline"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              ריבית דריבית
            </Button>
          </Link>

          {/* Mobile Special Offer */}
          <Link
            href="/special-offer"
            className="mx-3 my-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Button
              variant="outline"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-md animate-pulse flex items-center justify-center gap-2"
            >
              <Gift className="h-4 w-4" />
              הצעה מיוחדת
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
