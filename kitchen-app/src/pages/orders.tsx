import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchOrdersReadyForPrepare } from '@/plugins/api-client';

export default function Pizza() {

  const { isLoading, isError, data } = useQuery('ready-for-preparing', fetchOrdersReadyForPrepare);

  console.log('data: ', data);

  return (
    <main>
      <div>
        <h1>Orders</h1>

      </div>
    </main>
  );
}
