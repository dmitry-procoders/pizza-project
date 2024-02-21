import { CartItem } from '@/interfaces/CartItem';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { placeOrder } from '@/plugins/api-client';
import { clearCart } from '@/store/actions';
import { Order } from '@/interfaces/Order';

const CartComponent: React.FC = () => {

  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector((state: any) => state.cartItems);

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [orderConfirm, setOrderConfirm] = useState<Order>();

  const mutation = useMutation(placeOrder, {
    onSuccess: (orderData: Order) => {
      setOrderConfirm(orderData);
      // Clear form
      setName('');
      setPhone('');
      setAddress('');
      // Clear cart
      dispatch(clearCart());
    },
    onError: (error) => {
      console.log('Order submit failed', error);
    },
  });

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const orderData = {
      name,
      phone,
      address,
      items: cartItems,
    };
    mutation.mutate(orderData);
    
    // Handle form submission logic here
  };

  return (
    <div>
      { orderConfirm && (
        <div>
          <h1>Order Items</h1>
          <p>Your order saved: {orderConfirm.id}</p>
          <div>
            <p>Name: {orderConfirm.name}</p>
            <p>Phone: {orderConfirm.phone}</p>
            <p>Address: {orderConfirm.address}</p>
          </div>
          <ul>
            {orderConfirm.items.map((item: CartItem, index: number) => (
              <li key={index}>
                <span>Size: {item.pizzaSize.value}</span>&nbsp;
                <span>Type: {item.pizzaType.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ) }
      {!orderConfirm && (
        <div>
          <h1>Order Cart</h1>
          <ul>
            {cartItems.map((item: CartItem, index: number) => (
              <li key={index}>
                <span>Size: {item.pizzaSize.value}</span>&nbsp;
                <span>Type: {item.pizzaType.value}</span>
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
      )}
    </div>
  );
};

export default CartComponent;
