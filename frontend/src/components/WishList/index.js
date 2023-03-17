import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
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
    <div>
      <h4 className="my-3">Wishlist</h4>
      <div className="row g-3">
        {wishList &&
          wishList.map((product, idx) => {
            return (
              <MDBCard
                key={product._id}
                style={{
                  maxWidth: "18rem",
                  margin: "2rem",
                  paddingTop: "1rem",
                }}
              >
                <MDBCardImage
                  src={product.image}
                  position="top"
                  alt="..."
                  id={product._id}
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
    </div>
  );
};

export default WishList;
