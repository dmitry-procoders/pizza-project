import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchSizesData } from '@/plugins/api-client';
import { PizzaSize } from '@/interfaces/PizzaSize';

interface PizzaSizeOption {
  id: string;
  value: string;
}

interface PizzaSizeSelectProps {
  onSelect: (selectedSize: PizzaSize) => void;
}

const PizzaSizeSelect: React.FC<PizzaSizeSelectProps> = ({ onSelect }) => {
  const { isLoading, isError, data } = useQuery('pizza-sizes', fetchSizesData);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
    const selectedSize = data.find((size: PizzaSize) => size.id.toString() === newSize);
    onSelect(selectedSize);
  };

  if (isError) {
    return <span>Error: </span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <select value={selectedSize} onChange={handleSizeChange}>
      <option value="">Select Size</option>
      {data.map((option: PizzaSizeOption) => (
        <option key={option.id} value={option.id}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default PizzaSizeSelect;