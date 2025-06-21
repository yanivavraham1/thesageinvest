import Link from "next/link";
import { Home, FileText, Info, FileTerminal, Cookie } from "lucide-react";
import { CloudImage } from "./CloudImage";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Top section with logo and main links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo and company name */}
          <div className="flex items-center mb-6 md:mb-0 gap-2">
            <div className=" rounded-full p-2 mr-2">
              <CloudImage
                alt="השקעה נבונה - לוגו"
                src={
                  "https://res.cloudinary.com/dz5yhvdqt/image/upload/v1748092818/icon_qyfoqx.avif"
                }
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <span className="text-xl font-bold">השקעה נבונה</span>
          </div>

          {/* Main navigation links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link
                  href="/"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Home size={18} className="ml-1" />
                  <span>דף הבית</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <FileText size={18} className="ml-1" />
                  <span>מאמרים</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Info size={18} className="ml-1" />
                  <span>אודות</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-6"></div>

        {/* Bottom section with policies and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Policy links */}
          <div className="mb-4 md:mb-0">
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link
                  href="/policy/terms-of-use"
                  className="flex items-center text-sm hover:text-white transition-colors"
                >
                  <FileTerminal size={16} className="ml-1" />
                  <span>תנאי שימוש</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/cookies"
                  className="flex items-center text-sm hover:text-white transition-colors"
                >
                  <Cookie size={16} className="ml-1" />
                  <span>מדיניות קובצי Cookie</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="text-sm text-slate-400">
            © {currentYear} כל הזכויות שמורות ל-השקעה נבונה
          </div>
        </div>
      </div>
    </footer>
  );
}
