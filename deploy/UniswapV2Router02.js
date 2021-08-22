const { WNATIVE } = require("@sushiswap/sdk");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const chainId = await getChainId();

  let wethAddress;

  if (chainId === "31337") {
    wethAddress = (await deployments.get("WETH9Mock")).address;
  } else if (chainId === "80001") {
    wethAddress = "0x5B67676a984807a212b1c59eBFc9B3568a474F0a"; // this is the WMATIC (not the WETH)
  } else if (chainId === "137") {
    wethAddress = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"; // this is the WMATIC (not the WETH)
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
