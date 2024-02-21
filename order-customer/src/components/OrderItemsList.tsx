import React from 'react';
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { OrderItem } from '@/interfaces/OrderItem';
import { CartItem } from '@/interfaces/CartItem';
import { PizzaExtraComponent } from '@/interfaces/PizzaExtraComponent';

interface OrderItemsListProps {
  items: CartItem[] | OrderItem[];
}

const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
    },
    { 
      field: 'pizzaSize', 
      headerName: 'Size',
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.pizzaSize.value;
      },
      width: 400,
    },
    { 
      field: 'pizzaType', 
      headerName: 'Type',
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.pizzaType.value;
      },
      width: 400,
    },
    { 
      field: 'components', 
      headerName: 'Components',
      renderCell: (params: GridCellParams) => {
        return params.row.pizzaExtraComponents.map(
          (extra: PizzaExtraComponent) => extra.value
        ).join(', ');
      },
      width: 600,
    },
  ];

  const data = items.map((item: CartItem | OrderItem, index: number) => {
    const row = { ...item } as OrderItem;
    if (!row.id) {
      row.id = index + 1;
    }

    return row;
  });

  return (
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
  );
};

export default OrderItemsList;