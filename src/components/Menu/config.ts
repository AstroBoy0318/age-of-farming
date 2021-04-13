import { MenuEntry } from '@pizzafinance/ui-sdk'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.pancakeswap.finance/#/swap?inputCurrency=0xb083Bb3EC96fABd018F7FfB3122Ab3c1501a68a6&outputCurrency=BNB',        
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.pancakeswap.finance/#/add/0xb083Bb3EC96fABd018F7FfB3122Ab3c1501a68a6/BNB',
      },
      // {
      //   label: 'DEX',
      //   href: 'https://dex.dragonswap.app/',
      // },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: '/lottery',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  // {
  //   label: 'Info',
  //   icon: 'InfoIcon',
  //   items: [
  //     {
  //       label: 'Overview',
  //       href: 'https://info.cheeseswap.app',
  //     },
  //     {
  //       label: 'Tokens',
  //       href: 'https://info.cheeseswap.app/token/0x2cc26dd730f548dc4ac291ae7d84a0c96980d2cb',
  //     },
  //     {
  //       label: 'Pairs',
  //       href: 'https://info.cheeseswap.app/pair/0x8405be915af56589756a275d4894fa9f0ff6ca0f',
  //     },
  //     {
  //       label: 'Accounts',
  //       href: 'https://info.cheeseswap.app/accounts',
  //     },
  //   ],
  // },
  {
    label: 'Info',
    icon: 'InfoIcon',
    // href: 'https://dragonswap.app/Dragonswap%20Whitepaper.pdf',
    href: '#',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/safetripdefi',
      },
      {
        label: 'Medium',
        href: 'https://safetripapp.medium.com',
      },
      {
        label: 'Token',
        href: 'https://bscscan.com/address/0xb083Bb3EC96fABd018F7FfB3122Ab3c1501a68a6#code',
      },
    ],
  },
]

export default config
