import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import {ImageLoader} from 'components/common';
import {displayMoney, displayDate} from 'helpers/utils';
import PropType from 'prop-types';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {removeFromBasket} from 'redux/actions/basketActions';
import {OrderBasketItem} from './';

const OrderItem = ({order}) => {
  const dispatch = useDispatch();
  const [showItems, setShowItems] = useState(false);
  const toggleShowItems = () => setShowItems(!showItems);
  const profile = useSelector(state => state.profile);

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div className="order-item">
        <div className="order-item-wrapper">
          <div className="order-basket-item-details">
            <div>
              <h4 className="underline basket-item-name">
                {order.id ? (
                  `#${order.id}`
                ) : (
                  <Skeleton width="100%" height="100%" />
                )}
              </h4>
              <div>
                <span className="spec-title">
                  {order.dateAdded ? (
                    'Added on'
                  ) : (
                    <Skeleton width="15%" height="100%" />
                  )}
                </span>
                <h4 className="my-0">
                  {order.dateAdded ? (
                    displayDate(order.dateAdded)
                  ) : (
                    <Skeleton width="20%" height="100%" />
                  )}
                </h4>
              </div>
            </div>
            {profile.role === 'ADMIN' && (
              <div className="order-basket-user-detail">
                <h4 className="my-0">
                  {order.by ? (
                    order?.by?.fullname
                  ) : (
                    <Skeleton width="20%" height="100%" />
                  )}
                </h4>
                <h4 className="my-0">
                  {order.by?.email ? (
                    order?.by?.email
                  ) : (
                    <Skeleton width="30%" height="100%" />
                  )}
                </h4>
                <h4 className="my-0">
                  {order.by?.email ? (
                    order?.by?.address || "N/A"
                  ) : (
                    <Skeleton width="10%" height="100%" />
                  )}
                </h4>
              </div>
            )}
          </div>

          <div className="basket-item-price">
            <h4 className="my-0">
              {order.totalAmount ? (
                displayMoney(order.totalAmount)
              ) : (
                <Skeleton width="20%" height="100%" />
              )}
            </h4>
          </div>
          <button
            className="basket-item-remove button button-border button-border-gray button-small"
            onClick={toggleShowItems}
            type="button">
            {showItems ? <UpOutlined /> : <DownOutlined />}
          </button>
        </div>
        {showItems &&
          order.basket.map((product, index) => (
            <OrderBasketItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${product.id}_${index}`}
              product={product}
              basket={order.basket}
              dispatch={dispatch}
            />
          ))}
      </div>
    </SkeletonTheme>
  );
};

OrderItem.propTypes = {
  order: PropType.shape({
    id: PropType.number,
    basket: PropType.arrayOf(PropType.shape()),
    by: PropType.shape(),
    dateAdded: PropType.number,
    totalAmount: PropType.number,
  }).isRequired,
};

export default OrderItem;
