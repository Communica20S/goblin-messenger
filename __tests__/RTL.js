//import testing modules
import React from 'react';
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';


//import react components from the filetree
import { Provider } from 'react-redux';
import store from './../client/state/store.js';
import App from './../client/App.js';
import MessageBox from './../client/components/MessageBox.js'
// console.log(App)

jest.mock('./../client/logo.png')

describe('App', () => {
    beforeEach(() => {

    })
    test('renders MessageBox component', () => {
      render(<MessageBox message={{input: 'string'}}/>);
      // screen.debug();
    });
  });


  describe('Logo', () => {
    test('Logo must have src = "/logo.png" ', () => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
      screen.debug();
      const button = screen.getByText('Login');
      expect(screen.getAllByText('Login')).toBeInTheDocument;
    //   const logo = screen.getByRole('img');
    //   expect(logo).toHaveAttribute('src', '/logo.png');
    });
  });





