import { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות קובצי Cookie",
};

export default function CookiesPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl" dir="rtl">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">מדיניות קובצי Cookie</h1>

        <p className="text-lg">
          מסמך זה מסביר כיצד אנו משתמשים בקובצי Cookie ובטכנולוגיות דומות באתר
          שלנו.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">מהם קובצי Cookie?</h2>
          <p>
            קובצי Cookie הם קבצי טקסט קטנים הנשמרים במכשיר שלך כאשר אתה מבקר
            באתר. הם מאפשרים לאתר לזהות את הדפדפן שלך, לשמור העדפות ולשפר את
            חוויית השימוש שלך.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            כיצד אנו משתמשים בקובצי Cookie?
          </h2>
          <p>אנו משתמשים בקובצי Cookie למטרות הבאות:</p>

          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>
              <span className="font-medium">קובצי Cookie חיוניים</span> – נחוצים
              להפעלת האתר ולשימוש בתכונות הבסיסיות שלו.
            </li>
            <li>
              <span className="font-medium">קובצי Cookie של ביצועים</span> –
              מסייעים לנו להבין כיצד משתמשים מבקרים באתר ולשפר את התוכן
              והשירותים שלנו.
            </li>
            <li>
              <span className="font-medium">קובצי Cookie של פונקציונליות</span>{" "}
              – מאפשרים לאתר לזכור את ההעדפות שלך, כגון שפה או אזור.
            </li>
            <li>
              <span className="font-medium">קובצי Cookie של פרסום</span> –
              משמשים להצגת מודעות רלוונטיות ולהתאמת התוכן בהתאם להעדפותיך.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            ניהול ואפשרות ביטול קובצי Cookie
          </h2>
          <p>
            באפשרותך לשנות את הגדרות הדפדפן שלך כדי לחסום או למחוק קובצי Cookie.
            עם זאת, ייתכן כי חלק מהפונקציות באתר לא יעבדו כראוי אם תבחר לחסום
            אותם.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">שינויים במדיניות זו</h2>
          <p>
            אנו עשויים לעדכן את מדיניות קובצי ה-Cookie מעת לעת. מומלץ לבדוק דף
            זה באופן תקופתי כדי להישאר מעודכן.
          </p>
        </section>

        <section className="space-y-4">
          <p>
            אם יש לך שאלות נוספות, ניתן ליצור איתנו קשר דרך{" "}
            <a href="/contact" className="text-primary underline">
              פרטי יצירת הקשר באתר
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
