import { base_url } from "./config";

export function getClientToken(setClientToken,setDropinInstance,braintree,totalPrice){
    fetch(`${base_url}/checkouts/`)
    .then((response) => response.json())
    .then((data) => {
      setClientToken(data.clientToken);

      braintree.create({
        authorization: data.clientToken,
        container: "#dropin-container",
        googlePay: {
            googlePayVersion: 2,
            merchantId: 'BCR2DN6T4XSJHRJL',
            transactionInfo: {
              totalPriceStatus: 'FINAL',
              totalPrice: totalPrice.toString(),
              currencyCode: 'USD',
            },
        },
        paypal: {
            flow: 'checkout',
            amount: totalPrice,
            currency: 'USD',
          },
          applePay: {
            displayName: 'My Store',
            paymentRequest: {
              total: {
                label: 'My Store',
                amount: totalPrice
              },
           
            }
        },
        card: {
            cardholderName: {
              required: false
              // to make cardholder name required
              // required: true
            }
          }
          
      }, (createErr, instance) => {console.log(instance)
        setDropinInstance(instance);
      });
    });
}