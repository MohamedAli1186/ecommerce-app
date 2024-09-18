import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import Header from "./headerFooter/HeaderPage";
import Footer from "./headerFooter/FooterPage";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [error, setError] = useState("");

  // Get authenticated user's email (replace with real authentication logic)
  const isAuthenticated = localStorage.getItem("auth") === "true";
  const userEmail = localStorage.getItem("userEmail"); // Example: authenticated user's email

  useEffect(() => {
    // Fetch product details and reviews from API
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setReviews(data.reviews || []);
      } catch (error) {
        setError("Failed to fetch product details");
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("You must be logged in to add a review");
      return;
    }

    if (editingReviewId) {
      // Edit existing review
      const updatedReviews = reviews.map((review) =>
        review.id === editingReviewId
          ? { ...review, comment: newReview } // Update the comment
          : review
      );
      setReviews(updatedReviews);
      setEditingReviewId(null); // Reset after editing
    } else {
      // Add a new review
      const newReviewData = {
        id: Date.now(), // Unique ID for the new review
        rating: 5, // Default rating, you can add rating selection
        comment: newReview,
        reviewerName: "Me",
        reviewerEmail: userEmail, // Use authenticated user's email
        date: new Date().toISOString()
      };
      setReviews([...reviews, newReviewData]);
    }

    setNewReview(""); // Reset the review input
  };

  const handleEditReview = (reviewId) => {
    const reviewToEdit = reviews.find((review) => review.id === reviewId);
    if (reviewToEdit) {
      setNewReview(reviewToEdit.comment);
      setEditingReviewId(reviewId);
    }
  };

  const handleDeleteReview = (reviewId) => {
    const filteredReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(filteredReviews);
  };

  return (
    <main>
      <Header></Header>
      {product ? (
        <div className="product-container">
          <img src={product.thumbnail} alt={product.title} />
          <h1>{product.title}</h1>
          <h3>Price : {product.price} EGP</h3>
          <h4>Category : {product.category} category</h4>
          <h4>availability Status : {product.availabilityStatus}</h4>
          <p>{product.description}</p>
          <div className="reviews">
            <h2>Reviews</h2>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="review">
                  <div className="hr"></div>
                  <h4>Reviewer: {review.reviewerName}</h4>
                  <p>Email: {review.reviewerEmail}</p>
                  <p>Rating: {review.rating}</p>
                  <p>Comment: {review.comment}</p>
                  <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                  {review.reviewerEmail === userEmail && ( // Show Edit/Delete buttons only for user's reviews
                    <>
                      <button onClick={() => handleEditReview(review.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteReview(review.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
          {isAuthenticated ? (
            <form className="review-form" onSubmit={handleAddReview}>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write a review..."
                required
              />
              <button type="submit">
                {editingReviewId ? "Update Review" : "Add Review"}
              </button>
              {error && <p className="error">{error}</p>}
            </form>
          ) : (
            <p>You must be logged in to add a review</p>
          )}
        </div>
      ) : (
        <p className="Loading">Loading Details...</p>
      )}
      <Footer></Footer>
    </main>
  );
};

export default ProductPage;
