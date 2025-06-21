import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Disclaimer() {
  return (
    <Card className="bg-amber-50 border-amber-200 shadow-sm">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 shrink-0">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-2">
              הצהרת אחריות
            </h4>
            <p className="text-amber-700 text-sm md:text-base">
              {
                'כל המידע המוצג באתר זה הינו למטרות מידע והשכלה בלבד ואינו מהווה המלצה, חוות דעת, או ייעוץ לביצוע פעולות השקעה כלשהן. אין לראות בתכנים המופיעים באתר תחליף לייעוץ השקעות המותאם לצרכיך האישיים והמתחשב בנתוניך האישיים. לפני ביצוע פעולות השקעה כלשהן, מומלץ להתייעץ עם יועץ השקעות מורשה או גורם מקצועי אחר. השקעות בשוק ההון כרוכות בסיכונים ועלולות להוביל להפסדים. "השקעה נבונה" אינה אחראית לכל נזק או הפסד שעלול להיגרם כתוצאה משימוש במידע המופיע באתר.'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
