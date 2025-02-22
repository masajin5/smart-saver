import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React の厳格モードを有効化
  swcMinify: true, // 高速ビルドのための SWC ミニファイを有効化
};

export default nextConfig;
