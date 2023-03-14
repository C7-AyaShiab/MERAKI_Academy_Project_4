import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../App";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./style.css";

const Details = () => {
  const [product, setProduct] = useState();
  const [review, setReview] = useState([]);
  const { loggedUserId, setloggedUserId } = useContext(ProductContext);
  const { id } = useParams();

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

  return (
    <section className="vh-100" style={{ backgroundColor: "#d94125" }}>
    <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
      <MDBRow className="justify-content-center">
        <MDBCol md="10" lg="8" xl="6">
          <MDBCard>
            <MDBCardBody className="p-4">
              <div className="d-flex flex-start w-100">
                <MDBCardImage
                  className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                  alt="avatar"
                  width="65"
                  height="65"
                />

                <div className="w-100">
                  <MDBTypography tag="h5">Add a comment</MDBTypography>
                  <div>
                    <a href="">
                      <MDBIcon far icon="star text-danger me-1" />
                      <MDBIcon far icon="star text-danger me-1" />
                      <MDBIcon far icon="star text-danger me-1" />
                      <MDBIcon far icon="star text-danger me-1" />
                      <MDBIcon far icon="star text-danger me-1" />
                    </a>
                  </div>
                  <MDBTextArea label="What is your view?" rows={4} />

                  <div className="d-flex justify-content-between mt-3">
                    <MDBBtn color="success">Danger</MDBBtn>
                    <MDBBtn color="danger">
                      Send <MDBIcon fas icon="long-arrow-alt-right ms-1" />
                    </MDBBtn>
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
  );
};

export default Details;
{
  /*  {localStorage.getItem("loggedUserId")==commenterId ?  <><button  onClick={deleteReview}><TiDelete/></button><button  onClick={deleteReview}><RxUpdate/></button></>
         :""} */
}


/*  <div className="Details">
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
        </>
      )}
      <button className="btn" onClick={handleClick}>
        Enter
      </button>
    </div> */