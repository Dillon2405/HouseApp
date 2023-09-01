//Imports
import React, { useState } from "react";
//import { useNavigate } from "react-router"; (1)


//Create Stock Form Function
export default function CreateProduct() {
 const [prodForm, setForm] = useState({
   productDesc: "",
   productCat: "",
 });
 //const navigate = useNavigate(); (1)

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   // When a post request is sent to the create url, we'll add a new stock to the database.
   const newItem = { ...prodForm };

   await fetch("http://localhost:5050/productDB/productList", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newItem),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
   setForm({ productDesc: "", productCat: ""});

// navigate("/"); (1)
  }

 // This following section will display the form that takes the input from the user.
 return (
   <div className="crudCreateStyle">
     <h3>Create New Product</h3>
     <form onSubmit={onSubmit} className="formStyle">
       <div className="form-group">
         <label htmlFor="productDesc">Product</label>
         <input
           type="text"
           className="form-control"
           id="productDesc"
           value={prodForm.productDesc}
           onChange={(e) => updateForm({ productDesc: e.target.value })}
         />
       </div>    
       <label>Product Category</label>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="prodCatOptions"
             id="prodCatDairy"
             value="Dairy"
             checked={prodForm.productCat === "Dairy"}
             onChange={(e) => updateForm({ productCat: e.target.value })}
           />
           <label htmlFor="prodCatDairy" className="form-check-label">Dairy</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="prodCatOptions"
             id="prodCatMeat"
             value="Meat"
             checked={prodForm.productCat === "Meat"}
             onChange={(e) => updateForm({ productCat: e.target.value })}
           />
           <label htmlFor="prodCatMeat" className="form-check-label">Meat</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="prodCatOptions"
             id="prodCatVeg"
             value="Veg"
             checked={prodForm.productCat === "Veg"}
             onChange={(e) => updateForm({ productCat: e.target.value })}
           />
           <label htmlFor="prodCatVeg" className="form-check-label">Veg</label>
         </div>
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
