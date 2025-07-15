// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // ✅ Force Webpack explicitly
    turbo: {
        enabled: false,
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default nextConfig;
