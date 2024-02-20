import React, { useState } from 'react';
import Link from 'next/link';
import PizzaSizeSelect from '@/components/PizzaSizeSelect';
import PizzaTypeSelect from '@/components/PizzaTypeSelect';
import PizzaExtraComponentSelect from '@/components/PizzaExtraComponentSelect';
import { useDispatch } from 'react-redux';
import { addOrderItem } from '@/store/actions';
import { PizzaSize } from '@/interfaces/PizzaSize';
import { PizzaType } from '@/interfaces/PizzaType';
import { PizzaExtraComponent } from '@/interfaces/PizzaExtraComponent';

export default function Pizza() {

  const dispatch = useDispatch();

  const [size, setSize] = useState<PizzaSize>();
  const [type, setType] = useState<PizzaType>();
  const [extraComponents, setExtraComponents] = useState<PizzaExtraComponent[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const addItemToOrder = () => {
    if (!size || !type) {
      throw new Error("Size and type are required to add a pizza to the order.");
      
    }
    console.log();
    dispatch(addOrderItem(
      size, 
      type, 
      extraComponents
    ));
    setShowModal(true);
  };

  return (
    <main>
      <div>
        <h1>Pizza page</h1>
        <PizzaSizeSelect onSelect={setSize}/>
        <PizzaTypeSelect onSelect={setType}/>
        <PizzaExtraComponentSelect onSelect={setExtraComponents}/>
      </div>
      {showModal && (
        <div>
          <h2>Add another pizza?</h2>
          <button onClick={() => setShowModal(false)}>No</button>
          <Link href="/cart">Yes</Link>
        </div>
      )}
      <div>
        <button 
          onClick={addItemToOrder} 
          disabled={!size || !type}>
            Order
        </button>
      </div>
    </main>
  );
}
