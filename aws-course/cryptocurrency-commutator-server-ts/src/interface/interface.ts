export interface Obj {
  [key: string]: string;
}

export interface AllPriceCoin {
  name: string;
  symbol: string;
  coinMarketCap: number;
  coinBase: number;
  coinStats: number;
  kucoin: number;
  coinPaprika: number;
  priceAverage: number;
}

export interface DetailsCoin {
  shopName: string;
  listNumber: number;
  name: string;
  symbol: string;
  price: number;
}
