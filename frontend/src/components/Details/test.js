import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../App";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./style.css";
import Category from "../Category";

const Details = () => {
  const [product, setProduct] = useState();
  const [review, setReview] = useState([]);
  const { loggedUserId, setloggedUserId } = useContext(ProductContext);
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/search1/${id}`)
      .then((result) => {
        console.log(result.data);
        setProduct(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (e) => {
    console.log(id);
    axios
      .post(
        `http://localhost:5000/products/${id}/review/`,
        {
          review,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setReview([...review, res.data.review]);

        product.review.push(res.data.review);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let fav = JSON.parse(localStorage.getItem("fav")) || [];
  const addToFav = (e) => {
    const fav1 = fav.filter((product) => {
      return product._id !== e.target.id;
    });
    fav1.push(product);
    localStorage.setItem("fav", JSON.stringify(fav1));
  };

  const addToCart = (e) => {
    const productId = e.target.id;
    console.log(e.target.id);

    if (userId) {
      axios
        .post(`http://localhost:5000/users/${userId}/cart`, {
          items: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="wrapper2">
      <Category />
      <div className="Details">
        {product && (
          <>
            {" "}
            <div className="some-detail">
              <img src={product.image} id={product._id} />
              <h2>{product.productName}</h2>
              <p>
                {product.rate}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </p>
            </div>
            <div className="detail2">
              <p>
                <span>Price:</span> ${product.price}
              </p>
              <p>
                <span>Description:</span> {product.description}
              </p>
            </div>
            <div className="comment-section">
              {product.review.map((review, i) => {
                return (
                  <div className="comment" key={i}>
                    <h4>{review.user}</h4>
                    <p>{review.review}</p>
                  </div>
                );
              })}
              <input
                className="input-review"
                placeholder="Add a review"
                onChange={(e) => {
                  setReview(e.target.value);
                }}
              />
              <br></br>
              <button className="enter" onClick={handleClick}>
                Enter
              </button>
            </div>
            <button id={product._id} className="details-btn" onClick={addToFav}>
              Add to wishlist
            </button>
            <button
              id={product._id}
              className="details-btn"
              onClick={addToCart}
            >
              Add to my cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
{
  /*  {localStorage.getItem("loggedUserId")==commenterId ?  <><button  onClick={deleteReview}><TiDelete/></button><button  onClick={deleteReview}><RxUpdate/></button></>
         :""} */
}
