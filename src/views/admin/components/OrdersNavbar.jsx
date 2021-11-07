import {FilterOutlined, PlusOutlined} from '@ant-design/icons';
import {FiltersToggle, SearchBar} from 'components/common';
import PropType from 'prop-types';
import React from 'react';
import {useHistory} from 'react-router-dom';

const OrdersNavbar = props => {
  const {ordersCount, totalOrdersCount} = props;
  const history = useHistory();

  return (
    <div className="product-admin-header">
      <h3 className="product-admin-header-title">
        Orders &nbsp; ({`${ordersCount} / ${totalOrdersCount}`})
      </h3>
      <SearchBar from="Order" />
      &nbsp;
      <FiltersToggle>
        <button className="button-muted button-small" type="button">
          <FilterOutlined />
          &nbsp;More Filters
        </button>
      </FiltersToggle>
    </div>
  );
};

OrdersNavbar.propTypes = {
  ordersCount: PropType.number.isRequired,
  totalOrdersCount: PropType.number.isRequired,
};

export default OrdersNavbar;
