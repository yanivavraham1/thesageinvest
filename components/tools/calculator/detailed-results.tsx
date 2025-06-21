"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { Disclaimer } from "@/components/article/components/disclaimer";

type InvestmentData = {
  total: number;
  TotalInterest: number;
  years: number;
  invested: number;
};

interface DetailedResultsProps {
  name: string;
  email?: string;
  dateOfBirth: string;
  initialInvest: string | number;
  monthlyInvest: string | number;
  interestRate: string | number;
  years: string | number;
  annualFee: number;
  investArray: InvestmentData[];
}

export function DetailedResults({
  name,
  email,
  dateOfBirth,
  initialInvest,
  monthlyInvest,
  interestRate,
  years,
  annualFee,
  investArray,
}: DetailedResultsProps) {
  if (investArray.length === 0) {
    return null;
  }

  const lastIndex = investArray.length - 1;
  const totalInvested = investArray[lastIndex].invested;
  const totalInterest = investArray[lastIndex].TotalInterest;
  const totalAmount = investArray[lastIndex].total;

  // Format date of birth
  const formattedDateOfBirth = dateOfBirth
    ? format(new Date(dateOfBirth), "dd/MM/yyyy")
    : "לא צוין";

  // Calculate age
  const age = dateOfBirth
    ? Math.floor(
        (new Date().getTime() - new Date(dateOfBirth).getTime()) /
          (365.25 * 24 * 60 * 60 * 1000)
      )
    : "לא צוין";

  // Calculate expected monthly income at retirement (4% withdrawal rule)
  const monthlyIncome = (totalAmount * 0.04) / 12;

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: number | string;
  }) => {
    if (active && payload && payload.length) {
      // Calculate the actual age based on current age and investment year
      const currentAge = Number(age);
      const ageAtYear = typeof label === "number" ? currentAge + label : label;

      return (
        <Card className="p-2 bg-white shadow-lg border border-gray-200">
          <CardContent className="p-2">
            <p className="font-bold mb-1">גיל: {ageAtYear}</p>
            <p className="text-sm text-blue-600">
              סך השקעה: ₪{payload[0].value.toLocaleString()}
            </p>
            <p className="text-sm text-yellow-600">
              רווחים: ₪{payload[1].value.toLocaleString()}
            </p>
            <p className="text-sm text-green-600">
              סכום כולל: ₪{payload[2].value.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="border-green-500">
      <CardHeader className="bg-green-50">
        <CardTitle className="text-xl text-green-700">
          תוצאות מפורטות עבור {name}
        </CardTitle>
        <CardDescription>
          להלן תחזית ההשקעה המפורטת שלך בהתבסס על הנתונים שהזנת
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">פרטי המשקיע</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">שם:</div>
              <div>{name}</div>
              {email && (
                <>
                  <div className="font-medium">אימייל:</div>
                  <div>{email}</div>
                </>
              )}
              <div className="font-medium">תאריך לידה:</div>
              <div>{formattedDateOfBirth}</div>
              <div className="font-medium">גיל:</div>
              <div>{age}</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">פרטי ההשקעה</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">השקעה ראשונית:</div>
              <div>₪{Number(initialInvest).toLocaleString()}</div>
              <div className="font-medium">הפקדה חודשית:</div>
              <div>₪{Number(monthlyInvest).toLocaleString()}</div>
              <div className="font-medium">תשואה שנתית:</div>
              <div>{interestRate}%</div>
              <div className="font-medium">דמי ניהול שנתיים:</div>
              <div>{annualFee}%</div>
              <div className="font-medium">תקופת השקעה:</div>
              <div>{years} שנים</div>
            </div>
          </div>
        </div>

        <div className="h-[400px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={investArray}
              margin={{ top: 20, right: 10, left: 10, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="years"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  // Convert investment year to age
                  const currentAge = Number(age);
                  const futureAge = currentAge + value;
                  return futureAge;
                }}
                label={{
                  value: "גיל",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                tick={{
                  fontSize: 12,
                  dx: -28,
                }}
                tickFormatter={(value) =>
                  `₪${value.toLocaleString(undefined, {
                    notation: "compact",
                    compactDisplay: "short",
                  })}`
                }
                label={{
                  value: "שווי השקעה (₪)",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                }}
              />

              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                formatter={(value) => (
                  <span style={{ paddingRight: 4 }}>{value}</span>
                )}
                height={36}
                wrapperStyle={{ fontSize: 14 }}
              />
              <Bar
                dataKey="invested"
                name="סך השקעה"
                stackId="a"
                fill="#3b82f6"
              />
              <Bar
                dataKey="TotalInterest"
                name="רווחים"
                stackId="a"
                fill="#eab308"
              />
              <Bar dataKey="total" name="סכום כולל" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700">סך השקעה</h3>
            <p className="text-2xl font-bold">
              ₪{totalInvested.toLocaleString()}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-700">סך רווחים</h3>
            <p className="text-2xl font-bold">
              ₪{totalInterest.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700">סך הכל</h3>
            <p className="text-2xl font-bold">
              ₪{totalAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">תחזית הכנסה חודשית</h3>
            <p className="text-sm text-gray-600 mb-2">
              בהנחה של משיכה שנתית של 4% מסך ההשקעה (כלל אצבע מקובל):
            </p>
            <p className="text-2xl font-bold text-green-600">
              ₪
              {monthlyIncome.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="text-sm text-gray-500 mt-1">הכנסה חודשית משוערת</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">השפעת דמי הניהול</h3>
            <p className="text-sm text-gray-600 mb-2">
              דמי ניהול של {annualFee}% לאורך {years} שנים:
            </p>
            <p className="text-2xl font-bold text-red-600">
              ₪
              {(totalAmount * (annualFee / 100) * Number(years)).toLocaleString(
                undefined,
                {
                  maximumFractionDigits: 0,
                }
              )}
            </p>
            <p className="text-sm text-gray-500 mt-1">סך דמי ניהול משוערים</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={handlePrint} className="mx-auto">
            <Printer className="mr-2 h-4 w-4" />
            הדפס תוצאות
          </Button>
        </div>
        <div className="mt-6">
          <Disclaimer />
        </div>
      </CardContent>
    </Card>
  );
}
