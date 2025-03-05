import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

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

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `${import.meta.env.VITE_BASE_URL}/v1/assets?filter_asset_id=BTC;ETH`,
  headers: { 
    'Accept': 'text/plain', 
    'X-CoinAPI-Key': import.meta.env.VITE_COIN_API_KEY
  }
};

function App() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  
  useEffect(() => {
    axios.request(config)
    .then((response) => {
      setCryptos(response.data)
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
  }, []);

  return (
    <div className="App">
      <h1>Lista de Criptomonedas</h1>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.asset_id}>
            {crypto.name} ({crypto.asset_id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
