//Import
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



//InventoryItem card displays stock in rows
const InventoryItem = (props) => (
 <tr>
   <td>{props.stock.productDesc}</td>
   <td>{props.stock.productCat}</td>
   <td>{props.stock.stockQty}</td>
   <td>{props.stock.stockExp}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.stock._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteStock(props.stock._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);



//InventoryList function to pull inventory list from DB
export default function InventoryList() {
 const [inventory, setStock] = useState([]);
 const [prodInv, setProduct] = useState([]);

 //Prod INV DB
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

 
 // This method fetches the inventory from the database.
 useEffect(() => {
   async function getStock() {
     const response = await fetch(`http://localhost:5050/stockDB/`);

     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const inventory = await response.json();
     setStock(inventory);
   }
   getStock();
   return;
 }, [inventory.length]);



 // This method will delete a stock
 async function deleteStock(id) {
   await fetch(`http://localhost:5050/stockDB/${id}`, {
     method: "DELETE"
   });
   const newStock = inventory.filter((el) => el._id !== id);
   setStock(newStock);
 }



 // This method will map out the stock on the table
 function inventoryList() {
  
   return inventory.map((stock) => {
     return (
       <InventoryItem
         stock={stock}
         deleteStock={() => deleteStock(stock._id)}
         key={stock._id}
       />
     );
   });
 }
 // This following section will display the table with the inventory of stock.
 return (
   <div className="crudStyle">
     <h3>Inventory List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Product</th>
           <th>Category</th>
           <th>Quantity</th>
           <th>EXP/BBE</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody className="invListStyle">{inventoryList()}</tbody>
     </table>
   </div>
 );
}
