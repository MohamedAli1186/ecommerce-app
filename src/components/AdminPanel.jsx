import React, { useState } from "react";
import "./AdminPanel.css"; 
import Header from "./headerFooter/HeaderPage";
import Footer from "./headerFooter/FooterPage";

const AdminPanel = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: "" // Add thumbnail field
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Add new product
  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ title: "", price: "", description: "", thumbnail: "" });
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Edit product
  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditingProduct(productToEdit);
  };

  // Update product
  const handleUpdateProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    setEditingProduct(null); // Close the edit form
  };

  return (
    <div className="admin-panel">
      <Header />
      <h1>Admin Panel</h1>

      {/* Add Product Form */}
      <div className="add-product-form">
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <textarea
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.thumbnail}
          onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <h2 className="hh">Manage Products</h2>
      {/* Product List */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.thumbnail} alt={product.title} />
            <p>
              {product.title} - ${product.price}
            </p>
            <button onClick={() => handleEditProduct(product.id)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Edit Product Form (Conditional Rendering) */}
      {editingProduct && (
        <div className="edit-product-form">
          <h2>Edit Product</h2>
          <input
            type="text"
            value={editingProduct.title}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, title: e.target.value })
            }
          />
          <input
            type="text"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
          />
          <textarea
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, description: e.target.value })
            }
          />
          <input
            type="text"
            value={editingProduct.thumbnail}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, thumbnail: e.target.value })
            }
          />
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
