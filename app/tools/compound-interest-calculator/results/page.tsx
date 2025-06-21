"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DetailedResults } from "@/components/tools/calculator/detailed-results";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ResultsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  interface ResultsData {
    name: string;
    email: string;
    dateOfBirth: string;
    initialInvest: number;
    monthlyInvest: number;
    interestRate: number;
    years: number;
    annualFee: number;
    investArray: Array<{
      total: number;
      TotalInterest: number;
      years: number;
      invested: number;
    }>;
  }

  const [resultsData, setResultsData] = useState<ResultsData | null>(null);

  useEffect(() => {
    // Get data from localStorage
    const storedData = localStorage.getItem("investmentResults");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setResultsData(parsedData);
      } catch (error) {
        console.error("Failed to parse stored data:", error);
      }
    }

    setIsLoading(false);
  }, []);

  const handleBackToCalculator = () => {
    router.push("/tools/compound-interest-calculator");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl" dir="rtl">
        <Card className="p-12">
          <CardContent className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
            <p className="text-lg">טוען את התוצאות...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!resultsData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl" dir="rtl">
        <Card className="p-12">
          <CardContent className="flex flex-col items-center justify-center">
            <p className="text-lg mb-4">
              לא נמצאו נתונים. יש לחזור למחשבון ולהזין את הנתונים מחדש.
            </p>
            <Button onClick={handleBackToCalculator}>
              <ArrowRight className="ml-2 h-4 w-4" />
              חזרה למחשבון
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl" dir="rtl">
      <Button
        variant="outline"
        onClick={handleBackToCalculator}
        className="mb-4"
      >
        <ArrowRight className="ml-2 h-4 w-4" />
        חזרה למחשבון
      </Button>

      <DetailedResults
        name={resultsData.name}
        email={resultsData.email}
        dateOfBirth={resultsData.dateOfBirth}
        initialInvest={resultsData.initialInvest}
        monthlyInvest={resultsData.monthlyInvest}
        interestRate={resultsData.interestRate}
        years={resultsData.years}
        annualFee={resultsData.annualFee}
        investArray={resultsData.investArray}
      />
    </div>
  );
}
