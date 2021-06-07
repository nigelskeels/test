module.exports = {
  preset: 'jest-puppeteer-preset',
  globals: {
    URL: "http://localhost:3000"
  },
  testMatch: [
    "**/test/**/*.test.js"
  ],
  rootDir: 'src',
  verbose: true
};