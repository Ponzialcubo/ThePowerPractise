import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/cryptos'; // Dirección de tu servidor Node.js

interface Crypto {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
    };
  };
}

function App() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    fetch(API_URL) // No es necesario pasar la API key en el cliente
      .then((response) => response.json())
      .then((data) => setCryptos(data.data))
      .catch((error) => console.error('Error al obtener los datos:', error));
  }, []);

  return (
    <div className="App">
      <h1>Lista de Criptomonedas</h1>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>
            {crypto.name} ({crypto.symbol}): ${crypto.quote.USD.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
