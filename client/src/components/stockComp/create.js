//Imports
import React, { useState, useEffect  } from "react";
//import { useNavigate } from "react-router"; (1)


//Create Stock Form Function
export default function Create() {
 const [form, setForm] = useState({
   productDesc: "",
   stockExp: "",
   productCat: "",
   stockQty: "",
 });
 //const navigate = useNavigate(); (1)

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

 
 // These methods will update the state properties.
 function updateForm(value) {
  if (value.productDesc) {
    // Find the selected product in the productList
    const selectedProduct = productList.find(
      (product) => product.productDesc === value.productDesc
    );

    // Set the productCat based on the selected product
    if (selectedProduct) {
      value.productCat = selectedProduct.productCat;
    }
  }
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   // When a post request is sent to the create url, we'll add a new stock to the database.
   const newPerson = { ...form };

   await fetch("http://localhost:5050/stockDB", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
   setForm({ productDesc: "", stockExp: "", productCat: "", stockQty: ""});
// navigate("/"); (1)
  }

 // This following section will display the form that takes the input from the user.
 return (
   <div className="crudCreateStyle">
     <h3>Create New Stock</h3>
     <form onSubmit={onSubmit} className="formStyle">
       <div className="form-group">
          <label htmlFor="productDesc">Select Product</label>
          <select
            className="form-control"
            id="productDesc"
            value={form.productDesc}
            onChange={(e) => updateForm({ productDesc: e.target.value })}
          >
            <option value="">Select a product</option>
            {productList.map(product => (
              <option className="capitalsList"key={product.productDesc} value={product.productDesc}>
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
         <label htmlFor="stockExp">Expiry/Best Before</label>
         <input
           type="date"
           className="form-control"
           id="stockExp"
           value={form.stockExp}
           onChange={(e) => updateForm({ stockExp: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Add stock"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
