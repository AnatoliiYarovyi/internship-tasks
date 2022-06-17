import { Repository } from 'typeorm';

interface Data {
  cryptocurrensySymbol: string;
  priceAverage: string;
}

const queryAllCoin = async (userRepository: Repository<any>) => {
  try {
    const data: Data[] = await userRepository.find({
      select: {
        cryptocurrensySymbol: true,
        priceAverage: true,
      },
      order: {
        id: 'DESC',
      },
      take: 20,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default queryAllCoin;
