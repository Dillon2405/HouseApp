//Imports
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";


//Edit Stock Form Function
export default function EditProduct() {
 const [prodForm, setProdForm] = useState({
   productDesc: "",
   productCat: "",
   product: [],
 });
 const params = useParams();
 const navigate = useNavigate();

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
     productCat: prodForm.productCat,
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
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="prodCatOptions"
             id="prodCatDairy"
             value="Dairy"
             checked={prodForm.productCat === "Dairy"}
             onChange={(e) => updateProdForm({ productCat: e.target.value })}
           />
           <label htmlFor="categoryDairy" className="form-check-label">Dairy</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="prodCatOptions"
             id="prodCatMeat"
             value="Meat"
             checked={prodForm.productCat === "Meat"}
             onChange={(e) => updateProdForm({ productCat: e.target.value })}
           />
           <label htmlFor="prodCatDairy" className="form-check-label">Meat</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="prodCatOptions"
             id="prodCatVeg"
             value="Veg"
             checked={prodForm.productCat === "Veg"}
             onChange={(e) => updateProdForm({ productCat: e.target.value })}
           />
           <label htmlFor="prodCatVeg" className="form-check-label">Veg</label>
         </div>
       </div>
       <br />

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
