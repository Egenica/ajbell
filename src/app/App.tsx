'use client';
import { useState } from 'react';

import FundDetails from './components/FundDetails/FundDetails';
import FundSelector from './components/FundSelector/FundSelector';

export default function Home() {
  const [selectedFund, setSelectedFund] = useState<string | null>(null);

  const handleFundSelection = (fund: string) => {
    setSelectedFund(fund);
  };

  return (
    <div className="container mx-auto p-2 md:p-6">
      <h1 className="mb-8 text-4xl font-thin text-white">
        <span className="font-bold">AJ Bell</span> Investment Strategy Selector
      </h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <FundSelector onSelectFund={handleFundSelection} />
        </div>

        <div className="lg:col-span-2">
          {selectedFund && <FundDetails selectedFund={selectedFund} />}
        </div>
      </div>
    </div>
  );
}
