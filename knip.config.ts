import type { KnipConfig } from "knip";

const config: KnipConfig = {
  project: ["src/**/*.{ts,tsx}"],
  ignore: ["src/tokens/style-dictionary.config.ts"],
};

export default config;
