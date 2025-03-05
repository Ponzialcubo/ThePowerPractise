import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CryptoItem from './components/CryptoItem';

type Crypto = {
  asset_id: string;
  name: string;
  type_is_crypto: number;
  data_quote_start: string;
  data_quote_end: string;
  data_orderbook_start: string;
  data_orderbook_end: string;
  data_trade_start: string;
  data_trade_end: string;
  data_symbols_count: number;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  volume_1mth_usd: number;
  id_icon: string;
  chain_addresses: {
    chain_id: string;
    network_id: string;
    address: string;
  }[];
  data_start: string;
  data_end: string;
};

type Icon = {
  asset_id: string;
  exchange_id: string;
  url: string;
};

const axiosBaseConfig = {
  headers: {
    Accept: 'text/plain',
    'X-CoinAPI-Key': import.meta.env.VITE_COIN_API_KEY,
  },
};

const axiosCryptoConfig = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `${import.meta.env.VITE_BASE_URL}/v1/assets?filter_asset_id=BTC;ETH;EUR`,
  ...axiosBaseConfig,
};

const axiosIconsConfig = {
  url: `${import.meta.env.VITE_BASE_URL}/v1/assets/icons/32`,
  ...axiosBaseConfig,
};

function App() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [icons, setIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState(false);

  const assetsWithIcons = cryptos.map((crypto) => {
    return {
      ...crypto,
      icon: icons.find((icon) => icon.asset_id === crypto.asset_id)?.url,
    };
  });

  useEffect(() => {
    setLoading(true);
    axios
      .request(axiosCryptoConfig)
      .then((response) => {
        setCryptos(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));

    axios
      .request(axiosIconsConfig)
      .then((response) => {
        setIcons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Lista de Criptomonedas</h1>
      <ul>
        {loading ? (
          <p className="loading">Cargando datos...</p>
        ) : (
          assetsWithIcons.map((crypto) => <CryptoItem crypto={crypto} />)
        )}
      </ul>
    </div>
  );
}

export default App;
