//Import
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


//ProductItem card displays product in rows
const ProductItem = (props) => (
 <tr>
   <td>{props.product.productDesc}</td>
   <td>{props.product.productCat}</td>
   <td>
     <Link className="btn btn-link" to={`/editProduct/${props.product._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteProduct(props.product._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);


//ProductList function to pull prodInv list from DB
export default function ProductList() {
 const [prodInv, setProduct] = useState([]);

 // This method fetches the prodInv from the database.
 useEffect(() => {
   async function getProduct() {
     const response = await fetch(`http://localhost:5050/productDB/productList`);

     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const prodInv = await response.json();
     setProduct(prodInv);
   }

   getProduct();

   return;
 }, [prodInv.length]);

 // This method will delete a product
 async function deleteProduct(id) {
   await fetch(`http://localhost:5050/productDB/productList/${id}`, {
     method: "DELETE"
   });

   const newProduct = prodInv.filter((el) => el._id !== id);
   setProduct(newProduct);
 }

 // This method will map out the product on the table
 function productList() {
   return prodInv.map((product) => {
     return (
       <ProductItem
         product={product}
         deleteProduct={() => deleteProduct(product._id)}
         key={product._id}
       />
     );
   });
 }

 // This following section will display the table with the prodInv of product.
 return (
   <div className="crudStyle">
     <h3>Product List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Product</th>
           <th>Category</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody className="invListStyle">{productList()}</tbody>
     </table>
   </div>
 );
}
