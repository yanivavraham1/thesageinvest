import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  paragraph: string;
  fromColor: string;
  toColor: string;
  className?: string;
}

export function HeroSection({
  title,
  paragraph,
  fromColor,
  toColor,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative overflow-hidden py-4", className)}>
      <div
        className={cn("absolute inset-0 bg-gradient-to-r", fromColor, toColor)}
      ></div>
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-48 h-48 mx-auto mb-2">
            <Image
              src="https://res.cloudinary.com/dz5yhvdqt/image/upload/v1748872292/ql58marlkisllc1jxzcj_xcsok2.avif"
              alt="השקעה נבונה"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            {paragraph}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/posts" passHref>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:opacity-90 transition-opacity"
              >
                התחל לקרוא
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                אודות הבלוג
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
