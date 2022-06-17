import { Repository } from 'typeorm';

interface DataCoin {
  cryptocurrensySymbol: string;
  priceAverage: string;
}
interface Data {
  symbol: string;
  price: number;
}

const queryCoin = async (
  userRepository: Repository<any>,
  symbolCoin: any,
  shopCoin: any = 'priceAverage',
  limit: number = 12,
) => {
  try {
    const dataCoin: DataCoin[] = await userRepository.find({
      select: {
        cryptocurrensySymbol: true,
        priceAverage: true,
      },
      where: {
        cryptocurrensySymbol: symbolCoin,
      },
      order: {
        id: 'DESC',
      },
      take: limit,
    });

    let sumPrice: number = null;
    let number: number = null;
    const data: Data[] = dataCoin.reduce((acc, el, i, arr) => {
      const { cryptocurrensySymbol, priceAverage } = el;

      if (priceAverage) {
        sumPrice += Number(priceAverage);
        ++number;
      }
      if (i === arr.length - 1) {
        acc.push({
          symbol: cryptocurrensySymbol,
          price: sumPrice / number,
        });
      }
      return acc;
    }, []);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default queryCoin;
