import { NextResponse } from "next/server";
import { getSiteContentMap } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getSiteContentMap();
    const faviconUrl =
      content?.["site.favicon"] || "/assets/images/logo/favicon.svg";

    if (faviconUrl.startsWith("http://") || faviconUrl.startsWith("https://")) {
      return NextResponse.redirect(faviconUrl, { status: 307 });
    }

    const host = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const redirectUrl = new URL(faviconUrl, host);
    return NextResponse.redirect(redirectUrl, { status: 307 });
  } catch (error) {
    console.error("[favicon.ico route error]:", error);
    return NextResponse.redirect(
      new URL("/assets/images/logo/favicon.svg", "http://localhost:3000"),
      { status: 307 }
    );
  }
}
