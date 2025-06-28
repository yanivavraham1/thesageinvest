"use client";

import { Menu, Calculator, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
import { ChevronDown } from "lucide-react";

const categories = [
  { href: "/categories/pension-and-insurance", label: "פנסיה וביטוחים" },
  { href: "/categories/personal-finance", label: "התנהלות כלכלית" },
  { href: "/categories/real-estate", label: 'נדל"ן' },
  { href: "/categories/stock-market", label: "שוק ההון" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <Image
              src="https://res.cloudinary.com/dz5yhvdqt/image/upload/v1748872292/ql58marlkisllc1jxzcj_xcsok2.avif"
              alt="לוגו - השקעה נבונה"
              width={32}
              height={32}
              className="rounded-sm"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu dir="rtl">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/articles">
                  <NavigationMenuTrigger className="text-base font-medium cursor-pointer">
                    מאמרים
                  </NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent>
                  <div className="grid w-[300px] p-2">
                    {categories.map((category) => (
                      <NavigationMenuLink key={category.href} asChild>
                        <Link
                          href={category.href}
                          className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                        >
                          <div className="text-sm font-medium leading-none group-hover:underline text-right">
                            {category.label}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/tools/compound-interest-calculator">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700"
            >
              <Calculator className="ml-2 h-4 w-4" />
              מחשבון ריבית דריבית
            </Button>
          </Link>

          <Link href="/special-offer">
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
              <Star className="ml-2 h-4 w-4" />
              הצעה מיוחדת
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px]"
            dir="rtl"
          >
            <div className="flex flex-col space-y-4 mt-6">
              {/* Articles with Categories */}
              <Collapsible className="space-y-2">
                <Link href="/articles">
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-lg font-semibold hover:text-accent-foreground">
                    מאמרים
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                </Link>
                <CollapsibleContent className="space-y-2 pr-4">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="block py-2 text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {category.label}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Special Buttons */}
              <Link
                href="/tools/compound-interest-calculator"
                className="w-full"
              >
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 justify-start"
                >
                  <Calculator className="ml-2 h-4 w-4" />
                  מחשבון ריבית דריבית
                </Button>
              </Link>

              <Link href="/special-offer" className="w-full">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white justify-start">
                  <Star className="ml-2 h-4 w-4" />
                  הצעה מיוחדת
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
