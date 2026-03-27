export default {
  source: [
    "src/tokens/base/**/*.json",
    "src/tokens/semantic/**/*.json",
  ],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/tokens/build/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    ts: {
      transformGroup: "js",
      buildPath: "src/tokens/build/",
      files: [
        {
          destination: "tokens.ts",
          format: "javascript/es6",
        },
      ],
    },
  },
};
