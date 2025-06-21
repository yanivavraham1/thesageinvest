"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PhoneIcon, UserIcon, UsersIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Checkbox } from "@/components/ui/checkbox";

export default function ContactForm() {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbx2ihqKPuL7H_egzXwz4qsPoalDMVRcSvWNddJTOyunEzbcVHjMUmUSdExMEfCVhcNs/exec";
    const formData = new FormData(event.target as HTMLFormElement);

    fetch(scriptURL, { method: "POST", body: formData })
      .then(() => {
        window.location.href = "/meitav/success";
        // Clear form (this will only execute if the redirect fails)
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
        });
        setRecaptchaValue(null);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <section className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-purple-800 rtl">
            השאר פרטים ונציג של מיטב טרייד יחזור אליך בהקדם
          </h1>

          <Card className="w-full border-purple-200 shadow-lg bg-gradient-to-br from-white to-purple-50">
            <CardHeader className="border-b border-purple-100 bg-purple-50 rounded-t-lg">
              <CardTitle className="text-center text-2xl text-purple-800">
                טופס יצירת קשר
              </CardTitle>
              <CardDescription className="text-center text-purple-600 rtl">
                אנא מלא את הפרטים ונחזור אליך בהקדם
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form dir="rtl" className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-purple-700 font-medium flex items-center gap-2"
                  >
                    <UserIcon className="h-4 w-4" />
                    שם פרטי
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all"
                    placeholder="הכנס את שמך הפרטי"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-purple-700 font-medium flex items-center gap-2"
                  >
                    <UsersIcon className="h-4 w-4" />
                    שם משפחה
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all"
                    placeholder="הכנס את שם המשפחה שלך"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-purple-700 font-medium flex items-center gap-2"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    מספר טלפון
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 transition-all"
                    placeholder="הכנס את מספר הטלפון שלך"
                    pattern="[0-9]{9,10}"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required disabled={isSubmitting} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    אני מכיר כי לפתיחת חשבון השקעות במיטב טרייד תדרש הפקדה
                    ראשונית על סך 10,000 ₪
                  </label>
                </div>
                <ReCAPTCHA
                  sitekey="6Le9swArAAAAAB5kiXlXSw95yUYbBUhqaNoddv8C"
                  onChange={handleRecaptchaChange}
                  className="flex justify-center"
                />

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors group mt-4"
                  disabled={!recaptchaValue || isSubmitting}
                >
                  {isSubmitting ? (
                    <span>שולח...</span>
                  ) : (
                    <>
                      <span>צרו איתי קשר</span>
                      <SendIcon className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center mt-4 text-purple-600 text-sm rtl">
            אנו מתחייבים לשמור על פרטיותך ולא להעביר את פרטיך לאף אחד גורם אחר
          </p>
        </div>
      </section>
    </>
  );
}
