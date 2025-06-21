"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SuccessMessageProps {
  onReset: () => void
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <Card className="mt-8 bg-green-50">
      <CardHeader>
        <CardTitle className="text-xl text-green-700">הבקשה נשלחה בהצלחה!</CardTitle>
        <CardDescription>הגרף האישי יישלח לכתובת האימייל שלך תוך מספר דקות.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          תודה שהשתמשת במחשבון הריבית דריבית שלנו. אנו מקווים שהמידע יסייע לך בתכנון הפיננסי שלך.
        </p>
        <Button className="mt-4" variant="outline" onClick={onReset}>
          חזור למחשבון
        </Button>
      </CardContent>
    </Card>
  )
}
