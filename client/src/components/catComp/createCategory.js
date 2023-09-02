//Imports
import React, { useState } from "react";
//import { useNavigate } from "react-router"; (1)


//Create Stock Form Function
export default function CreateCategory() {
 const [categoryForm, setForm] = useState({
   categoryDesc: "",
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
   const newCategory = { ...categoryForm };

   await fetch("http://localhost:5050/categoryDB/categoryList", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newCategory),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
   setForm({ categoryDesc: ""});

// navigate("/"); (1)
  }

 // This following section will display the form that takes the input from the user.
 return (
   <div className="crudCreateStyle">
     <h3>Create New Category</h3>
     <form onSubmit={onSubmit} className="formStyle">
       <div className="form-group">
         <label htmlFor="categoryDesc">Category</label>
         <input
           type="text"
           className="form-control"
           id="categoryDesc"
           value={categoryForm.categoryDesc}
           onChange={(e) => updateForm({ categoryDesc: e.target.value })}
         />
       </div>    
       <div className="form-group">
         <input
           type="submit"
           value="Add Category"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
