import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../App";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./style.css";
import Category from "../Category";
import { BsStarFill } from "react-icons/bs";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBSwitch,
  MDBTypography,
  MDBInput,
  MDBBtn,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
const Details = () => {
  const [product, setProduct] = useState();
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Show Reviews");

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
        .post(
          `http://localhost:5000/users/${userId}/cart`,
          {
            items: productId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const toogle = () => {
    if (show) {
      setShow(false);
      setText("Hide Reviews");
    } else {
      setShow(true);
      setText("Show Reviews");
    }
  };
  return (
    <div className="wrapper2">
      <Category />

      {product && (
        <MDBCard
          className="py-5 h-100 center"
          style={{ width: "60rem", marginLeft: "-30rem" }}
        >
          <MDBCardImage position="top" src={product.image} id={product._id} />
          <MDBCardBody style={{ textAlign: "left" }}>
            <MDBCardTitle style={{ fontSize: "25px" }}>
              {product.productName}
            </MDBCardTitle>
            <MDBCardText>
              <strong>{product.rate}</strong>{" "}
              <BsStarFill style={{ color: "orange" }} />
            </MDBCardText>
            <MDBCardText>
              <strong>Price:</strong> ${product.price}
            </MDBCardText>
            <MDBCardText>
              {`${product.availability}` >0? (
                <strong style={{ color: "green" }}>In Stock</strong>
              ) : (
                <strong style={{ color: "red" }}>Out of Stock</strong>
              )}
            </MDBCardText>
            <MDBCardText>
              <strong>Description:</strong> <br /> {product.description}
            </MDBCardText>

            <section
              style={{
                width: "800px",
              }}
            >
              <MDBContainer
                className="py-3 text-dark"
                style={{ maxWidth: "800px" }}
              >
                <MDBRow>
                  <MDBCol md="12" lg="8" xl="8">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBTypography tag="h4" className="text-dark mb-0" style={{fontSize:"17px"}}>
                        <strong>Reviews</strong>
                      </MDBTypography>
                      <MDBCard>
                        <MDBCardBody className="p-2 d-flex align-items-center">
                          <MDBTypography
                            tag="h6"
                            className="text-primary fw-bold small mb-0 me-1"
                          >
                            {text}
                          </MDBTypography>
                          <MDBSwitch
                            defaultChecked
                            id="flexSwitchCheckChecked"
                            onClick={toogle}
                          />
                        </MDBCardBody>
                      </MDBCard>
                    </div>
                    {show
                      ? product.review.map((review, i) => {
                          return (
                            <MDBCard
                              className="mb-1"
                              style={{ height: "60px" }}
                            >
                              <MDBCardBody>
                                <div className="d-flex flex-start">
                                  <MDBCardImage
                                    className="rounded-circle shadow-1-strong me-1"
                                    src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/11-512.png"
                                    alt="avatar"
                                    style={{ width: "40px", height: "40px" }}
                                  />

                                  <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                      <MDBTypography
                                        tag="h6"
                                        className="text-primary fw-bold mb-0"
                                        key={i}
                                      >
                                        {review.user}
                                        <span className="text-dark ms-2">
                                          {review.review}
                                        </span>
                                      </MDBTypography>
                                    </div>
                                  </div>
                                </div>
                                
                              </MDBCardBody>
                              
                            </MDBCard>
                            
                            
                          );
                        })
                      : ""}
                      
                  </MDBCol>
                  
                </MDBRow>
                <MDBInput
              wrapperClass="mb-2"
              className="input-review"
              placeholder="Add a review"
              style={{ width: "400px",  }}
              size="lg"
              onChange={(e) => {
                setReview(e.target.value);
              }}
            />
            <MDBBtn
              className="mb-2 px-3"
              style={{ marginRight: "3rem" }}
              color="dark"
              size="M"
              onClick={handleClick}
            >
              Enter
            </MDBBtn>
              </MDBContainer>
            </section>
          </MDBCardBody>
        </MDBCard>
      )}
    </div>
  );
};

export default Details;
{
  /*   <button id={product._id} className="details-btn" onClick={addToFav}>
        Add to wishlist
      </button>
      <button id={product._id} className="details-btn" onClick={addToCart}>
        Add to my cart
      </button> */
}
