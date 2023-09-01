//Imports
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";


//Edit Stock Form Function
export default function EditCategory() {
 const [prodForm, setCategoryForm] = useState({
   categoryDesc: "",
   categories: [],
 });
 const params = useParams();
 const navigate = useNavigate();

//Retrieves InventoryItem from DB or return err
 useEffect(() => {
   async function fetchCategories() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5050/categoryDB/categoryList/${params.id.toString()}`);

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

     setCategoryForm(product);
   }
   fetchCategories();
   return;
 }, [params.id, navigate]);

 // These methods will update the state properties.
 function updateCategoryForm(value) {
   return setCategoryForm((prev) => {
     return { ...prev, ...value };
   });
 }
//Function for handling button press
 async function onSubmit(e) {
   e.preventDefault();
   const editedCategory = {
     categoryDesc: prodForm.categoryDesc,
   };

   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5050/categoryDB/categoryList/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedCategory),
     headers: {
       'Content-Type': 'application/json'
     },
   });

   navigate("/categoryList");
 }

 // This following section will display the form that takes input from the user to update the data.
 return (
   <div className="crudCreateStyle">
     <h3>Update Category</h3>
     <form onSubmit={onSubmit} className="formStyle">
       <div className="form-group">
         <label htmlFor="categoryDesc">Category: </label>
         <input
           type="text"
           className="form-control"
           id="categoryDesc"
           value={prodForm.categoryDesc}
           onChange={(e) => updateCategoryForm({ categoryDesc: e.target.value })}
         />
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
