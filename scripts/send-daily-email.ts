import "dotenv/config";

import { fetchLtcPriceInr } from "../src/lib/price";
import { sendDailyReportEmail } from "../src/lib/email";

async function main() {
  const price = await fetchLtcPriceInr();
  await sendDailyReportEmail(price);
  const timestamp = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date());

  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      {
        status: "ok",
        priceInr: price,
        deliveredAt: timestamp,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
});
