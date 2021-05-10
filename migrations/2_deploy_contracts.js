const fs = require("fs");
const Count = artifacts.require("./Count.sol");

module.exports = function (deployer) {
  deployer.deploy(Count).then(() => {
    if (Count._json) {
      try {
        fs.writeFileSync(
          "deployABI",
          JSON.stringify(Count._json.abi),
          "utf-8"
        );
        console.log("success deployABI");
      } catch (err) {
        throw err;
      }
    }

    try {
      fs.writeFileSync("deployAddress", Count.address);
      console.log("success deployAddress");
    } catch (err) {
      throw err;
    }
  });
};
