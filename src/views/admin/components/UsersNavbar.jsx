import {FilterOutlined, PlusOutlined} from '@ant-design/icons';
import {FiltersToggle, SearchBar} from 'components/common';
import PropType from 'prop-types';
import React from 'react';
import {useHistory} from 'react-router-dom';

const UsersNavbar = props => {
  const {usersCount, totalUsersCount} = props;
  const history = useHistory();

  return (
    <div className="product-admin-header">
      <h3 className="product-admin-header-title">
        Users &nbsp; ({`${usersCount} / ${totalUsersCount}`})
      </h3>
      <SearchBar from="User" />
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

UsersNavbar.propTypes = {
  usersCount: PropType.number.isRequired,
  totalUsersCount: PropType.number.isRequired,
};

export default UsersNavbar;
