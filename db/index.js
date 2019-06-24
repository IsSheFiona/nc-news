const ENV = process.env.NODE_ENV || "development";
const devData = require("./development-data/index");
const testData = require("./test-data/index");

if (ENV === process.env.NODE_ENV) module.exports = testData;
if (ENV === "development") module.exports = devData;
