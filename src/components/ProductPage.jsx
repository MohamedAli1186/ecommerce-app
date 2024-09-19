import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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

  const isAuthenticated = localStorage.getItem("auth") === "true";
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
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

  const AddReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("You must be logged in to add a review");
      return;
    }

    if (editingReviewId) {
      const updatedReviews = reviews.map((review) =>
        review.id === editingReviewId
          ? { ...review, comment: newReview } // Update the comment
          : review
      );
      setReviews(updatedReviews);
      setEditingReviewId(null);
    } else {
      // Add a review
      const newReviewData = {
        id: Date.now(),
        rating: 4, //default rating
        comment: newReview,
        reviewerName: "Me",
        reviewerEmail: userEmail,
        date: new Date().toISOString(),
      };
      setReviews([...reviews, newReviewData]);
    }

    setNewReview(""); // Reset the review input
  };

  const EditReview = (reviewId) => {
    const reviewToEdit = reviews.find((review) => review.id === reviewId);
    if (reviewToEdit) {
      setNewReview(reviewToEdit.comment);
      setEditingReviewId(reviewId);
    }
  };

  const DeleteReview = (reviewId) => {
    const filteredReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(filteredReviews);
  };

  return (
    <main>
      <Header></Header>
      {product ? (
        <div className="product-container">
          <div className="first-section">
            <img src={product.thumbnail} alt={product.title} />
            <div className="group">
              <h4>Category : {product.category}</h4>
              <h4>Price : {product.price} EGP</h4>
              <h3>availability Status : {product.availabilityStatus}</h3>
            </div>
          </div>

          <h1>{product.title}</h1>
          <p>{product.description}</p>

          <div className="reviews">
            <h2>Reviews</h2>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="review">
                  <div className="hr"></div>
                  <p className="reviewer">Reviewer: {review.reviewerName}</p>
                  <div className="rating-group">
                    <label>Rating :</label>
                    <p className="rating"> {review.rating} out of 5</p>
                  </div>
                  <h3>{review.comment}</h3>
                  <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                  {review.reviewerEmail === userEmail && (
                    <>
                      <button onClick={() => EditReview(review.id)}>
                        Edit
                      </button>
                      <button onClick={() => DeleteReview(review.id)}>
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
            <form className="review-form" onSubmit={AddReview}>
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
            <div className="not-loggedin">
              <p>You must be </p>
              <Link to="/auth">Logged in</Link>
              <p> to add a review</p>
            </div>
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
