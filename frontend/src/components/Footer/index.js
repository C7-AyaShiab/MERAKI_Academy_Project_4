import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
} from "mdb-react-ui-kit";
import { TbArrowBigRight } from "react-icons/tb";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
const Footer = () => {
  return (
    <MDBFooter bgColor="dark" className="text-center text-white text-lg-left">
      <MDBContainer className="p-4 pb-0" style={{height:"210px", paddingTop:"0px"}}>
        <form action="">
          <MDBRow
            className="d-flex justify-content-center"
            style={{ marginBottom: "0px" }}
          >
            <MDBCol
              className="mb-3 mb-md-0"
              style={{ marginBottom: "0px", padding: "0px" }}
            >
              <p className="pt-2" style={{ marginBottom: "0px", padding: "0px" }}>
                <strong>
                  <Link style={{ color: "white" }} to="/register">
                    Sign up & get 10% off your next order
                    <TbArrowBigRight />
                  </Link>
                </strong>
              </p>
              <img
                src="./logo.gif"
                style={{ height: "150px", width: "150px", paddingLeft: "0px" }}
                alt="This will display an animated GIF"
              />
            </MDBCol>

            {/* <BsFacebook className="me-2"/> <GrInstagram className="me-2"/>   */}

            <MDBCol size="auto" className="mb-4 mb-md-0"></MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)"}}
      >
        Copyright &copy; {new Date().getFullYear()} <span style={{ fontFamily:"Niconne" ,fontWeight:"50"}}>Shopping Spot.</span> 
      </div>
    </MDBFooter>
  );
};

export default Footer;
