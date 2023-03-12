import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../../App";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
 
import "./style.css";

const Details = () => {
  const [product, setProduct] = useState();
  const [review, setReview] = useState([]);
  const {loggedUserId, setloggedUserId } =
  useContext(ProductContext);
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

const handleClick=(e)=>{

    console.log(id)
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
        console.log(res)
        setReview([...review, res.data.review]);

        product.review.push(res.data.review);
         
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

 


  return (
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
              <span>Price:</span>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="12"
                fill="currentColor"
                className="bi bi-currency-dollar"
                viewBox="0 0 16 16"
              >
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
              </svg>
              {product.price}
            </p>
            <p>
              <span>Description:</span> {product.description}
            </p>
          </div>
          <div className="comment-section">
          {product.review.map((review,i)=>{
              return <div className="comment" key={i}><h4>{review.user}</h4><p>{review.review}</p></div>
            })}
            <input placeholder="Add a review" onChange={(e) => {
                  setReview(e.target.value);
                  
                }}/>
            <br></br>
            <button  onClick={handleClick}>Enter</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
 {/*  {localStorage.getItem("loggedUserId")==commenterId ?  <><button  onClick={deleteReview}><TiDelete/></button><button  onClick={deleteReview}><RxUpdate/></button></>
         :""} */}