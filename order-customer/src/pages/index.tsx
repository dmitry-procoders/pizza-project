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
import { Modal } from '@mui/material';

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
    dispatch(addOrderItem(
      size, 
      type, 
      extraComponents
    ));
    setShowModal(true);
  };

  return (
    <main>
      <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Build your Pizza
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Select your pizza size, type, and extra components to create your perfect pizza.
            </p>
          </div>
          <PizzaTypeSelect onSelect={setType}/>
          <PizzaSizeSelect onSelect={setSize}/>
          <PizzaExtraComponentSelect onSelect={setExtraComponents}/>
          <button
            className="bg-black text-white py-2 px-4 rounded mr-2 w-200 block"
            onClick={addItemToOrder} 
            disabled={!size || !type}>
              Order your pizza
          </button>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-center mb-4">Add another pizza to order?</h2>
            <div className="flex justify-center">
              <button className="bg-black text-white py-2 px-4 rounded mr-2" onClick={() => setShowModal(false)}>Yes</button>
              <Link href="/cart">
                <button className="bg-black text-white py-2 px-4 rounded mr-2">No</button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
