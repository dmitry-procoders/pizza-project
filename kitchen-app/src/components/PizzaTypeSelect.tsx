import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchTypesData } from '@/plugins/api-client';
import { PizzaType } from '@/interfaces/PizzaType';

interface PizzaTypeOption {
  id: string;
  value: string;
}

interface PizzaTypeSelectProps {
  onSelect: (selectedType: PizzaType) => void;
}

const PizzaSizeSelect: React.FC<PizzaTypeSelectProps> = ({ onSelect }) => {
  const { isLoading, isError, data } = useQuery('pizza-types', fetchTypesData);
  const [selectedType, setSelectedType] = useState<string>('');

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    setSelectedType(newType);
    const selectedType = data.find((type: PizzaType) => type.id.toString() === newType);
    onSelect(selectedType);
  };

  if (isError) {
    return <span>Error: </span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <select value={selectedType} onChange={handleTypeChange}>
      <option value="">Select Type</option>
      {data.map((option: PizzaTypeOption) => (
        <option key={option.id} value={option.id}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default PizzaSizeSelect;