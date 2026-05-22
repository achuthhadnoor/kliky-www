import { NextResponse } from "next/server";
import { polar, organizationId } from "../polar";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, label, conditions } = body;

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

    // Call Polar API to activate the license key for a specific device/instance
    const activationResponse = await polar.customerPortal.licenseKeys.activate({
      key,
      organizationId,
      label: label || "Default Device",
      conditions: conditions,
    });

    return NextResponse.json(activationResponse);
  } catch (error: any) {
    console.error("Error activating license key:", error);
    
    if (error.status) {
      return NextResponse.json(
        { error: "Failed to activate license key", details: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
