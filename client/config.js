const fs = require("fs");

fs.writeFileSync(
  ".env",
  `DEPLOYED_ADDRESS=${JSON.stringify(
    fs.readFileSync("../deployAddress", "utf8").replace(/\n|\r/g, "")
  )}\nDEPLOYED_ABI=${
    fs.existsSync("../deployABI") && fs.readFileSync("../deployABI", "utf8")
  }`,
  "utf-8"
);
