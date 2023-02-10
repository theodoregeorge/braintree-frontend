import '../App.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from "react";
import braintree from "braintree-web-drop-in";
import { getClientToken } from "../api";
import {Col, Container, Input, Row, Button} from "reactstrap";



function PaymentForm() {
  const [clientToken, setClientToken] = useState(null);
  const [dropinInstance, setDropinInstance] = useState(null);
  const [numberOfProducts, setNumberOfProducts] = useState(1);
  const PRICE = 50;

  useEffect(() => {

  }, []);

  const getUI=()=>{
    getClientToken(setClientToken,setDropinInstance,braintree,numberOfProducts * PRICE)
  }

  const handlePayment = () => {
    console.log(dropinInstance)
    dropinInstance?.requestPaymentMethod((requestPaymentMethodErr, payload) => {
        payload.threeDSecure = true;
        console.log(payload.nonce)
      fetch("http://localhost:8080/submit", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodNonce: payload.nonce,
          amount: numberOfProducts * PRICE,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Payment successful");
          } else {
            console.error("Payment failed");
          }
        });
    });
  };

  return (!clientToken?(
    <div>
      <Container>
        <Col>
          <Row className={"productHeaderRow"}>
            <Col xs={4} > {"Product"}
            </Col>
            <Col xs={2} className={"text-center"} > {"Price"}
            </Col><Col xs={2} className={"text-center"} > {"Quantity"} </Col> 
            <Col xs={2} className={"text-center"} > {"Total"}
            </Col> <Col xs={2} /> 
          </Row>
          <Row className={"productInfoRow"} >
            <Col xs={4} className={"productInfoColumn"} > {"product"}
            </Col> 
            <Col xs={2} className={"productInfoColumnCenter"} > {`$ ${PRICE}`} 
            </Col>
            <Col xs={2} className={"productInfoColumnCenter"} > 
              <Input placeholder="0" min={1} max={100} type="number" step="1" value={numberOfProducts} onChange={((e) => { setNumberOfProducts(e.target.value) })} /> 
            </Col>
            <Col xs={2} className={"productInfoColumnCenter"} > {`$ ${numberOfProducts * PRICE}`}
            </Col> <Col xs={2} className={"productInfoColumnCenter"} >
              <Button onClick={() => { getUI() }} > {"Go to Checkout"}
              </Button> 
            </Col> 
          </Row> 
        </Col> 
      </Container>
     </div>) : 
    (
      <div> 
        <div id="dropin-container"></div>
        <button onClick={handlePayment}>Pay</button>
      </div>
    )
  );
}

export default PaymentForm;
