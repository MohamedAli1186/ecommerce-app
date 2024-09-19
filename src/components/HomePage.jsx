import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Header from "./headerFooter/HeaderPage";
import Footer from "./headerFooter/FooterPage";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
        setSortedProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle Sorting
  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortOption(sortValue);

    let sortedArray = [...products];

    if (sortValue === "priceLowToHigh") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortValue === "priceHighToLow") {
      sortedArray.sort((a, b) => b.price - a.price);
    } else if (sortValue === "popularity") {
      sortedArray.sort((a, b) => b.stock - a.stock);
    } else if (sortValue === "rating") {
      sortedArray.sort((a, b) => b.rating - a.rating);
    }

    setSortedProducts(sortedArray);
  };

  // Handle Search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setSortedProducts(filteredProducts);
    setCurrentPage(1); // Reset to the first page
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p className="Loading">Loading products...</p>;
  }

  return (
    <div className="Main-container">
      <Header></Header>
      <h1>Products Listing</h1>

      <div className="search-container">
        <label>Search: </label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name or description"
        />
      </div>


      <div className="sorting-container">
        <label>Sort by: </label>
        <select value={sortOption} onChange={handleSort}>
          <option value="">Select an option</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="products-container">
        {sortedProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <h4>Price: {product.price} EGP</h4>
              <p>{product.description}</p>
              <Link to={`/product/${product.id}`}>
                <button>View Product</button>
              </Link>
            </div>
          ))
        ) : (
          <p className="NoItemsFound">No items found.</p>
        )}
      </div>

      {sortedProducts.length > 0 && (
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={sortedProducts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}

      <Footer></Footer>
    </div>
  );
};

export default HomePage;
