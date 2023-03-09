import React, { useState, useEffect, useContext } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { CgDollar } from "react-icons/cg";

const WishList = () => {
    const [wishList, setwishList] = useState()
    useEffect(()=>{
        setwishList(JSON.parse(localStorage.getItem("fav")))
         
      },[])
    console.log(wishList)
  return (
    <div>
<h4 className="my-3">Wishlist</h4>
<div className="row g-3">
          {wishList && wishList.map((product, idx) => {
            return (
                <MDBCard style={{ maxWidth: "18rem", margin:"2rem",paddingTop:"1rem"}}>
                <MDBCardImage src={product.image} position='top' alt='...'  />
                <MDBCardBody>
                  <MDBCardTitle style={{ textAlign: "center"}}>{product.productName}</MDBCardTitle>
                  <MDBCardText>
                    <CgDollar/>{product.price}
                  </MDBCardText>
                  <MDBBtn >Remove</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            );
          })}
    </div>
    </div>
   
  )
}

export default WishList