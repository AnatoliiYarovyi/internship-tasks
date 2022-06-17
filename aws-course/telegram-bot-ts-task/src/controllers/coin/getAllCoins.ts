import axios, { AxiosResponse } from 'axios';
const { SERVER_URL } = process.env;

interface DataAllCoins {
  cryptocurrensySymbol: string;
  priceAverage: string;
}

const getAllCoins = async () => {
  try {
    const resData = await axios.get(SERVER_URL).then((res: AxiosResponse) => {
      const data: DataAllCoins[] = res.data.data;
      return data;
    });

    return resData;
  } catch (error) {
    console.log(error);
  }
};

export default getAllCoins;
