import type React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  href: string;
  text: string;
  src: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ href, text, src }) => {
  return (
    <Link
      href={href}
      className="group block bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-300"
    >
      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4 group-hover:from-blue-100 group-hover:to-indigo-200 transition-colors duration-300">
          <Image
            src={src || "/placeholder.svg"}
            alt={text}
            width={80}
            height={80}
            className="sm:w-[100px] sm:h-[100px] w-[80px] h-[80px] object-contain"
          />
        </div>
        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
          {text}
        </h3>
        <div className="w-6 sm:w-8 h-0.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
};

export default function CategoryCards() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
        <CategoryCard
          src="/category1.png?height=100&width=100"
          href="/categories/pension-and-insurance"
          text="פנסיה וביטוחים"
        />
        <CategoryCard
          src="/category2.png?height=100&width=100"
          href="/categories/personal-finance"
          text="התנהלות כלכלית"
        />
        <CategoryCard
          src="/category3.png?height=100&width=100"
          href="/categories/real-estate"
          text='נדל"ן'
        />
        <CategoryCard
          src="/category4.png?height=100&width=100"
          href="/categories/stock-market"
          text="שוק ההון"
        />
      </div>
    </div>
  );
}
