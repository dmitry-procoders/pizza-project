import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchExtraComponentsData } from '@/plugins/api-client';
import { PizzaExtraComponent } from '@/interfaces/PizzaExtraComponent';

interface PizzaExtraOption {
  id: string;
  value: string;
}

interface PizzaExtraComponentSelectProps {
  onSelect: (selectedExtras: PizzaExtraComponent[]) => void;
}

const PizzaExtraComponentSelect: React.FC<PizzaExtraComponentSelectProps> = ({ onSelect }) => {
  const { isLoading, isError, data } = useQuery('pizza-extra-components', fetchExtraComponentsData);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const handleExtraChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newExtra = event.target.value;
    const updatedExtras = [...selectedExtras];
    if (updatedExtras.includes(newExtra)) {
      const index = updatedExtras.indexOf(newExtra);
      updatedExtras.splice(index, 1);
    } else {
      updatedExtras.push(newExtra);
    }
    setSelectedExtras(updatedExtras);
    const selectedComponents = data.filter((extra: PizzaExtraComponent) => updatedExtras.includes(extra.id.toString()));
    onSelect(selectedComponents);
  };


  if (isError) {
    return <span>Error: </span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }


  return (
    <div>
      {data.map((option: PizzaExtraOption) => (
        <div key={option.id}>
          <input
            type="checkbox"
            id={option.id}
            value={option.id}
            checked={selectedExtras.includes(option.id.toString())}
            onChange={handleExtraChange}
          />
          <label htmlFor={option.id}>{option.value}</label>
        </div>
      ))}

    </div>
  );
};

export default PizzaExtraComponentSelect;