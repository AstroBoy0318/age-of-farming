import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    pastaId: 0,
    tokenName: 'AOE',
    earnToken: 'AOE',
    stakingTokenName: QuoteToken.AOE,
    stakingTokenAddress: '0xb083Bb3EC96fABd018F7FfB3122Ab3c1501a68a6',
    contractAddress: {
      97: '',
      56: '0x9EB0692bAaA7B70C324413c5A826a84E356907Cc',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'http://safetrip.app/',
    harvest: true,
    tokenPerBlock: '0.005',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },  
]

export default pools
