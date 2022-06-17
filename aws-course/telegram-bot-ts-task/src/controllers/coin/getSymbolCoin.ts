import getAllCoins from './getAllCoins';

interface SymbolCoin {
  cryptocurrensySymbol: string;
  priceAverage: string;
}

const getSymbolCoin = async (text: string) => {
  const allCoins: SymbolCoin[] = await getAllCoins();
  const arrCoin: string[] = allCoins.reduce((acc, { cryptocurrensySymbol }) => {
    acc.push(cryptocurrensySymbol);
    return acc;
  }, []);
  const findCoin: string[] = arrCoin.filter(el => `/${el}` === text);
  return findCoin[0];
};

export default getSymbolCoin;
