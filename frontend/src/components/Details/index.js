import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../App";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./style.css";
import Category from "../Category";
 
  import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBSwitch,
    MDBTypography,
  } from "mdb-react-ui-kit";
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
    <div className="wrapper">
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
           
            <section style={{ backgroundColor: "#f7f6f6" ,marginLeft:"3rem",width:"800px"}}>
      <MDBContainer className="py-3 text-dark" style={{ maxWidth: "800px" }}>
        <MDBRow >
          <MDBCol md="12" lg="10" xl="8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h4" className="text-dark mb-0">
                Reviews
              </MDBTypography>
              <MDBCard>
              
              </MDBCard>
            </div>
            {product.review.map((review, i) => {
                return (
            <MDBCard className="mb-3">
              <MDBCardBody >
                <div className="d-flex flex-start">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/11-512.png"
                    alt="avatar"
                    style={{width:"40px",height:"40px"}}
                     
                  />

                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">

                   
                  <MDBTypography
                  tag="h6"
                  className="text-primary fw-bold mb-0" key={i}>
                   {review.user}
                   <span className="text-dark ms-2">{review.review}</span>
                    
                  </MDBTypography>
                  
              
                      <MDBTypography
                        tag="h6"
                        className="text-primary fw-bold mb-0"
                      >
                        lara_stewart
                        <span className="text-dark ms-2">
                          Hmm, This poster looks cool
                        </span>
                      </MDBTypography>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="small mb-0" style={{ color: "#aaa" }}>
                        <a href="#!" className="link-grey">
                          Remove
                        </a>{" "}
                        •
                        <a href="#!" className="link-grey">
                          Reply
                        </a>{" "}
                        
                      </p>
                      <div className="d-flex flex-row">
                        <MDBIcon fas icon="star text-warning me-2" />
                        <MDBIcon
                          far
                          icon="check-circle"
                          style={{ color: "#aaa" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>

);
})}  
             

            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

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
 