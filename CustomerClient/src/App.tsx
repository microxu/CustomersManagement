import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { CustomerList } from './components/CustomerList';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CustomerList />
    </Provider>
  );
};

export default App;
