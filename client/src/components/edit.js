//Imports
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";


//Edit Stock Form Function
export default function Edit() {
 const [form, setForm] = useState({
   stockDesc: "",
   stockExp: "",
   stockCat: "",
   stockQty: "",
   productId: "",
   stock: [],
 });
 const params = useParams();
 const navigate = useNavigate();

 //Fetch products from DB
 const [productList, setProductList] = useState([]);

 useEffect(() => {
   async function fetchProductList() {
     try {
       const response = await fetch("http://localhost:5050/productDB/productList");

       if (response.ok) {
         const products = await response.json();
         setProductList(products);
       } else {
         console.error("Failed to fetch product list");
       }
     } catch (error) {
       console.error("An error occurred while fetching product list:", error);
     }
   }

   fetchProductList();
 }, []);


//Retrieves InventoryItem from DB or return err
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5050/stockDB/${params.id.toString()}`);

     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const stock = await response.json();
     if (!stock) {
       window.alert(`Stock with id ${id} not found`);
       navigate("/");
       return;
     }

     setForm(stock);
   }
   fetchData();
   return;
 }, [params.id, navigate]);

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
//Function for handling button press
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     productId: form.productId,
     stockExp: form.stockExp,
     stockCat: form.stockCat,
     stockQty: form.stockQty,
   };

   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5050/stockDB/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });

   navigate("/");
 }

 // This following section will display the form that takes input from the user to update the data.
 return (
   <div className="crudCreateStyle">
     <h3>Update Item</h3>
     <form onSubmit={onSubmit} className="formStyle">
     <div className="form-group">
          <label htmlFor="productId">Select Product</label>
          <select
            className="form-control"
            id="productId"
            value={form.productId}
            onChange={(e) => updateForm({ productId: e.target.value })}
          >
            <option value="">Select a product</option>
            {productList.map(product => (
              <option key={product._id} value={product._id}>
                {product.productDesc}
              </option>
            ))}
          </select>
        </div>   
       <div className="form-group">
         <label htmlFor="stockQty">Quantity</label>
         <input
           type="number"
           className="form-control"
           id="stockQty"
           value={form.stockQty}
           onChange={(e) => updateForm({ stockQty: e.target.value })}
         />
       </div>             
       <div className="form-group">
         <label htmlFor="stockExp">Expiry: </label>
         <input
           type="date"
           className="form-control"
           id="stockExp"
           value={form.stockExp}
           onChange={(e) => updateForm({ stockExp: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="categoryOptions"
             id="categoryDairy"
             value="Dairy"
             checked={form.stockCat === "Dairy"}
             onChange={(e) => updateForm({ stockCat: e.target.value })}
           />
           <label htmlFor="categoryDairy" className="form-check-label">Dairy</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="categoryOptions"
             id="categoryMeat"
             value="Meat"
             checked={form.stockCat === "Meat"}
             onChange={(e) => updateForm({ stockCat: e.target.value })}
           />
           <label htmlFor="categoryMeat" className="form-check-label">Meat</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="categoryOptions"
             id="categoryVeg"
             value="Veg"
             checked={form.stockCat === "Veg"}
             onChange={(e) => updateForm({ stockCat: e.target.value })}
           />
           <label htmlFor="categoryVeg" className="form-check-label">Veg</label>
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
