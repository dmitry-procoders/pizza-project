import React from 'react';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { fetchOrdersPreparing, sendOrderForPrepare } from '@/plugins/api-client';
import { OrderItem } from '@/interfaces/OrderItem';
import { PizzaExtraComponent } from '@/interfaces/PizzaExtraComponent';

export default function OrdersForPickUp() {
  
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      refetchInterval: 60000,
    },
  });

  const { isLoading, data } = useQuery('preparing', fetchOrdersPreparing);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { 
      field: 'name', 
      headerName: 'Name',
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.order.name;
      },
      width: 200,
    },
    { 
      field: 'customerPhone', 
      headerName: 'Phone',
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.order.phone;
      },
      width: 120,
    },
    { 
      field: 'address', 
      headerName: 'Address',
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.order.address;
      },
      width: 300,
    },
    { 
      field: 'Order', 
      headerName: 'Order',
      renderCell: (params: GridCellParams) => {
        const items = params.row.order.items;
        return (
          <>
           {items.map((item: OrderItem, index: number) => (
            <div key={index}>
              <b>{item.pizzaSize.value} {item.pizzaType.value}</b>
              {item.pizzaExtraComponents.length > 0 && (
                <div>Extras: {item.pizzaExtraComponents.map((extra: PizzaExtraComponent) => extra.value).join(', ')}</div>
              )}
            </div>
           ))}
          </>
        );
      },
      width: 600,
    },
    { 
      field: 'createdAt', 
      headerName: 'Created At',
      valueGetter: (params: GridValueGetterParams) => {
        return new Date(params.row.order.createdAt).toLocaleString();
      },
      width: 200,
    },
  ];

  return (
    <main>
      <div>
        <h1>Orders preparing now</h1>
        <div style={{ height: '80vh', minHeight: 400, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
      </div>
      </div>
    </main>
  );
}
