import { ChevronDown } from "lucide-react";

type Faq = {
  question: string; // The FAQ question
  answer: string; // The FAQ answer
};

interface FaqListProps {
  listFaq?: Faq[]; // Optional prop for listArray
  title?: string; // Optional title for the FAQ section
}

export function FaqList({ listFaq = [], title }: FaqListProps) {
  return (
    <section className="my-8">
      {title && (
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      )}
      <div
        className="space-y-4 w-full"
        aria-label={title || "Frequently Asked Questions"}
      >
        {listFaq.map((item, index) => (
          <details
            key={`faq-${index}`}
            className="group border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <summary className="flex cursor-pointer items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors">
              <h3 className="text-lg font-medium text-gray-900">
                {item.question}
              </h3>
              <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-open:rotate-180" />
            </summary>

            <div className="p-4 pt-2 text-gray-700 bg-gray-50">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
