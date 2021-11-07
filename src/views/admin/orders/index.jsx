/* eslint-disable react/jsx-props-no-spreading */
import {Boundary} from 'components/common';
import {AppliedFilters, OrderList} from 'components/order';
import {useDocumentTitle, useScrollTop} from 'hooks';
import React from 'react';
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {selectFilter} from 'selectors/selector';
import {OrdersNavbar} from '../components';
import OrdersTable from '../components/OrdersTable';

const Orders = () => {
  useDocumentTitle('Orders');
  useScrollTop();

  const store = useSelector(state => ({
    filteredOrders: selectFilter(state.orders.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    orders: state.orders,
  }));

  return (
    <Boundary>
      <OrdersNavbar
        ordersCount={store.orders.items.length}
        totalOrdersCount={store.orders.total}
      />

      <div className="product-admin-items">
        <OrderList {...store}>
          <AppliedFilters filter={store.filter} />
          <OrdersTable filteredOrders={store.filteredOrders} />
        </OrderList>
      </div>
    </Boundary>
  );
};

export default withRouter(Orders);
