"use client";

import { useState } from 'react';
import PriceChart from '../components/PriceChart';
import PoolDataTable from '../components/PoolDataTable';

const App = () => {
  const [source, setSource] = useState<string>('uniswap');

  return (
    <div>
      <h1>Arbitrage Analysis</h1>
      <select onChange={(e) => setSource(e.target.value)} value={source}>
        <option value="uniswap">Uniswap</option>
        <option value="quickswap">QuickSwap</option>
      </select>
      <div>
        <PriceChart source={source} />
      </div>
      <div>
        <PoolDataTable source={source} />
      </div>
    </div>
  );
};

export default App;
