import {ImageLoader} from 'components/common';
import {EDIT_PRODUCT} from 'constants/routes';
import {displayActionMessage, displayDate, displayMoney} from 'helpers/utils';
import PropType from 'prop-types';
import React, {useRef} from 'react';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import {useDispatch} from 'react-redux';
import {useHistory, withRouter} from 'react-router-dom';
import {deleteUser} from 'redux/actions/userActions';

const UserItem = ({user}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userRef = useRef(null);

  const onClickEdit = () => {
    history.push(`${EDIT_PRODUCT}/${user.id}`);
  };

  const onDeleteUser = () => {
    userRef.current.classList.toggle('item-active');
  };

  const onConfirmDelete = () => {
    dispatch(deleteUser(user.id));
    displayActionMessage('Item successfully deleted');
    userRef.current.classList.remove('item-active');
  };

  const onCancelDelete = () => {
    userRef.current.classList.remove('item-active');
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`item item-users ${!user.id && 'item-loading'}`}
        ref={userRef}>
        <div className="grid grid-count-6">
          <div className="grid-col item-img-wrapper">
            {user.fullname ? (
              <ImageLoader
                alt={user.name}
                className="item-img"
                src={
                  user.image ||
                  'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'
                }
              />
            ) : (
              <Skeleton width={30} />
            )}
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">
              {user.fullname || <Skeleton width={50} />}
            </span>
          </div>
          <div className="grid-col">
            <span>{user.role || <Skeleton width={20} />}</span>
          </div>
          <div className="grid-col">
            <span>{user.email ? user.email : <Skeleton width={30} />}</span>
          </div>
          <div className="grid-col">
            <span>
              {user.email ? (
                user.address ? (
                  user.address
                ) : (
                  'N/A'
                )
              ) : (
                <Skeleton width={50} />
              )}
            </span>
          </div>
          <div className="grid-col">
            <span>
              {user.dateJoined ? (
                displayDate(user.dateJoined)
              ) : (
                <Skeleton width={30} />
              )}
            </span>
          </div>
        </div>
        {user.id && (
          <div className="item-action">
            <button
              className="button button-border button-small"
              onClick={onClickEdit}
              type="button">
              Edit
            </button>
            &nbsp;
            <button
              className="button button-border button-small button-danger"
              onClick={onDeleteUser}
              type="button">
              Delete
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to delete this?</h5>
              <button
                className="button button-small button-border"
                onClick={onCancelDelete}
                type="button">
                No
              </button>
              &nbsp;
              <button
                className="button button-small button-danger"
                onClick={onConfirmDelete}
                type="button">
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

UserItem.propTypes = {
  user: PropType.shape({
    id: PropType.string,
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    sizes: PropType.arrayOf(PropType.string),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    dateAdded: PropType.number,
    availableColors: PropType.arrayOf(PropType.string),
  }).isRequired,
};

export default withRouter(UserItem);
