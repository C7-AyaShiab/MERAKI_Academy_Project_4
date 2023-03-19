import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit";
import { CgDollar } from "react-icons/cg";

const WishList = () => {
  const navigate = useNavigate();

  const [wishList, setwishList] = useState();
  useEffect(() => {
    setwishList(JSON.parse(localStorage.getItem("fav")));
  }, []);
  let fav = JSON.parse(localStorage.getItem("fav")) || [];
  const deleteFromWish = (e) => {
    console.log(e.target.id);
    const id = e.target.id;
    fav = fav.filter((product, i) => {
      return product._id != id;
    });
    localStorage.setItem("fav", JSON.stringify(fav));
    setwishList(JSON.parse(localStorage.getItem("fav")));
  };

  const handleClick = (e) => {
    let id = e.target.id;
    navigate(`/${id}`);
  };
  return (
    <MDBContainer className="py-5 h-100">
      <div
        className="d-flex justify-content-between align-items-center mb-2"
        style={{ width: "200px", marginLeft: "3rem" }}
      >
        <h3>Wishlist</h3>
      </div>
      <div className="wish row">
        {wishList &&
          wishList.map((product, idx) => {
            return (
              <MDBCard
                key={product._id}
                style={{
                  maxWidth: "20rem",
                  marginLeft: "4rem",
                  marginBottom: "2rem",
                  marginRight: "2rem",
                  paddingTop: "1rem",
                }}
              >
                <MDBCardImage
                  src={product.image}
                  position="top"
                  alt="..."
                  id={product._id}
                  style={{
                    maxWidth: "18rem",
                  }}
                  onClick={handleClick}
                />
                <MDBCardBody>
                  <MDBCardTitle style={{ textAlign: "center" }}>
                    {product.productName}
                  </MDBCardTitle>
                  <MDBCardText>
                    <CgDollar />
                    {product.price}
                  </MDBCardText>
                  <MDBBtn id={product._id} onClick={deleteFromWish}>
                    Remove
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            );
          })}
      </div>
    </MDBContainer>
  );
};

export default WishList;
