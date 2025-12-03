import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";

export default function ProductDetails() {
  const { id } = useParams();
  const [carpet, setCarpet] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCarpet = async () => {
      try {
        const { data } = await axios.get(
          `https://rosewell.onrender.com/api/carpets/${id}`
        );
        setCarpet(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    fetchCarpet();
  }, [id]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Please log in to add a review");

    try {
      const { data } = await axios.post(
        `https://rosewell.onrender.com/api/carpets/${id}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Review added successfully");
      setCarpet((prev) => ({ ...prev, reviews: data.reviews }));
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading product...</p>;

  if (!carpet)
    return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <img
            src={carpet.image}
            alt={carpet.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />

          {/* PRODUCT MAIN DETAILS */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {carpet.name}
            </h1>

            <p className="text-gray-700 mb-3">{carpet.description}</p>

            <p className="text-2xl font-semibold text-orange-600 mb-2">
              ₹{carpet.price - (carpet.discount || 0)}
              {carpet.discount > 0 && (
                <span className="text-gray-400 line-through ml-2">
                  ₹{carpet.price}
                </span>
              )}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Category: {carpet.category}
            </p>

            {/* PRODUCT DETAILS ALWAYS VISIBLE */}
            <div className="bg-white p-5 rounded-lg shadow-md text-gray-800">
              <h2 className="text-xl font-semibold mb-3">
                Product Details
              </h2>

              <div className="space-y-2">
                {carpet.details && (
                  <p>
                    <b>Description:</b> {carpet.details}
                  </p>
                )}

                {carpet.color && (
                  <p>
                    <b>Color:</b> {carpet.color}
                  </p>
                )}

                {carpet.dimensions && (
                  <p>
                    <b>Dimensions:</b> {carpet.dimensions}
                  </p>
                )}

                {carpet.care && (
                  <p>
                    <b>Care Instructions:</b> {carpet.care}
                  </p>
                )}
              </div>
            </div>

            {/* MORE INFO ACCORDION */}
            <div className="mt-4 bg-white p-5 rounded-lg shadow-md text-gray-800">
              <button
                onClick={() => setShowMoreInfo(!showMoreInfo)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold"
              >
                More Information
                <span>{showMoreInfo ? "▲" : "▼"}</span>
              </button>

              {showMoreInfo && (
                <div className="mt-3 space-y-2 text-gray-700">
                  {carpet.disclaimer && (
                    <p>
                      <b>Disclaimer:</b> {carpet.disclaimer}
                    </p>
                  )}

                  {/* You can add more fields here if needed */}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h2>

          {carpet.reviews?.length > 0 ? (
            <div className="space-y-4">
              {carpet.reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <p className="font-semibold text-gray-800">
                    ⭐ {rev.rating}/5
                  </p>
                  <p className="text-gray-700">{rev.comment}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    by {rev.user?.name || "Anonymous"} on{" "}
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          {/* ADD REVIEW */}
          <form
            onSubmit={handleAddReview}
            className="mt-8 bg-white p-6 rounded-lg shadow-md text-gray-800"
          >
            <h3 className="text-lg font-semibold mb-4">Add Your Review</h3>

            <div className="mb-3">
              <label className="block text-sm mb-1">Rating</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
                required
                className="border rounded-md px-3 py-2 w-20"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="3"
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md"
            >
              Submit Review
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
