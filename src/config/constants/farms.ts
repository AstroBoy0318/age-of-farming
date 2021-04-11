import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'TRIP',
    lpAddresses: {
      97: '',
      56: '0xb083Bb3EC96fABd018F7FfB3122Ab3c1501a68a6',
    },
    tokenSymbol: 'BUS',
    tokenAddresses: {
      97: '',
      56: '0x392406443CC8955688050E11FbaFe1F96278D1EA',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'TRIP-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x2f25fd8bb88b7a02301182c2f3d912f68e36ad60',
    },
    tokenSymbol: 'TRIP',
    tokenAddresses: {
      97: '',
      56: '0xb083Bb3EC96fABd018F7FfB3122Ab3c1501a68a6',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'TRIP-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x97f2705f6e50cff038ee7e68308acf7667b94fd1',
    },
    tokenSymbol: 'TRIP',
    tokenAddresses: {
      97: '',
      56: '0xb083Bb3EC96fABd018F7FfB3122Ab3c1501a68a6',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isCommunity: false,
  },   
  {
    pid: 3,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    isCommunity: false,
  },  
  {
    pid: 4,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xc15fa3E22c912A276550F3E5FE3b0Deb87B55aCd',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      97: '',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 5,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x7561EEe90e24F3b348E1087A005F78B4c8453524',
    },
    tokenSymbol: 'BTC',
    tokenAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 6,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
    
]

export default farms
