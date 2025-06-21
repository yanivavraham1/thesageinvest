import { CalculatorForm } from "@/components/tools/calculator/calculator-form";
import { ResultsSection } from "@/components/tools/calculator/results-section";
import { PersonalDataForm } from "@/components/tools/calculator/personal-data-form";
import { CalculatorProvider } from "@/components/tools/calculator/calculator-context";
import { DisclaimerSection } from "@/components/tools/calculator/disclaimer-section";
import { HeroSection } from "@/components/static/hero-section";

export const metadata = {
  title: "מחשבון ריבית דריבית | חישוב תשואה על השקעה",
  description:
    "חשב את הריבית דריבית על ההשקעה שלך בקלות. הזן את סכום ההשקעה, הריבית, תקופת ההשקעה ותשלומים חודשיים כדי לקבל תוצאה מדויקת.",
};

export default function CompoundInterestCalculator() {
  return (
    <div>
      <HeroSection
        paragraph="מחשבון ריבית דריבית הוא כלי שימושי לחישוב התשואה על השקעה לאורך זמן. בעזרת מחשבון זה, תוכל לחשב את הסכום הסופי של ההשקעה שלך, בהתבסס על סכום ההשקעה הראשוני, שיעור הריבית, תקופת ההשקעה ותשלומים חודשיים נוספים."
        title="מחשבון ריבית דריבית"
        fromColor="from-white"
        toColor="to-red-200"
      />
      <div className="container mx-auto px-4 py-12">
        <CalculatorProvider>
          <div className="">
            <CalculatorForm />
            <ResultsSection />
          </div>
          <PersonalDataForm />
          <DisclaimerSection />
        </CalculatorProvider>
      </div>
    </div>
  );
}
