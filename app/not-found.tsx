import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md text-center mb-8">
        <div className="relative w-64 h-64 mx-auto mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
          <div className="absolute inset-4 bg-primary/20 rounded-full animate-pulse [animation-delay:0.2s]" />
          <div className="absolute inset-8 bg-primary/30 rounded-full animate-pulse [animation-delay:0.4s]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-extrabold text-primary">404</span>
          </div>
        </div>
      </div>

      <div
        className="w-full max-w-md text-right bg-card border rounded-lg shadow-lg overflow-hidden"
        dir="rtl"
      >
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h2 className="text-2xl font-bold">דף לא נמצא</h2>
          </div>
          <p className="text-muted-foreground">
            מצטערים, לא הצלחנו למצוא את הדף שחיפשת.
          </p>
        </div>

        <div className="bg-muted/50 p-6">
          <p className="text-sm mb-6">
            ייתכן שהכתובת הוקלדה באופן שגוי, הדף הוסר או שונה שמו, או שהדף אינו
            זמין כרגע.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              asChild
              variant="default"
              className="w-full group transition-all hover:shadow-md"
            >
              <Link href="/" className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>חזרה לדף הבית</span>
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full group">
              <Link
                href="/posts"
                className="flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>חיפוש באתר</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground" dir="rtl">
        <p>
          אם אתה חושב שזו טעות, אנא{" "}
          <Link href="/contact" className="text-primary hover:underline">
            צור קשר
          </Link>{" "}
          עם צוות התמיכה.
        </p>
      </div>
    </div>
  );
}
