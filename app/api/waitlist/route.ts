import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, platform, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    // Local development fallback if Webhook URL is not configured yet
    if (!webhookUrl) {
      console.warn("Google Sheet Webhook URL is missing! Simulating waitlist collection locally.");
      
      // Delay to simulate database latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      return NextResponse.json({
        success: true,
        message: "Demo/Development mode: Waitlist email logged locally to server console.",
        data: {
          email,
          platform: platform || "Unknown",
          source: source || "Direct",
          timestamp: new Date().toISOString()
        }
      });
    }

    // Call Google Apps Script Webhook directly using a lightweight POST request
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        timestamp: new Date().toISOString(),
        platform: platform || "Unknown",
        source: source || "Direct"
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Webhook returned status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Successfully added to waitlist sheet",
      data
    });
  } catch (error: any) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
