import React, { useState } from 'react';
// import { SquarePaymentForm, GooglePayButton } from 'react-square-payment-form';
// import './react-square-payment-form/lib/default.css';
import styles from './Header.module.css';

function Header() {
  const [errorMessages, setErrorMessages] = useState([]);

  const cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    if (errors) {
      setErrorMessages(errors.map(error => error.message));
    } else {
      console.log('Nonce received:', nonce);
      console.log('Card data:', cardData);
      console.log('Buyer verification token:', buyerVerificationToken);
      // Send the nonce to your server to create a payment
    }
  };

  function buildPaymentRequest(payments) {
    return payments.paymentRequest({
      countryCode: 'US',
      currencyCode: 'USD',
      total: {
        amount: '1.00',
        label: 'Total',
      },
    });
  }

  document.addEventListener('DOMContentLoaded', async (payments) => {
    let googlePay;
    try {
      googlePay = await initializeGooglePay(payments);
    } catch (e) {
      console.error('Initializing Google Pay failed', e);
    }

    // if (googlePay !== undefined) {
    //   const googlePayButton = document.getElementById('google-pay-button');
    //   googlePayButton.addEventListener('click', async function (event) {
    //     await handlePaymentMethodSubmission(event, googlePay);
    //   });
    // }  
   
   
  });
 
  async function initializeGooglePay(payments) {
    const paymentRequest = buildPaymentRequest(payments)
 
    const googlePay = await payments.googlePay(paymentRequest);
    await googlePay.attach('#google-pay-button');
 
    return googlePay;
  }

  function payClickHandler(e) {
    console.log("Paid");
  }
 
 

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <h1>Wurdle</h1>
      </div>
      <div className={styles.header__links}>
        <a href="#">Project Features</a>
        <a href="#">Stack</a>
        <a href="#"></a>
      </div>
      {/* <form id="payment-form"> */}
{/* 
      <div id="google-pay-button"></div>
      <div id="card-container"></div>
      <button id="card-button" type="button" onClick={payClickHandler}>Pay $1.00</button>
      </form>
      <div id="payment-status-container"></div> */}










        {/* <SquarePaymentForm
          applicationId="YOUR_APPLICATION_ID"
          locationId="YOUR_LOCATION_ID"
          cardNonceResponseReceived={cardNonceResponseReceived}
          googlePay={{
            elementId: 'google-pay-button',
            buttonColor: 'white',
            buttonType: 'long',
            buttonSizeMode: 'fill',
            configuration: {
              gatewayMerchantId: 'YOUR_GATEWAY_MERCHANT_ID',
              merchantName: 'YOUR_MERCHANT_NAME',
            },
          }}
          createVerificationDetails={({ amount }) => ({
            amount: amount.toString(),
            currencyCode: 'USD',
          })}
          errorMessages={errorMessages}
        >
          <GooglePayButton id="google-pay-button" />
        </SquarePaymentForm> */}
    </header>
  );
}

export default Header;