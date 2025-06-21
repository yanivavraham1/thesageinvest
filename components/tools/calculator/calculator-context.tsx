"use client";

import type React from "react";

import { createContext, useContext, useState, type ReactNode } from "react";

type InvestmentData = {
  total: number;
  TotalInterest: number;
  years: number;
  invested: number;
};

type FormErrors = {
  initialInvest?: string;
  monthlyInvest?: string;
  annualFee?: string;
  interestRate?: string;
  years?: string;
};

type CalculatorContextType = {
  initialInvest: string;
  setInitialInvest: (value: string) => void;
  monthlyInvest: string;
  setMonthlyInvest: (value: string) => void;
  interestRate: string;
  setInterestRate: (value: string) => void;
  years: string;
  setYears: (value: string) => void;
  annualFee: number;
  setAnnualFee: (value: number) => void;
  investArray: InvestmentData[];
  setInvestArray: (value: InvestmentData[]) => void;
  errors: FormErrors;
  setErrors: (value: FormErrors) => void;
  isCalculating: boolean;
  setIsCalculating: (value: boolean) => void;
  validateForm: () => boolean;
  calculateInvestment: (e: React.FormEvent) => Promise<void>;
  uuid: string;
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined
);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [initialInvest, setInitialInvest] = useState("");
  const [monthlyInvest, setMonthlyInvest] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [annualFee, setAnnualFee] = useState(0);
  const [investArray, setInvestArray] = useState<InvestmentData[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uuid, setUuid] = useState("");

  // Generate UUID when component mounts
  useState(() => {
    setUuid(generateUUID());
  });

  function validateForm(): boolean {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!initialInvest) {
      newErrors.initialInvest = "נא להזין סכום הפקדה ראשוני";
      isValid = false;
    } else if (Number.parseFloat(initialInvest) < 0) {
      newErrors.initialInvest = "סכום הפקדה ראשוני חייב להיות חיובי";
      isValid = false;
    }

    if (!monthlyInvest) {
      newErrors.monthlyInvest = "נא להזין הפקדה חודשית";
      isValid = false;
    } else if (Number.parseFloat(monthlyInvest) < 0) {
      newErrors.monthlyInvest = "הפקדה חודשית חייבת להיות חיובית";
      isValid = false;
    }

    if (!interestRate) {
      newErrors.interestRate = "נא להזין רווח שנתי ממוצע";
      isValid = false;
    } else if (
      Number.parseFloat(interestRate) < 0 ||
      Number.parseFloat(interestRate) > 100
    ) {
      newErrors.interestRate = "רווח שנתי ממוצע חייב להיות בין 0 ל-100";
      isValid = false;
    }

    if (!years) {
      newErrors.years = "נא להזין זמן השקעה";
      isValid = false;
    } else if (Number.parseInt(years) <= 0 || Number.parseInt(years) > 100) {
      newErrors.years = "זמן השקעה חייב להיות בין 1 ל-100 שנים";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  async function calculateInvestment(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let total = Number.parseFloat(initialInvest);
    let totalInterest = 0;
    const newArray: InvestmentData[] = [];

    for (let index = 0; index < Number.parseInt(years); index++) {
      total += Number.parseFloat(monthlyInvest) * 12;
      const interest = (total * Number.parseFloat(interestRate)) / 100;
      const fee = (total * annualFee) / 100;
      total += interest - fee;
      totalInterest += interest - fee;

      newArray.push({
        total: Number.parseFloat(total.toFixed(2)),
        TotalInterest: Number.parseFloat(totalInterest.toFixed(2)),
        years: index + 1,
        invested:
          Number.parseFloat(initialInvest) +
          Number.parseFloat(monthlyInvest) * 12 * (index + 1),
      });
    }

    setInvestArray(newArray);
    setIsCalculating(false);
  }

  return (
    <CalculatorContext.Provider
      value={{
        initialInvest,
        setInitialInvest,
        monthlyInvest,
        setMonthlyInvest,
        interestRate,
        setInterestRate,
        years,
        setYears,
        annualFee,
        setAnnualFee,
        investArray,
        setInvestArray,
        errors,
        setErrors,
        isCalculating,
        setIsCalculating,
        validateForm,
        calculateInvestment,
        uuid,
        isSubmitted,
        setIsSubmitted,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
}

// Function to generate UUID
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Function to get current datetime in ISO format
export function getCurrentTimestamp() {
  return new Date().toISOString();
}
