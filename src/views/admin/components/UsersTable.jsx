/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import { UserItem } from '.';

const UsersTable = ({ filteredUsers }) => (
  <div>
    {filteredUsers.length > 0 && (
      <div className="grid grid-product grid-count-6">
        <div className="grid-col" />
        <div className="grid-col">
          <h5>Name</h5>
        </div>
        <div className="grid-col">
          <h5>Role</h5>
        </div>
        <div className="grid-col">
          <h5>Email</h5>
        </div>
        <div className="grid-col">
          <h5>Address</h5>
        </div>
        <div className="grid-col">
          <h5>Date Joined</h5>
        </div>
      </div>
    )}
    {filteredUsers.length === 0 ? new Array(10).fill({}).map((user, index) => (
      <UserItem
        // eslint-disable-next-line react/no-array-index-key
        key={`product-skeleton ${index}`}
        user={user}
      />
    )) : filteredUsers.map((user) => (
      <UserItem
        key={user.id}
        user={user}
      />
    ))}
  </div>
);

UsersTable.propTypes = {
  filteredUsers: PropType.array.isRequired
};

export default UsersTable;
