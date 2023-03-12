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
      <MDBContainer className="p-4 pb-0">
        <form action="">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol size="auto" className="mb-4 mb-md-0">
              <p className="pt-2">
                <strong>
                  <Link style={{ color: "white" }} to="/register">
                    Sign up & get 10% off your next order
                    <TbArrowBigRight />
                  </Link>
                </strong>
              </p>
            </MDBCol>
            <section  className='bg-dark text-center text-white'> <BsFacebook className="me-2"/> <GrInstagram className="me-2"/>  </section> 
             
           
            <MDBCol size="auto" className="mb-4 mb-md-0"></MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >Copyright
        &copy; {new Date().getFullYear()}  MDBootstrap.
      </div>
    </MDBFooter>
  );
};

export default Footer;
