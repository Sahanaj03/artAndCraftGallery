/* eslint-disable react/forbid-prop-types */
import {OrderItem} from 'components/order';
import PropType from 'prop-types';
import React from 'react';

const OrdersTable = ({filteredOrders}) => (
  <div>
    <br />
    {filteredOrders.length === 0
      ? new Array(10).fill({}).map((order, index) => (
          <OrderItem
            // eslint-disable-next-line react/no-array-index-key
            key={`product-skeleton ${index}`}
            order={order}
          />
        ))
      : filteredOrders.map(order => <OrderItem key={order.id} order={order} />)}
  </div>
);

OrdersTable.propTypes = {
  filteredOrders: PropType.array.isRequired,
};

export default OrdersTable;
