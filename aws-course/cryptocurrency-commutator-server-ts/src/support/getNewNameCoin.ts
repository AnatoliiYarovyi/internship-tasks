import axios, { AxiosResponse } from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';

interface ArrCryptos {
  id: number;
  name: string;
  symbol: string;
}
interface DataCoins {
  name: string;
  symbol: string;
}

const endPoints: string =
  'https://api.coinstats.app/public/v1/coins?limit=20&currency=USD';

async function getNewNameCoin() {
  try {
    const arrCryptos: ArrCryptos[] = await getArrCryptos(endPoints);
    const stringData: string = JSON.stringify(arrCryptos);

    const pathFile: string = path.join(__dirname, 'dbNameCoin.json');
    await fs.writeFile(pathFile, stringData);
    console.log(`Data save`);
  } catch (error) {
    console.log(error);
  }
}

const getArrCryptos = async (endPoints: string) => {
  const resData: ArrCryptos[] = await axios
    .get(endPoints)
    .then((resp: AxiosResponse) => {
      const dataCoins: DataCoins[] = resp.data.coins;
      return dataCoins.reduce((acc, el, i) => {
        acc.push({
          id: i + 1,
          name: el.name,
          symbol: el.symbol,
        });
        return acc;
      }, []);
    });
  return resData;
};

getNewNameCoin();
// export default getNewNameCoin;
