import ContactForm from "./contact-form";
import { Check } from "lucide-react";
import { CloudImage } from "./CloudImage";
export default function InvestmentOffer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-violet-900 text-right"
                dir="rtl"
              >
                הצעה בשבילך:
              </h1>
              <p
                className="text-lg md:text-xl text-gray-700 mb-8 text-right leading-relaxed"
                dir="rtl"
              >
                פותחים חשבון להשקעות ומסחר בחבר הבורסה של מיטב בית השקעות,
                ונהנים מעמלות אטרקטיביות במיוחד.
              </p>
              <div className="bg-violet-900 text-white rounded-xl p-6 mb-6 shadow-lg transform hover:scale-105 transition duration-300">
                <h2
                  className="text-2xl md:text-4xl font-bold mb-4 text-right"
                  dir="rtl"
                >
                  בדיקת החזר מס בחינם
                </h2>
                <div className="flex justify-end items-center" dir="rtl">
                  <p className="text-lg">
                    ו-10% הנחה בעמלת הגישה לפותחים חשבון מסחר עצמאי מתנת Finupp
                  </p>
                  <CloudImage
                    src="static/jci0i370u2wf1g7qp5en"
                    width={100}
                    height={30}
                    alt="FinApp Logo"
                    className="mx-2"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "וגם פטור מדמי טיפול למשך שנתיים!",
                  'וגם ריבית זכות שנתית בשווי 0.5% על יתרת מזומן שקלי בעו"ש!',
                  "וגם קורס מסחר במתנה!",
                  "וגם פטור מעמלת ק/מ על קרנות כספיות!",
                  "וגם עמלות אטרקטיביות במיוחד לכל החיים!",
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-blue-700 text-white rounded-full py-3 px-6 text-right flex items-center justify-between shadow-md hover:bg-blue-600 transition"
                    dir="rtl"
                  >
                    <span>{benefit}</span>
                    <Check className="w-5 h-5 ml-2 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 transform rotate-1 hover:rotate-0 transition duration-300">
                <CloudImage
                  src="static/svbbghgcvyrq2xgwsjbi"
                  width={500}
                  height={400}
                  alt="לוגו של מיטב טרייד"
                  className="rounded-lg"
                />

                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-violet-900">
                    מיטב טרייד - הצעה מיוחדת לזמן מוגבל
                  </h3>
                  <p className="text-gray-600 mt-2">
                    במיוחד ללקוחות השקעה נבונה
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Tables Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-violet-900">
            מוזמנים להשוות מחירים
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Israel Table */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="bg-violet-900 text-white p-4 text-center flex items-center justify-between">
                <CloudImage
                  src="static/iwi3epbfn6vgscoph4by"
                  width={36}
                  height={24}
                  alt="Israel Flag"
                  className="ml-2 rounded"
                />
                <h3 className="text-xl font-bold" dir="rtl">
                  עמלות מסחר בארץ
                </h3>
              </div>
              <div className="p-1">
                <table className="w-full text-right" dir="rtl">
                  <tbody>
                    {[
                      { name: 'קניה/מכירה מק"מ', value: "0.06%" },
                      { name: "ק/מ, קרנות סל מקומיות", value: "0.07%" },
                      { name: 'ק/מ/מכירת אג"ח', value: "0.08%" },
                      { name: "ק/מ מניות", value: "0.08%" },
                      {
                        name: "ק/מ קרנות נאמנות מקומיות",
                        value: "פטור",
                        highlight: true,
                      },
                      { name: 'ק/מ אופציות מעו"ף', value: "₪ 2.2" },
                      { name: "עמלת מינימום", value: "₪ 4.65" },
                    ].map((item, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          item.highlight ? "bg-green-50" : ""
                        }`}
                      >
                        <td className="p-3 font-medium">{item.name}</td>
                        <td
                          className={`p-3 ${
                            item.highlight ? "font-bold text-green-600" : ""
                          }`}
                        >
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* US Table */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="bg-violet-900 text-white p-4 text-center flex items-center justify-between">
                <CloudImage
                  src="static/rw00yg8xdiijxehunyoy"
                  width={36}
                  height={24}
                  alt="US Flag"
                  className="ml-2 rounded"
                />
                <h3 className="text-xl font-bold" dir="rtl">
                  עמלות מסחר באמריקה
                </h3>
                <span className="text-xs">(בחירה בין שני מסלולים)</span>
              </div>
              <div className="p-1">
                <table className="w-full text-right" dir="rtl">
                  <tbody>
                    {[
                      {
                        name: "קניה/מכירה מניות (במערכת M-TRADE)",
                        value: "1 סנט למניה מינימום $7.5 לעסקה",
                      },
                      {
                        name: "קניה/מכירה מניות (במערכת IB)",
                        value: "1 סנט למניה מינימום $5 לעסקה",
                      },
                      {
                        name: "אופציות",
                        value: "$4 לאופציה מינימום $12 לעסקה",
                      },
                      { name: "עמלת חליפין", value: "פטור", highlight: true },
                    ].map((item, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          item.highlight ? "bg-green-50" : ""
                        }`}
                      >
                        <td className="p-3 font-medium">{item.name}</td>
                        <td
                          className={`p-3 ${
                            item.highlight ? "font-bold text-green-600" : ""
                          }`}
                        >
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* International Trading */}
          <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <div className="bg-violet-900 text-white p-4 text-center flex items-center justify-between">
                <CloudImage
                  src="static/cb9trrt2yiedixy8qqu2"
                  width={36}
                  height={24}
                  alt="International Flag"
                  className="ml-2 rounded"
                />
                <h3 className="text-xl font-bold" dir="rtl">
                  מסחר בבורסות זרות בחו&quot;ל (למעט ארה&quot;ב)
                </h3>
              </div>
              <div className="p-1">
                <table className="w-full text-right" dir="rtl">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">קניה/מכירה מניות</td>
                      <td className="p-3">
                        0.25% משווי עסקה מינימום 25 במטבע העסקה
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Services Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-violet-900">
          מידע נוסף
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <div className="bg-violet-900 text-white p-4 text-center">
              <h3 className="text-xl font-bold" dir="rtl">
                פעולות כלליות לחשבון
              </h3>
            </div>
            <div className="p-1">
              <table className="w-full text-right" dir="rtl">
                <tbody>
                  {[
                    { name: "דמי משמורת", value: "פטור", highlight: true },
                    { name: "עמלת אי ביצוע", value: "פטור", highlight: true },
                    {
                      name: "עמלת ביטול/שינוי לימיט",
                      value: "פטור",
                      highlight: true,
                    },
                    { name: "עמלת הרצה", value: "פטור", highlight: true },
                    { name: "עמלת דיבידנד", value: "פטור", highlight: true },
                    { name: "דמי טיפול חודשיים", value: "₪ 15 (פטור לשנתיים)" },
                    {
                      name: "עמלת משיכת שקלים לחשבון הבנק",
                      value: "פטור",
                      highlight: true,
                    },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        item.highlight ? "bg-green-50" : ""
                      }`}
                    >
                      <td className="p-3 font-medium">{item.name}</td>
                      <td
                        className={`p-3 ${
                          item.highlight ? "font-bold text-green-600" : ""
                        }`}
                      >
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <ContactForm />
      </section>
    </div>
  );
}
