import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
    // Next.js only allows quality values it's told about; 75 is the
    // built-in default, 90 is used for the Hero avatar photo.
    qualities: [75, 90],
  },
  experimental: {
    serverActions: {
      // Default is 1MB, too small for cropped avatar/cover image uploads.
      bodySizeLimit: "10mb",
    },
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
