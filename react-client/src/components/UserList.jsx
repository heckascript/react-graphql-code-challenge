import React from 'react';
import { useQuery, gql } from '@apollo/client';

import style from '../styles/UserList.module.css';

export const ALL_USERS = gql`
  query users {
    users {
      id
      name
      email
      phone
    }
  }
`;

function UserList(props) {
  let { query = ALL_USERS } = props;
  let { loading, error, data } = useQuery(query);

  if (loading) {
    return "Loading Users...";
  }

  if (error) {
    return `Users Query failed with: '${error}', try starting/restarting the graphQL server`;
  }

  const users = data.users.map((user, index) => (
    <li className={style['user-list-item']} key={index}>
      <span> {user.name} </span>
      <span> {user.id} </span>
      <span> {user.email} </span>
      <span> {user.phone} </span>
    </li>
  ));

  return (
    <section className="all-users">
      <h2 className="all-users-header">Users:</h2>
      <ul className={style['user-list']}>
        {users}
      </ul>
    </section>
  );
}

export default UserList;