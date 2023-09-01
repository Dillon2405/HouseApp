//Imports
import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

//Imports Components
import Menu from "./components/navbar";
import InventoryList from "./components/stockComp/inventoryList";
import Edit from "./components/stockComp/edit";
import Create from "./components/stockComp/create";
import ProductList from "./components/productComp/productList";
import CreateProduct from "./components/productComp/createProduct";
import EditProduct from "./components/productComp/editProduct";

const App = () => {
  return (
    <div>
      <Menu />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<InventoryList />} />
        <Route exact path="/productList" element={<ProductList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/create" element={<Create />} />
        <Route path="/createProduct" element={<CreateProduct />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
