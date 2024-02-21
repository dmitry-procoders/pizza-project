import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchTypesData } from '@/plugins/api-client';
import { PizzaType } from '@/interfaces/PizzaType';
import '@/layouts/global.css';

interface PizzaTypeOption {
  id: number;
  value: string;
}

interface PizzaTypeSelectProps {
  onSelect: (selectedType: PizzaType) => void;
}

const PizzaSizeSelect: React.FC<PizzaTypeSelectProps> = ({ onSelect }) => {
  const { isLoading, isError, data } = useQuery('pizza-types', fetchTypesData);
  const [selectedType, setSelectedType] = useState<number>();

  const handleTypeChange = (newType: number) => {
    setSelectedType(newType);
    const selectedType = data.find((type: PizzaType) => type.id === newType);
    onSelect(selectedType);
  };

  if (isError) {
    return <span>Error: </span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col space-y-2">
      <label>Select Pizza Type:</label>
      <div className="flex space-x-2">
        {data.map((option: PizzaTypeOption) => (
          <span
            key={option.id}
            className={`cursor-pointer py-2 px-4 rounded text-sm font-semibold tracking-wider h-10 ${selectedType === option.id ? 'highlight bg-white border border-black' : 'bg-black text-white'}`}
            onClick={() => handleTypeChange(option.id)}
          >
            {option.value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PizzaSizeSelect;