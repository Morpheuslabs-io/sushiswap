const { WNATIVE } = require("@sushiswap/sdk");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const chainId = await getChainId();

  let wethAddress;

  if (chainId === "31337") {
    wethAddress = (await deployments.get("WETH9Mock")).address;
  } else if (chainId === "80001") {
    wethAddress = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";
  } else if (chainId === "137") {
    wethAddress = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
  } else if (chainId in WNATIVE) {
    wethAddress = WNATIVE[chainId].address;
  } else {
    throw Error("No WNATIVE!");
  }

  const factoryAddress = (await deployments.get("UniswapV2Factory")).address;

  await deploy("UniswapV2Router02", {
    from: deployer,
    args: [factoryAddress, wethAddress],
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["UniswapV2Router02", "AMM"];
module.exports.dependencies = ["UniswapV2Factory", "Mocks"];
