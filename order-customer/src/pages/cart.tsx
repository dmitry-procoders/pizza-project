import { CartItem } from '@/interfaces/CartItem';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CartComponent: React.FC = () => {
  const cartItems: CartItem[] = useSelector((state: any) => state.cartItems);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const orderData = {
      name,
      phone,
      address,
      cartItems,
    };
    console.log(orderData);
    // Handle form submission logic here
  };

  return (
    <div>
      <h1>Order Items</h1>
      <ul>
        {cartItems.map((item: CartItem, index: number) => (
          <li key={index}>
            <span>{item.pizzaSize.value}</span>
            <span>{item.pizzaType.value}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />

        <button type="submit" disabled={!name || !phone || !address}>Submit</button>
      </form>
      {cartItems.length === 0 && <p>No items in the cart</p>}
    </div>
  );
};

export default CartComponent;
