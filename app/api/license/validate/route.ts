import { NextResponse } from "next/server";
import { polar, organizationId } from "../polar";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key } = body;

    if (!key) {
      return NextResponse.json(
        { error: "License key is required" },
        { status: 400 }
      );
    }

    if (!organizationId) {
       return NextResponse.json(
        { error: "Server configuration error: Missing Organization ID" },
        { status: 500 }
      );
    }

    // Call Polar API to validate the license key
    const validationResponse = await polar.customerPortal.licenseKeys.validate({
      body: {
        key,
        organizationId,
      },
    });

    return NextResponse.json(validationResponse);
  } catch (error: any) {
    console.error("Error validating license key:", error);
    
    // Check if it's an API error from Polar SDK
    if (error.status) {
      return NextResponse.json(
        { error: "Failed to validate license key", details: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
