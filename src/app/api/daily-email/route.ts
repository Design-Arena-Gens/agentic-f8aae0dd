import { NextResponse } from "next/server";
import { fetchLtcPriceInr } from "@/lib/price";
import { sendDailyReportEmail } from "@/lib/email";
import { markFailure, markSuccess } from "@/lib/status";

export const dynamic = "force-dynamic";

async function runDailyJob() {
  const startedAt = new Date();
  const price = await fetchLtcPriceInr();
  await sendDailyReportEmail(price);
  const completedAt = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  }).format(startedAt);

  markSuccess(completedAt);

  return {
    price,
    completedAt,
  };
}

export async function GET() {
  try {
    const result = await runDailyJob();
    return NextResponse.json(
      {
        status: "ok",
        ...result,
        source: "coingecko",
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown failure occurred";
    markFailure(message);
    return NextResponse.json(
      {
        status: "error",
        message,
      },
      { status: 500 }
    );
  }
}
