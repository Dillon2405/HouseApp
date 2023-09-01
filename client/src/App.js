//Imports
import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

//Imports Components
import Menu from "./components/navbar";
import InventoryList from "./components/stockComp/inventoryList";
import ProductList from "./components/productComp/productList";
import CategoryList from "./components/catComp/categoryList";

import Edit from "./components/stockComp/edit";
import EditProduct from "./components/productComp/editProduct";
import EditCategory from "./components/catComp/editCategory";


import Create from "./components/stockComp/create";
import CreateProduct from "./components/productComp/createProduct";
import CreateCategory from "./components/catComp/createCategory";

const App = () => {
  return (
    <div>
      <Menu />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/" element={<InventoryList />} />
        <Route exact path="/productList" element={<ProductList />} />
        <Route exact path="/categoryList" element={<CategoryList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/editCategory/:id" element={<EditCategory />} />
        <Route path="/create" element={<Create />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/createCategory" element={<CreateCategory />} />


      </Routes>
      </div>
    </div>
  );
};

export default App;
