import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "מדיניות תנאי השימוש",
};

export default function PolicyPage() {
  return (
    <div dir="rtl" className="px-6 w-full  py-12">
      <div className="mb-1"></div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">מדיניות ותנאים</h1>
          <p className="text-muted-foreground mt-2">
            עודכן לאחרונה: 25 במרץ, 2025
          </p>
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>1. כללי</CardTitle>
            <CardDescription>מידע על השירותים שלנו</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>
              האתר (להלן: &quot;השקעה נבונה&quot;) מספק מידע כללי, ניתוחים ודעות
              אישיות בנוגע לנושאים שונים. כל המידע המפורסם באתר מוצע למטרות מידע
              בלבד ואין לראות בו ייעוץ מקצועי מכל סוג שהוא.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. אין לראות בתוכן כהמלצה לפעולה</CardTitle>
            <CardDescription>הצהרת אי-אחריות על שימוש בתוכן</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>
              המידע באתר אינו מהווה המלצה אישית לביצוע פעולות כלשהן. כל שימוש
              במידע המופיע באתר נעשה על דעתו ואחריותו הבלעדית של המשתמש, ומומלץ
              להיוועץ ביועצים מוסמכים בטרם קבלת החלטות.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. היעדר אחריות לנכונות המידע ועדכניותו</CardTitle>
            <CardDescription>המחויבות שלנו לאיכות המידע</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>
              אנו עושים מאמצים לוודא שהמידע באתר מעודכן ומדויק, אך אין אנו
              מתחייבים לכך. תוכן האתר עשוי להיות מבוסס על מקורות צד ג&apos;
              שאינם בשליטתנו, וייתכן כי יכילו שגיאות, אי-דיוקים או מידע שאינו
              מעודכן.
            </p>
            <p className="mt-4">
              הנהלת האתר, הכותבים או מי מטעמם אינם אחראים לכל נזק, הפסד, הוצאה
              או אובדן שעלולים להיגרם למשתמשים כתוצאה מהסתמכות על המידע המופיע
              באתר.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. אין התחייבות לביצועים</CardTitle>
            <CardDescription>הצהרת אי-אחריות על תוצאות עתידיות</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>
              המידע באתר עשוי לכלול ניתוחים, תחזיות, הערכות ודעות. מידע זה אינו
              מבטיח ביצועים או תשואות כלשהן. ביצועי עבר אינם מעידים בהכרח על
              ביצועים עתידיים, ואין לראות במידע שבאתר כהתחייבות לתוצאה מסוימת.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. קישורים לאתרים חיצוניים</CardTitle>
            <CardDescription>היחסים שלנו עם תוכן של צד שלישי</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>
              האתר עשוי להכיל קישורים לאתרים חיצוניים שאינם בשליטתנו. אין אנו
              אחראים לתוכן, אמינות, זמינות או התאמה של אתרים אלו, והשימוש בהם
              נעשה על אחריות המשתמש בלבד.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. שימוש באתר ואבטחת מידע</CardTitle>
            <CardDescription>
              האחריות שלך בעת שימוש בשירותים שלנו
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>
              השימוש באתר הינו באחריות המשתמש בלבד. הנהלת האתר אינה אחראית לכל
              נזק ישיר או עקיף שעלול להיגרם כתוצאה מהשימוש באתר, לרבות נזקים
              טכניים, חשיפת מידע אישי או כל פגיעה אחרת.
            </p>
            <p className="mt-4">
              בנוסף, למרות שאנו נוקטים אמצעי אבטחה סבירים, אין באפשרותנו להבטיח
              כי השימוש באתר יהיה חף מבעיות אבטחה, חדירות בלתי מורשות או סיכונים
              אחרים.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. שינויים ועדכונים</CardTitle>
            <CardDescription>כיצד אנו מנהלים שינויי מדיניות</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>
              הנהלת האתר רשאית לשנות, לעדכן או להסיר את התוכן באתר, כולל תנאי
              כתב הוויתור, בכל עת וללא הודעה מוקדמת. השימוש המתמשך באתר לאחר
              עדכון תנאי כתב הוויתור מהווה הסכמה לתנאים החדשים.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. יצירת קשר</CardTitle>
            <CardDescription>כיצד ליצור קשר עם הצוות שלנו</CardDescription>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            <p>
              בכל שאלה או הבהרה בנוגע לתנאי השימוש והמידע באתר, ניתן ליצור קשר
              עם הנהלת האתר באמצעות פרטי הקשר הבאים:
            </p>
            <div className="mt-4 flex flex-col space-y-2">
              <p>
                דוא&quot;ל:{"anivstory@gmail.com"}
                <a
                  href="anivstory@gmail.com"
                  className="text-primary hover:underline"
                >
                  anivstory@gmail.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
