import { TrendingUp, Lightbulb, Users, Award } from "lucide-react";
import { Metadata } from "next";
import Script from "next/script";
import { getPosts } from "@/lib/prisma";
import { HeroSection } from "@/components/static/hero-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { PostCard2 } from "@/components/article/cards/PostCard2";
import { PostCard3 } from "@/components/article/cards/PostCard3";
import { PostCard1 } from "@/components/article/cards/PostCard1";
import CategoryCards from "@/components/static/categories";
// Categories with colors

export const metadata: Metadata = {
  title: "השקעה נבונה | המדריך המלא להשקעות חכמות",
  description:
    "בלוג מקצועי על השקעות בשוק ההון, ניתוחים פיננסיים, טיפים מעשיים ואסטרטגיות חכמות למשקיעים מתחילים ומנוסים. כולל מדריכים מקיפים, כלים פיננסיים וניתוחי שוק עדכניים.",
  openGraph: {
    title: "השקעה נבונה | המדריך המלא להשקעות חכמות",
    description:
      "בלוג מקצועי על השקעות בשוק ההון, ניתוחים פיננסיים, טיפים מעשיים ואסטרטגיות חכמות למשקיעים מתחילים ומנוסים.",
    type: "website",
    locale: "he_IL",
    siteName: "השקעה נבונה",
  },
  twitter: {
    card: "summary_large_image",
    title: "השקעה נבונה | המדריך המלא להשקעות חכמות",
    description:
      "בלוג מקצועי על השקעות בשוק ההון, ניתוחים פיננסיים, טיפים מעשיים ואסטרטגיות חכמות למשקיעים מתחילים ומנוסים.",
  },
};

export default async function Home() {
  const posts = await getPosts(7);

  return (
    <>
      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "השקעה נבונה",
            description:
              "בלוג מקצועי על השקעות בשוק ההון, ניתוחים פיננסיים, טיפים מעשיים ואסטרטגיות חכמות למשקיעים מתחילים ומנוסים.",
            url: process.env.NEXT_PUBLIC_BASE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/posts?search={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <div className="min-h-screen rtl" dir="rtl">
        <main className=" mx-auto ">
          {/* Hero Section */}
          <HeroSection
            title="השקעה נבונה"
            paragraph="
                הבלוג המוביל בישראל לאסטרטגיות השקעה, ניתוחים פיננסיים וטיפים
                להצלחה בשוק ההון"
            fromColor="from-blue-100"
            toColor="to-green-200"
          />
          <section>
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          השקעות חכמות
                        </CardTitle>
                        <CardDescription>
                          טיפים ואסטרטגיות להשקעה נבונה בשוק ההון
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2 */}
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Lightbulb className="h-8 w-8 text-yellow-600" />
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          מדריכים מקצועיים
                        </CardTitle>
                        <CardDescription>
                          מדריכים מעשיים להשקעה חכמה ומושכלת
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 3 */}
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Users className="h-8 w-8 text-green-600" />
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          קהילה תומכת
                        </CardTitle>
                        <CardDescription>
                          הצטרפו לקהילה שלנו לשיתוף ידע ותמיכה הדדית
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 4 */}
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Award
                        className="h-8
 w-8 text-purple-600"
                      />
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          הישגים מרשימים
                        </CardTitle>
                        <CardDescription>
                          ניתוחים מעמיקים והצלחות בשוק ההון
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="bg-white p-4">
            <CategoryCards />
          </section>
          <section className=" relative bg-white bg-gradient-to-br  p-4 ">
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 container mx-auto">
              {/* PostCard2 and PostCard3 in the center */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 lg:col-span-5 ">
                <PostCard2 post={posts[0]} className="md:col-span-2" />
                <PostCard3 post={posts[1]} />
                <PostCard3 post={posts[2]} />
              </div>
              {/* PostCard1 list on the left */}
              <div className="flex flex-col gap-2 lg:col-span-3">
                <div className="text-center justify-center">
                  <h3 className="font-bold">מאמרים מומלצים</h3>
                </div>
                <PostCard1 post={posts[3]} />
                <PostCard1 post={posts[4]} />
                <PostCard1 post={posts[5]} />
                <PostCard1 post={posts[6]} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
