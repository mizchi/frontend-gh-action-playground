module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/(__tests__|e2e)/.*|(\\.|/))\\.test\\.tsx?$",
  coveragePathIgnorePatterns: ["dist", "node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
