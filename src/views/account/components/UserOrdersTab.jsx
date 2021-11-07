import React from 'react';
import {useSelector} from 'react-redux';
import {useDocumentTitle, useScrollTop} from 'hooks';
import {AppliedFilters, OrderItem, OrderList} from 'components/order';
import {selectFilter} from 'selectors/selector';
// Just add this feature if you want :P

const UserOrdersTab = () => {
  useDocumentTitle('Orders');
  useScrollTop();

  const store = useSelector(state => ({
    filteredOrders: selectFilter(state.orders.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    orders: state.orders,
  }));

  return (
    <div style={{minHeight: '80vh'}}>
      <OrderList {...store}>
        <AppliedFilters filter={store.filter} />
        {store.orders.items.length === 0
          ? new Array(10).fill({}).map((order, index) => (
              <OrderItem
                // eslint-disable-next-line react/no-array-index-key
                key={`order-skeleton ${index}`}
                order={order}
              />
            ))
          : store.orders.items.map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
      </OrderList>
    </div>
  );
};

export default UserOrdersTab;
