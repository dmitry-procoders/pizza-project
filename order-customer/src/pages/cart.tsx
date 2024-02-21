import { CartItem } from '@/interfaces/CartItem';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { placeOrder } from '@/plugins/api-client';
import { clearCart } from '@/store/actions';
import { Order } from '@/interfaces/Order';
import OrderItemsList from '@/components/OrderItemsList';
import CustomerForm from '@/components/CustomerForm';

const CartComponent: React.FC = () => {

  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector((state: any) => state.cartItems);
  const [orderConfirm, setOrderConfirm] = useState<Order>();

  const mutation = useMutation(placeOrder, {
    onSuccess: (orderData: Order) => {
      setOrderConfirm(orderData);
      dispatch(clearCart());
    },
    onError: (error) => {
      console.log('Order submit failed', error);
    },
  });

  const handleFormSubmit = (name: string, phone: string, address: string) => {
    const orderData = {
      name,
      phone,
      address,
      items: cartItems,
    };
    mutation.mutate(orderData);

  };

  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      {orderConfirm && (
        <>
          <div className="p-4">
            <h1 className="pb-4">Order Items</h1>
            <p>Your order crated: {orderConfirm.id}. Our managers will contact you as soon order will be processed.</p>
            <div className="mt-4">
              <p className="text-left"><b>Name:</b> {orderConfirm.name}</p>
              <p className="text-left"><b>Phone:</b> {orderConfirm.phone}</p>
              <p className="text-left"><b>Address:</b> {orderConfirm.address}</p>
            </div>
            <OrderItemsList items={orderConfirm.items} />
          </div>
      </>)}
      {!orderConfirm && (
        <div>
          <h1>Order Cart</h1>
          <OrderItemsList items={cartItems} />
          {cartItems.length > 0 && (
            <CustomerForm onFormSubmit={handleFormSubmit} />
          )}
        </div>
      )}
    </div>
  );
};

export default CartComponent;
