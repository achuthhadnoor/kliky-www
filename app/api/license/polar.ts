import { Polar } from "@polar-sh/sdk";

// Initialize the Polar SDK
// The SDK will automatically use the POLAR_ACCESS_TOKEN environment variable
// if it is present.
export const polar = new Polar({
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
  accessToken: process.env.POLAR_ACCESS_TOKEN,
});

export const organizationId = process.env.POLAR_ORGANIZATION_ID;
