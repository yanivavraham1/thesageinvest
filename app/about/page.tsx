import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";
import {
  BookOpen,
  Users,
  TrendingUp,
  BarChart2,
  Shield,
  Lightbulb,
  Target,
  Clock,
} from "lucide-react";
import Caption from "@/components/static/caption";
import { CloudImage } from "@/components/static/CloudImage";
import { HeroSection } from "@/components/static/hero-section";
export const metadata: Metadata = {
  title: "אודותינו",
};

// Values data
const values = [
  {
    title: "מקצועיות",
    description:
      "אנו מחויבים לספק תוכן מקצועי ומדויק, המבוסס על מחקר מעמיק וניתוח מקיף של השווקים.",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    title: "שקיפות",
    description:
      "אנו מאמינים בשקיפות מלאה בכל הנוגע להשקעות, כולל הסיכונים והאתגרים הכרוכים בהן.",
    icon: Shield,
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "נגישות",
    description:
      "המטרה שלנו היא להנגיש ידע פיננסי לכל אדם, ללא תלות ברקע או בניסיון קודם בהשקעות.",
    icon: Users,
    color: "bg-purple-100 text-purple-800",
  },
  {
    title: "חדשנות",
    description:
      "אנו מתעדכנים באופן שוטף בחידושים ובמגמות בשוק ההון, ומביאים לקוראינו את המידע העדכני ביותר.",
    icon: Lightbulb,
    color: "bg-amber-100 text-amber-800",
  },
  {
    title: "אובייקטיביות",
    description:
      "אנו מחויבים לספק ניתוחים אובייקטיביים ולא מוטים, המבוססים על נתונים ועובדות.",
    icon: Target,
    color: "bg-rose-100 text-rose-800",
  },
  {
    title: "ראייה לטווח ארוך",
    description:
      "אנו מאמינים בגישת השקעה לטווח ארוך, המבוססת על עקרונות יציבים ולא על טרנדים חולפים.",
    icon: Clock,
    color: "bg-teal-100 text-teal-800",
  },
];

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-sky-50 to-white rtl"
      dir="rtl"
    >
      <main className="">
        {/* Hero Section */}
        <HeroSection
          title="אודות השקעה נבונה"
          paragraph="הכירו את הסיפור והאנשים מאחורי בלוג ההשקעות המוביל בישראל"
          fromColor="from-white"
          toColor="to-blue-100"
          className="mb-3"
        />

        {/* Our Story */}
        <section className="mb-20 container mx-auto">
          <Caption color="blue-500" text="הסיפור שלנו" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-lg mb-6 leading-relaxed text-gray-700">
                השקעה נבונה נוסדה בשנת 2025 מתוך אמונה פשוטה: ידע פיננסי איכותי
                צריך להיות נגיש לכולם, לא רק למי שיכול לשלם עבור ייעוץ יקר.
              </p>
              <p className="text-lg mb-6 leading-relaxed text-gray-700">
                המייסד שלנו, יניב אברהם, זיהה פער משמעותי בין המידע הזמין
                למשקיעים מקצועיים לבין המידע הנגיש לציבור הרחב. הוא החליט לגשר
                על הפער הזה באמצעות בלוג שיספק תוכן מקצועי, אמין ונגיש בתחום
                ההשקעות.
              </p>
              <p className="text-lg mb-6 leading-relaxed text-gray-700">
                {" "}
                אנו גאים להיות חלק מהמסע הפיננסי של קוראינו, ומחויבים להמשיך
                ולספק להם את הכלים והידע הדרושים להצלחה.
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <CloudImage
                src="static/nbzfvzhyvmsd9lj1pily"
                alt="הסיפור של השקעה נבונה"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white text-lg">
                  אנחנו כאן כדי להנגיש את שוק ההון
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-20">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600"></div>
              <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dz5yhvdqt/image/upload/v1743437176/static/kjvrz83y9lmzyduljdzr.webp?height=400&width=1200')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
              <CardContent className="relative z-10 p-10 md:p-16 text-white">
                <div className="max-w-3xl mx-auto text-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">
                    המשימה שלנו
                  </h3>
                  <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                    להנגיש ידע פיננסי איכותי לכל אדם, ולהעניק לקוראינו את הכלים
                    והביטחון לקבל החלטות השקעה מושכלות שיובילו לעצמאות פיננסית.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                        <BookOpen className="h-8 w-8" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">חינוך</h4>
                      <p className="text-white/80 text-center">
                        לספק תוכן חינוכי ברמה גבוהה בתחום ההשקעות
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                        <TrendingUp className="h-8 w-8" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">העצמה</h4>
                      <p className="text-white/80 text-center">
                        להעצים אנשים לקחת אחריות על עתידם הפיננסי
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                        <BarChart2 className="h-8 w-8" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">ניתוח</h4>
                      <p className="text-white/80 text-center">
                        לספק ניתוחים מעמיקים ואובייקטיביים של השווקים
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <Caption color="emerald-500" text="הערכים שלנו" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <div
                    className={`w-12 h-12 rounded-full ${value.color} flex items-center justify-center mb-4`}
                  >
                    {React.createElement(value.icon, { className: "h-6 w-6" })}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
