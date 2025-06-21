import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2Icon, ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "פרטיך נקלטו בהצלחה" },
};
export default function FormSuccess() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800 rtl">
          תודה שיצרת קשר עם מיטב טרייד
        </h1>

        <Card className="w-full border-purple-200 shadow-lg bg-gradient-to-br from-white to-purple-50">
          <CardHeader className="border-b border-purple-100 bg-purple-50 rounded-t-lg">
            <div className="flex justify-center mb-4">
              <CheckCircle2Icon className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-center text-2xl text-purple-800">
              הטופס נשלח בהצלחה!
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div dir="rtl" className="space-y-6 text-center">
              <p className="text-lg text-purple-700">פרטיך התקבלו במערכת</p>
              <p className="text-purple-600">
                נציג של מיטב טרייד יצור איתך קשר בהקדם האפשרי
              </p>

              <div className="pt-4">
                <Link href="/">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-colors group">
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:-translate-x-1 transition-transform" />
                    <span>חזרה לדף הבית</span>
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center mt-4 text-purple-600 text-sm rtl">
          אנו מודים לך על פנייתך ונשמח לעמוד לשירותך
        </p>
      </div>
    </section>
  );
}
