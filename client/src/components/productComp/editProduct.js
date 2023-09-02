//Imports
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";


//Edit Stock Form Function
export default function EditProduct() {
 const [prodForm, setProdForm] = useState({
   productDesc: "",
   categoryDesc: "",
   product: [],
 });
 const params = useParams();
 const navigate = useNavigate();

 const [categoryList, setCategoryList] = useState([]);


 useEffect(() => {
   async function fetchCategoryList() {
     try {
       const response = await fetch("http://localhost:5050/categoryDB/categoryList");
 
       if (response.ok) {
         const categories = await response.json();
         setCategoryList(categories);
       } else {
         console.error("Failed to fetch product list");
       }
     } catch (error) {
       console.error("An error occurred while fetching product list:", error);
     }
   }
 
   fetchCategoryList();
 }, []);

//Retrieves InventoryItem from DB or return err
 useEffect(() => {
   async function fetchProducts() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5050/productDB/productList/${params.id.toString()}`);

     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const product = await response.json();
     if (!product) {
       window.alert(`Product with id ${id} not found`);
       navigate("/");
       return;
     }

     setProdForm(product);
   }
   fetchProducts();
   return;
 }, [params.id, navigate]);

 // These methods will update the state properties.
 function updateProdForm(value) {
   return setProdForm((prev) => {
     return { ...prev, ...value };
   });
 }
//Function for handling button press
 async function onSubmit(e) {
   e.preventDefault();
   const editedProduct = {
     productDesc: prodForm.productDesc,
     categoryDesc: prodForm.categoryDesc,
   };

   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5050/productDB/productList/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedProduct),
     headers: {
       'Content-Type': 'application/json'
     },
   });

   navigate("/productList");
 }

 // This following section will display the form that takes input from the user to update the data.
 return (
   <div className="crudCreateStyle">
     <h3>Update Product</h3>
     <form onSubmit={onSubmit} className="formStyle">
       <div className="form-group">
         <label htmlFor="productDesc">Product: </label>
         <input
           type="text"
           className="form-control"
           id="productDesc"
           value={prodForm.productDesc}
           onChange={(e) => updateProdForm({ productDesc: e.target.value })}
         />
       </div>         
       <div className="form-group">
          <label htmlFor="categoryDesc">Select Category</label>
          <select
            className="form-control"
            id="categoryDesc"
            value={prodForm.categoryDesc}
            onChange={(e) => updateProdForm({ categoryDesc: e.target.value })}
          >
            <option value="">Select a Category</option>
            {categoryList.map(category => (
              <option className="capitalsList"key={category.categoryDesc} value={category.categoryDesc}>
                {category.categoryDesc}
              </option>
            ))}
          </select>
        </div> 
       <div className="form-group">
         <input
           type="submit"
           value="Update"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
