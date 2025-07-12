// eslint-disable-next-line @typescript-eslint/no-require-imports
const puppeteer = require("puppeteer");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const paperIds = [
  "5138763",
  "5137740",
  "5136544",
  "5137732",
  "5138094",
  "5138698",
  "5137815",
  "5139324",
  "5137690",
  "5136874",
  "5137641",
  "5136866",
  "5138706",
  "5121140",
  "5127881",
  "5120852",
  "5129408",
  "5117700",
  "5134309",
  "5127790",
  "5105820",
  "5119409",
  "5119813",
  "5102991",
  "5103510",
  "5135926",
  "5123898",
  "5137559",
  "5139522",
  "5139258",
];

(async () => {
  // Enhanced browser launch options for CI environments
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // This can help with memory issues
      "--disable-gpu",
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
    ],
    // Use system Chrome if available (better for CI)
    executablePath: process.env.CI ? "/usr/bin/chromium-browser" : undefined,
  });

  const page = await browser.newPage();

  // Set a user agent to avoid being blocked
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  const results = [];

  for (const paperId of paperIds) {
    try {
      console.log(`🔄 Fetching ${paperId}...`);

      // === GENERAL VIEW PAGE ===
      await page.goto(
        `https://www.bizportal.co.il/mutualfunds/quote/generalview/${paperId}`,
        {
          waitUntil: "networkidle2",
          timeout: 30000, // 30 second timeout
        }
      );

      // Wait for content to load
      try {
        await page.waitForSelector(".paper_h1", { timeout: 10000 });
      } catch (e) {
        console.log(
          `⚠️  Warning: .paper_h1 not found for ${paperId}, continuing anyway ${e.message}`
        );
      }

      const generalData = await page.evaluate(() => {
        const paperName = document.querySelector(".paper_h1")?.innerText || "";
        const text =
          document.querySelector(".paper_data_wrap")?.innerText || "";

        const getValue = (label, pattern) => {
          const match = text.match(pattern);
          return match ? match[1].trim() : null;
        };

        return {
          assets: getValue("היקף נכסים", /היקף נכסים \(מ' ₪\)([\d,\.]+)/),
          managementFee: getValue("דמי ניהול", /דמי ניהול([\d\.]+%)/),
          creationDate: getValue(
            "תאריך הקמה",
            /תאריך הקמה(\d{2}\/\d{2}\/\d{4})/
          ),
          fundManager: getValue("מנהל הקרן", /מנהל הקרן(.*?)נאמן הקרן/),
          paperName: paperName,
        };
      });

      // === PERFORMANCE PAGE ===
      await page.goto(
        `https://www.bizportal.co.il/mutualfunds/quote/performance/${paperId}`,
        {
          waitUntil: "networkidle2",
          timeout: 30000,
        }
      );

      // Wait for content to load
      try {
        await page.waitForSelector(".tbl_performance_wrap", { timeout: 20000 });
      } catch (e) {
        console.log(
          `⚠️  Warning: .tbl_performance_wrap not found for ${paperId}, continuing anyway ${e.message}`
        );
      }

      const performanceData = await page.evaluate(() => {
        const text =
          document.querySelector(".tbl_performance_wrap")?.innerText || "";

        const extractValue = (label) => {
          const regex = new RegExp(`${label}\\s+([\\d\\.\\-]+%)`);
          const match = text.match(regex);
          return match ? match[1].trim() : null;
        };

        return {
          yearReturn: extractValue("השנה"),
          twelveMonthReturn: extractValue("12 חודשים"),
          return2024: extractValue("תשואה 2024"),
        };
      });

      results.push({
        paperId,
        ...generalData,
        ...performanceData,
      });

      console.log(`✅ Fetched ${paperId}`);
    } catch (error) {
      console.error(`❌ Error fetching ${paperId}:`, error.message);
      // Continue with other papers even if one fails
    }
  }

  await browser.close();

  // Use process.cwd() to resolve path relative to project root
  const outputPath = path.join(process.cwd(), "public", "fundsData.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  console.log(`Writing data to: ${outputPath}`);
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");

  console.log(`\n✅ Data saved to ${outputPath}`);
  console.log(
    `📊 Successfully fetched ${results.length} out of ${paperIds.length} funds`
  );
})().catch((error) => {
  console.error("💥 Script failed:", error);
  process.exit(1);
});
