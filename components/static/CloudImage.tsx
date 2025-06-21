"use client";
import { CldImage } from "next-cloudinary";
import { CldImageProps } from "next-cloudinary";
import { useState } from "react";

export function CloudImage(props: CldImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className=" h-fit">
      <div
        className={`absolute inset-0 bg-gray-200 animate-pulse ${
          isLoading ? "block" : "hidden"
        }`}
      />
      <CldImage
        {...props}
        quality={85}
        format="auto"
        loading={props.priority ? "eager" : "lazy"}
        onLoad={() => setIsLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        className={`${props.className || ""} ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
