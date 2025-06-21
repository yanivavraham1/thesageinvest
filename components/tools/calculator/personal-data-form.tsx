"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCalculator, getCurrentTimestamp } from "./calculator-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { InvestmentSummary } from "./investment-summary";

type PersonalFormErrors = {
  name?: string;
  email?: string;
  dateOfBirth?: string;
  newsletter?: string;
  annualFee?: string;
};

export function PersonalDataForm() {
  const router = useRouter();
  const {
    investArray,
    uuid,
    annualFee,
    setAnnualFee,
    initialInvest,
    monthlyInvest,
    interestRate,
    years,
  } = useCalculator();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [formErrors, setFormErrors] = useState<PersonalFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (investArray.length === 0) {
    return null;
  }

  const lastIndex = investArray.length - 1;
  const invested = investArray[lastIndex].invested;
  const interest = investArray[lastIndex].TotalInterest;
  const total = investArray[lastIndex].total;

  function handlePersonalFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Get current timestamp
    const timestamp = getCurrentTimestamp();

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbze7louitLZ2E1Ls4bqR9UOn_palCgZcEyMLSgkAiWiVjtfKFMw-sO5369_CLwXkPwc/exec";

    // Create a new FormData object manually
    const formData = new FormData();

    // Add all required fields
    formData.append("name", name);
    formData.append("email", email);
    formData.append("timestamp", timestamp);
    formData.append("uuid", uuid);

    // Submit the form data
    fetch(scriptURL, { method: "POST", body: formData })
      .then((response) => {
        console.log("Success!", response);
      })
      .catch((error) => {
        console.error("Error!", error.message);
      });

    // Validate form
    const newErrors: PersonalFormErrors = {};

    if (!name.trim()) {
      newErrors.name = "נא להזין שם מלא";
    }

    if (!email.trim()) {
      newErrors.email = "נא להזין כתובת אימייל";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "נא להזין כתובת אימייל תקינה";
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth = "נא להזין תאריך לידה";
    }

    if (!newsletter) {
      newErrors.newsletter = "יש לאשר קבלת עדכונים במייל";
    }

    if (annualFee < 0 || annualFee > 5) {
      newErrors.annualFee = "דמי ניהול חייבים להיות בין 0 ל-5 אחוזים";
    }

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      // Store data in localStorage for the results page
      const resultsData = {
        name,
        email,
        dateOfBirth,
        initialInvest,
        monthlyInvest,
        interestRate,
        years,
        annualFee,
        investArray,
      };

      localStorage.setItem("investmentResults", JSON.stringify(resultsData));

      // Simulate API call delay then redirect
      setTimeout(() => {
        setIsSubmitting(false);
        router.push("/tools/compound-interest-calculator/results");
      }, 1500);
    }
  }

  return (
    <>
      <InvestmentSummary
        invested={invested}
        interest={interest}
        total={total}
      />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl">קבל את הגרף האישי שלך</CardTitle>
          <CardDescription>
            מלא את הפרטים הבאים כדי לראות תוצאות מפורטות ומותאמות אישית
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handlePersonalFormSubmit}
            className="space-y-4"
            id="personalDataForm"
          >
            <div className="space-y-2">
              <Label htmlFor="name">שם מלא:</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ישראל ישראלי"
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">כתובת אימייל:</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualFee">דמי ניהול שנתיים (%):</Label>
              <Input
                id="annualFee"
                name="annualFee"
                type="number"
                value={annualFee}
                onChange={(e) => setAnnualFee(Number(e.target.value))}
                placeholder="לדוגמה: 0.6%"
                className={formErrors.annualFee ? "border-red-500" : ""}
              />
              {formErrors.annualFee && (
                <p className="text-red-500 text-sm">{formErrors.annualFee}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">תאריך לידה:</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={formErrors.dateOfBirth ? "border-red-500" : ""}
              />
              {formErrors.dateOfBirth && (
                <p className="text-red-500 text-sm">{formErrors.dateOfBirth}</p>
              )}
            </div>

            <div className="flex items-center space-x-2 gap-2 space-x-reverse">
              <Checkbox
                id="newsletter"
                name="newsletter"
                checked={newsletter}
                onCheckedChange={(checked) => setNewsletter(checked as boolean)}
              />
              <Label
                htmlFor="newsletter"
                className={`font-normal ${
                  formErrors.newsletter ? "text-red-500" : ""
                }`}
              >
                אני מאשר/ת קבלת עדכונים ומידע פיננסי שימושי במייל
              </Label>
            </div>
            <div>
              <Label>
                שים לב תאריך הלידה מיועד לייצור גרף מותאם אישית, בהתאם לכך לא
                נשמור אותו אצלנו :)
              </Label>
            </div>
            {formErrors.newsletter && (
              <p className="text-red-500 text-sm">{formErrors.newsletter}</p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  מעבד נתונים...
                </>
              ) : (
                "הצג תוצאות מפורטות"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
