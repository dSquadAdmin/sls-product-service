import React from 'react';
import './App.css';
import ProductTable from './components/ProductList';
import NavBar from './components/NavBar';

function App() {
  
  return (
    <div>
      <NavBar/>
      {process.env.API_URL}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <ProductTable />
      </div>
    </div>
  );
}

export default App;
