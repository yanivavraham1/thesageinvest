"use client";

import { useCalculator } from "./calculator-context";
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
import { Loader2 } from "lucide-react";

export function CalculatorForm() {
  const {
    initialInvest,
    setInitialInvest,
    monthlyInvest,
    setMonthlyInvest,
    interestRate,
    setInterestRate,
    years,
    setYears,
    errors,
    isCalculating,
    calculateInvestment,
  } = useCalculator();

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl">הזן את נתוני ההשקעה שלך</CardTitle>
        <CardDescription>
          מלא את הפרטים כדי לחשב את התשואה הפוטנציאלית
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={calculateInvestment}>
          <div className="space-y-2">
            <Label htmlFor="initialInvest">סכום הפקדה ראשוני (₪):</Label>
            <Input
              id="initialInvest"
              type="number"
              value={initialInvest}
              onChange={(e) => setInitialInvest(e.target.value)}
              placeholder="לדוגמה: 10000"
              className={errors.initialInvest ? "border-red-500" : ""}
            />
            {errors.initialInvest && (
              <p className="text-red-500 text-sm">{errors.initialInvest}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyInvest">הפקדה חודשית (₪):</Label>
            <Input
              id="monthlyInvest"
              type="number"
              value={monthlyInvest}
              onChange={(e) => setMonthlyInvest(e.target.value)}
              placeholder="לדוגמה: 1000"
              className={errors.monthlyInvest ? "border-red-500" : ""}
            />
            {errors.monthlyInvest && (
              <p className="text-red-500 text-sm">{errors.monthlyInvest}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">רווח שנתי ממוצע (%):</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="לדוגמה: 7"
              className={errors.interestRate ? "border-red-500" : ""}
            />
            {errors.interestRate && (
              <p className="text-red-500 text-sm">{errors.interestRate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">זמן השקעה (שנים):</Label>
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="לדוגמה: 20"
              className={errors.years ? "border-red-500" : ""}
            />
            {errors.years && (
              <p className="text-red-500 text-sm">{errors.years}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isCalculating}>
            {isCalculating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                מחשב...
              </>
            ) : (
              "חשב תשואה"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
