import React from 'react';
import PriceChart from '../components/PriceChart';
import PoolDataTable from '../components/PoolDataTable';

const Page = () => {
  const logMessage = (message: string) => {
    console.log(message);
  };

  return (
    <div>
      <PriceChart logMessage={logMessage} />
      <PoolDataTable logMessage={logMessage} />
    </div>
  );
};

export default Page;
