const ENV = process.env.NODE_ENV || "development";
const devData = require("./development-data/index");
const testData = require("./test-data/index");

if (ENV === "test") module.exports = testData;
if (ENV === "production") module.exports = devData;
if (ENV === "development") module.exports = devData;

// const data = { test: testData, development: devData, production: devData };
// module.exports = data[ENV]
