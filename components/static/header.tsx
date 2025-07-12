"use client";
import React, { useState } from "react"; // Import useState

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Menu, Calculator, Star, Home } from "lucide-react"; // Import Lucide icons directly
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    href: "/categories/pension-and-insurance",
    label: "פנסיה וביטוחים",
    description: "מדריכים על פנסיה, ביטוח חיים ובריאות",
  },
  {
    href: "/categories/personal-finance",
    label: "התנהלות כלכלית",
    description: "ניהול תקציב, חיסכון ותכנון פיננסי",
  },
  {
    href: "/categories/real-estate",
    label: 'נדל"ן',
    description: "השקעות, רכישה ומכירה של נכסים",
  },
  {
    href: "/categories/stock-market",
    label: "שוק ההון",
    description: "מניות, אג״ח וכלי השקעה",
  },
];

export default function Header() {
  // State to control the mobile sheet's open/close status
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Function to close the sheet
  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Logo with improved spacing and hover effect */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-9 w-9 transition-transform group-hover:scale-105">
            <Image
              src="https://res.cloudinary.com/dz5yhvdqt/image/upload/v1748872292/ql58marlkisllc1jxzcj_xcsok2.avif"
              alt="לוגו - השקעה נבונה"
              width={36}
              height={36}
              className="rounded-md shadow-sm"
            />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              השקעה נבונה
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with improved styling */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Home link */}
          <Link href="/">
            <Button
              variant="ghost"
              className="text-base font-medium hover:bg-accent/80 transition-all duration-200"
            >
              <Home className="ml-2 h-4 w-4" />
              בית
            </Button>
          </Link>

          <NavigationMenu dir="rtl">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base font-medium cursor-pointer hover:bg-accent/80 transition-all duration-200 data-[state=open]:bg-accent">
                  מאמרים
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] p-3 gap-2">
                    <div className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/articles"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md mb-3"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-right">
                            כל המאמרים
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground text-right">
                            גלה את כל המאמרים שלנו בנושאי כלכלה והשקעות
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    {categories.map((category) => (
                      <NavigationMenuLink key={category.href} asChild>
                        <Link
                          href={category.href}
                          className="group grid h-auto w-full items-start gap-2 rounded-md bg-background p-3 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none hover:shadow-sm"
                        >
                          <div className="text-sm font-medium leading-none group-hover:text-blue-600 transition-colors text-right">
                            {category.label}
                          </div>
                          <div className="text-xs text-muted-foreground text-right line-clamp-2">
                            {category.description}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Improved CTA buttons with better visual hierarchy */}
          <Link href="/tools/compound-interest-calculator">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Calculator className="ml-2 h-4 w-4" />
              מחשבון ריבית דריבית
            </Button>
          </Link>

          <Link href="/special-offer">
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 relative">
              <Star className="ml-2 h-4 w-4" />
              הצעה מיוחדת
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5 animate-pulse"
              >
                חדש
              </Badge>
            </Button>
          </Link>
        </div>

        {/* Improved Mobile Navigation */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          {" "}
          {/* Control sheet state */}
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent hover:bg-accent transition-all duration-200"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">פתח תפריט ניווט</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[320px] sm:w-[400px] p-0"
            dir="rtl"
          >
            <div className="flex flex-col h-full">
              {/* Mobile header */}
              <div className="p-6 border-b bg-muted/30">
                <div className="flex items-center space-x-3">
                  <div className="relative h-8 w-8">
                    <Image
                      src="https://res.cloudinary.com/dz5yhvdqt/image/upload/v1748872292/ql58marlkisllc1jxzcj_xcsok2.avif"
                      alt="לוגו - השקעה נבונה"
                      width={32}
                      height={32}
                      className="rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile navigation content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col space-y-4">
                  {/* Home link */}
                  <Link href="/" className="w-full" onClick={closeSheet}>
                    {" "}
                    {/* Add onClick */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-right hover:bg-accent/80 transition-all duration-200"
                    >
                      <Home className="ml-2 h-4 w-4" />
                      בית
                    </Button>
                  </Link>

                  {/* Articles with Categories */}
                  <Collapsible className="space-y-3">
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/articles"
                        className="w-full"
                        onClick={closeSheet}
                      >
                        {" "}
                        {/* Add onClick */}
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-right hover:bg-accent/80 transition-all duration-200"
                        >
                          כל המאמרים
                        </Button>
                      </Link>
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-3 px-4 text-base font-semibold hover:bg-accent/50 rounded-md transition-all duration-200 border">
                        קטגוריות מאמרים
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2 pr-4 animate-in slide-in-from-top-1 duration-200">
                      {categories.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          className="block p-3 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 border-r-2 border-transparent hover:border-blue-500"
                          onClick={closeSheet} // Add onClick
                        >
                          <div className="font-medium text-right">
                            {category.label}
                          </div>
                          <div className="text-xs text-muted-foreground text-right mt-1">
                            {category.description}
                          </div>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Divider */}
                  <div className="border-t my-4"></div>

                  {/* Special Buttons */}
                  <div className="space-y-3 flex flex-col gap-2">
                    <Link
                      href="/tools/compound-interest-calculator"
                      className="w-full"
                      onClick={closeSheet} // Add onClick
                    >
                      <Button
                        variant="outline"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 justify-start shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <Calculator className="ml-2 h-4 w-4" />
                        מחשבון ריבית דריבית
                      </Button>
                    </Link>

                    <Link
                      href="/special-offer"
                      className="w-full"
                      onClick={closeSheet}
                    >
                      {" "}
                      {/* Add onClick */}
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white justify-start shadow-md hover:shadow-lg transition-all duration-200 relative">
                        <Star className="ml-2 h-4 w-4" />
                        הצעה מיוחדת
                        <Badge
                          variant="secondary"
                          className="absolute top-1 left-1 bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5"
                        >
                          חדש
                        </Badge>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
