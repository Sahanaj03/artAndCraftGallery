import {useScrollTop} from 'hooks';
import PropType from 'prop-types';
import React from 'react';
import order from 'images/order.gif';
import {HomeOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {ACCOUNT} from 'constants/routes';

const Step4 = ({history}) => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <img alt="Logo" src={order} className="order-logo" />
      <h1>Your order has been placed.</h1>

      <h3>View your order details on the "My Orders" tab in Account screen.</h3>
      <br />
      <div className="checkout-shipping-action">
        <button
          className="button  button-icon button-muted order-button"
          onClick={() => history.push('/')}
          type="button">
          <HomeOutlined />
          &nbsp; Go Back Home
        </button>
        <button
          className="button button-icon order-button"
          onClick={() =>
            history.push({
              pathname: ACCOUNT,
              state: {
                activeTab: 2,
              },
            })
          }
          type="submit">
          View Order &nbsp;
          <ShoppingCartOutlined />
        </button>
      </div>
    </div>
  );
};

Step4.propTypes = {
  history: PropType.shape({
    goBack: PropType.func,
  }).isRequired,
};

export default Step4;
