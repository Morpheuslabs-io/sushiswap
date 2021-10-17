# Deployment

For fresh deployment (avoid using the already-deployed contracts by `hardhat`), 
before running the deployment, must delete the existing folder `sushiswap/sushiswap/deployments/mumbai` (supposed that deployment to `mumbai`)

Run this cmd to deploy
`yarn mumbai:deploy`

## Crying with renaming of `SushiSwap LP Token` to `AbcSwap LP Token`

contracts/SushiMakerKashi.sol
bytes32 private immutable pairCodeHash;
//0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303

src/constants/index.ts
export const INIT_CODE_HASH: string =
  "0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303";

  computePairAddress

---------

router: 0x4C1f349F795a6B0d36c3442659eb8C2749106291
addLiquidityETH

"0x102bEc4963A8855B85C92A6B6aCE534d757A9147", "1000000000000000000000", "1000000000000000000000" ,"100000000000000000" ,"0xA7fc2009cc8B36997Ef533deC396d6B4B00760E4", "0x716c219d"

------

newer -> got from pairCodeHash of Factory SC -> and then shoot it into UniswapV2Library::pairFor()
687c9a2599113c2625eb9dfb1c091322ffe84902ff94c6e6c2c6b9e4d41a2f96

new
cc4187116ba662ed450fdd599871845a8811bcd571ee8b5bc7bac8374def412f

old
6e72df5ce358b7a78c0499528afc9c8feeb9c49e0176f1fae8f682aafec2ff41

--------

Solution:

1. Fresh compile/build/deploy all contracts
2. Use `ethereum remix` to interact with SC `UniswapV2Factory` for reading the value of `pairCodeHash`
3. Shoot the value of `pairCodeHash` into SC `UniswapV2Library::pairFor()`
4. Fresh compile/build/deploy all contracts again