import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchSizesData } from '@/plugins/api-client';
import { PizzaSize } from '@/interfaces/PizzaSize';

interface PizzaSizeOption {
  id: number;
  value: string;
}

interface PizzaSizeSelectProps {
  onSelect: (selectedSize: PizzaSize) => void;
}

const PizzaSizeSelect: React.FC<PizzaSizeSelectProps> = ({ onSelect }) => {
  const { isLoading, isError, data } = useQuery('pizza-sizes', fetchSizesData);
  const [selectedSize, setSelectedSize] = useState<number>();

  const handleSizeChange = (newSize: number) => {
    setSelectedSize(newSize);
    const selectedSize = data.find((size: PizzaSize) => size.id === newSize);
    onSelect(selectedSize);
  };

  if (isError) {
    return <span>Error: </span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col space-y-2">
      <label>Select Pizza Size:</label>
      <div className="flex space-x-2">
        {data.map((option: PizzaSizeOption) => (
          <span
            key={option.id}
            className={`cursor-pointer py-2 px-4 rounded text-sm font-semibold tracking-wider h-10 ${selectedSize === option.id ? 'highlight bg-white border border-black' : 'bg-black text-white'}`}
            onClick={() => handleSizeChange(option.id)}
          >
            {option.value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PizzaSizeSelect;