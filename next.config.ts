import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // ✅ Don’t fail production build on ESLint issues
        ignoreDuringBuilds: true,
    },
    typescript: {
        // ✅ Don’t fail production build on TS errors
        ignoreBuildErrors: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};

export default nextConfig;
