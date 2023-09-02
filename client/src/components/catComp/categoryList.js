//Import
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


//CategoryItem card displays category in rows
const CategoryItem = (props) => (
 <tr>
   <td>{props.category.categoryDesc}</td>
   <td>
     <Link className="btn btn-link" to={`/editCategory/${props.category._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteCategory(props.category._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);


//CategoryList function to pull catInv list from DB
export default function CategoryList() {
 const [catInv, setCategory] = useState([]);

 // This method fetches the catInv from the database.
 useEffect(() => {
   async function getCategory() {
     const response = await fetch(`http://localhost:5050/categoryDB/categoryList`);

     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const catInv = await response.json();
     setCategory(catInv);
   }

   getCategory();

   return;
 }, [catInv.length]);

 // This method will delete a category
 async function deleteCategory(id) {
   await fetch(`http://localhost:5050/categoryDB/categoryList/${id}`, {
     method: "DELETE"
   });

   const newCategory = catInv.filter((el) => el._id !== id);
   setCategory(newCategory);
 }

 // This method will map out the category on the table
 function categoryList() {
   return catInv.map((category) => {
     return (
       <CategoryItem
         category={category}
         deleteCategory={() => deleteCategory(category._id)}
         key={category._id}
       />
     );
   });
 }

 // This following section will display the table with the catInv of category.
 return (
   <div className="crudStyle">
     <h3>Category List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Category</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody className="capitalsList">{categoryList()}</tbody>
     </table>
   </div>
 );
}
