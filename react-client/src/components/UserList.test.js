import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import WithApolloClient, { URI } from './WithApolloClient';
import db from '../../../graphql-server/src/db';

import UserList, { ALL_USERS } from './UserList';

const mockData = [{
  request: {
    query: ALL_USERS,
  },
  result: {
    data: {
      users: [
        {
          id: 'veryveryridiculouslystrongID',
          name: 'stwong bawd',
          email: 'strongbad@homestarrunner.com',
          phone: '5555555555'
        }
      ]
    }
  },
}];


// with mocked data
it('Begins in Loading state, then displays the correct User Data (mocked)', async () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <MockedProvider mocks={mockData} addTypename={false}>
      <UserList />
    </MockedProvider>
  ), div);

  // Loading
  expect(div.textContent.trim()).toEqual('Loading Users...');

  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  // Fulfilled
  let loadedStr = 'Users: stwong bawd  veryveryridiculouslystrongID  strongbad@homestarrunner.com  5555555555';
  expect(div.textContent.trim()).toEqual(loadedStr);
});


// with actual data from the DB
it('Queries the actual GraphQL server (when available)', async () => {
  let isBackendRunning = await fetch(URI).then((response) => {
    if (response.ok) {
      return true;
    }
  }).catch((err) => {
    console.log('Start the GraphQL server to test non-mocked data! (optional)');
    return false;
  });

  // only run this test if the graphql-server is running
  if (isBackendRunning) {
    const div = document.createElement('div');
    ReactDOM.render(
      WithApolloClient(UserList),
      div
    );

    // Loading
    expect(div.textContent.trim()).toEqual('Loading Users...');

    await act(async () => { // hard-coded delay, kinda nasty tbh
      await new Promise(resolve => setTimeout(resolve, 250));
    });

    // format data from the DB
    const usersString = 'Users: ' + db.users.map((user) => {
      return `${user.name}  ${user.id}  ${user.email}  ${user.phone}  `;
    }).join('').trim();

    // Fulfilled
    expect(div.textContent.trim()).toEqual(usersString);
  }
});
