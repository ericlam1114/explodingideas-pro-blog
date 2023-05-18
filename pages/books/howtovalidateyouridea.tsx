import React, { useState } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const product = {
  id: 1,
  image: "/path_to_product_image.jpg",
  name: "Product Name",
  description: "Product Description",
  price: 99.99,
  features: ["Feature 1", "Feature 2", "Feature 3"],
  reviews: [
    {
      id: 1,
      user: "John Doe",
      rating: 5,
      text: "Great product!",
    },
    {
      id: 2,
      user: "Jane Doe",
      rating: 4,
      text: "Really helpful.",
    },
  ],
};

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // handle add to cart functionality here
    console.log(`Added ${quantity} of product ${product.id} to cart`);
  };

  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-bodyFont">
        <Header />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-md shadow-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl mb-4">How to Validate Your Idea</h1>
            <p className="mb-8">
              This comprehensive guide is designed to take you step-by-step
              through the process of validating and launching your business
              idea, while keeping costs low and optimizing your chances for
              success.
              <br />
              <br />
              Whether you're a budding entrepreneur, a side hustler, or a
              seasoned business owner looking to start a new venture, this eBook
              will equip you with the essential strategies and insights you
              need. It takes the guesswork out of determining if there's a
              market for your product or service, and shows you how to build a
              compelling brand around your idea.
            </p>
            {/* <p className="text-xl mb-4">${product.price.toFixed(2)}</p> */}

            <div className="mb-4">
              {/* <label htmlFor="quantity" className="mr-2">
                Quantity
              </label> */}
              {/* <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value ? parseInt(e.target.value) : 1)
                }
                className="border rounded-md p-2"
              /> */}
            </div>

            <a
              href="https://docs.google.com/document/d/1zB9WQtzvMjCTJ_5x7d0HS19wHsSWQH-O3AvWyVsIWME/edit?usp=sharing"
              target="_blank"
            >
              {" "}
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Read Now
              </button>
            </a>

            <h3 className="text-xl mb-2 mt-8">
              Here's what you can expect from this playbook:
            </h3>
            <ul className="list-disc list-inside mb-8">
              <li>
                A detailed guide on how to brainstorm and refine your business
                idea to align with your vision and market demand.
              </li>
              <li>
                Practical tips on how to set up a lean, efficient tech stack
                using your preferred website builder. This guide ensures your
                initial costs are minimized while delivering a user-friendly
                experience.
              </li>
              <li>
                Comprehensive instructions on promoting your product organically
                without relying on paid ads. Learn how to tap into the potential
                of various communities to gauge true market interest.
              </li>
              <li>
                Clear methods on assessing your results to understand market
                momentum and purchase intent. This allows you to determine
                whether to pivot or persevere with your idea.
              </li>
              <li>
                Real-life examples and actionable strategies that have been
                tested and proven effective in the market.
              </li>
            </ul>

            <h3 className="text-xl mb-2">Reviews</h3>
            {product.reviews.map((review) => (
              <div key={review.id} className="border rounded-md p-4 mb-4">
                <p>
                  <strong>{review.user}</strong> rated it {review.rating}/5
                </p>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default ProductPage;
