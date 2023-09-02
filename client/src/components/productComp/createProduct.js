//Imports
import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router"; (1)


//Create Stock Form Function
export default function CreateProduct() {
 const [prodForm, setForm] = useState({
   productDesc: "",
   categoryDesc: "",
 });
 //const navigate = useNavigate(); (1)

//Fetch category from DB
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
   setForm({ productDesc: "", categoryDesc: ""});

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
       <div className="form-group">
          <label htmlFor="categoryDesc">Select Category</label>
          <select
            className="form-control"
            id="categoryDesc"
            value={prodForm.categoryDesc}
            onChange={(e) => updateForm({ categoryDesc: e.target.value })}
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
           value="Add Product"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
