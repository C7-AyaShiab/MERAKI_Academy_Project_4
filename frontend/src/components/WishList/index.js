import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer
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
      
      <h4 className="my-3">Wishlist</h4>
      <div className="row" style={{ marginLeft:"25px",marginRight:"0px", marginTop:"5px"}}>
        {wishList &&
          wishList.map((product, idx) => {
            return (
              <MDBCard 
                key={product._id}
                style={{
                  maxWidth: "18rem",
                  margin: "2rem",
                  marginRight:"2rem",
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
    </MDBContainer>
  );
};

export default WishList;
