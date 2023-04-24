import React, { useState } from 'react';

function Payment() {
  const [appId] = useState('sandbox-sq0idb-wsqC4D3DFHA27GWQ3XHpPQ');
  const [locationId] = useState('EAAAEBVbUSJyLbvyn6QnA9TuTZD-7Aa3ovR6CEGA2wf0RGxnqokDdxLU6Xcxtfsk');

  async function createPayment(token, verificationToken) {
    const body = JSON.stringify({
      locationId,
      sourceId: token,
      verificationToken,
    });

    const paymentResponse = await fetch('/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (paymentResponse.ok) {
      return paymentResponse.json();
    }

    const errorBody = await paymentResponse.text();
    throw new Error(errorBody);
  }

  async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === 'OK') {
      return tokenResult.token;
    } else {
      let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
      if (tokenResult.errors) {
        errorMessage += ` and errors: ${JSON.stringify(
          tokenResult.errors
        )}`;
      }

      throw new Error(errorMessage);
    }
  }

  // Required in SCA Mandated Regions: Learn more at https://developer.squareup.com/docs/sca-overview
  async function verifyBuyer(payments, token) {
    const verificationDetails = {
      amount: '1.00',
      billingContact: {
        addressLines: ['123 Main Street', 'Apartment'],
        familyName: 'Doe',
        givenName: 'John',
        email: 'john.doe@square.example',
        country: 'GB',
        phone: '3214563987',
        region: 'LND',
        city: 'London',
      },
      currencyCode: 'GBP',
      intent: 'CHARGE',
    };
    const verificationResults = await payments.verifyBuyer(
      token,
      verificationDetails
    );
    return verificationResults.token;
  }
    const displayPaymentResults = (status) => {
        const statusContainer = document.getElementById('payment-status-container');
        if (status === 'SUCCESS') {
          statusContainer.classList.remove('is-failure');
          statusContainer.classList.add('is-success');
        } else {
          statusContainer.classList.remove('is-success');
          statusContainer.classList.add('is-failure');
        }
        statusContainer.style.visibility = 'visible';
      };
    
      const handlePaymentMethodSubmission = async (payments, event, paymentMethod) => {
        event.preventDefault();
    
        try {
          const token = await tokenize(paymentMethod);
          let verificationToken = await verifyBuyer(payments, token);
          const paymentResults = await createPayment(token, verificationToken);
          displayPaymentResults('SUCCESS');
    
          console.debug('Payment Success', paymentResults);
        } catch (e) {
          displayPaymentResults('FAILURE');
          console.error(e.message);
        }
      };
    
      useEffect(() => {
        const initSquarePayments = async () => {
          if (!window.Square) {
            throw new Error('Square.js failed to load properly');
          }
    
          let payments;
          try {
            payments = window.Square.payments(appId, locationId);
          } catch {
            const statusContainer = document.getElementById('payment-status-container');
            statusContainer.className = 'missing-credentials';
            statusContainer.style.visibility = 'visible';
            return;
          }
    
          try {
            const paymentRequest = payments.paymentRequest({
              countryCode: 'US',
              currencyCode: 'USD',
              total: {
                amount: '1.00',
                label: 'Total',
              },
            });
            const googlePay = await payments.googlePay(paymentRequest);
    
            await googlePay.attach('#google-pay-button');
            document.getElementById('google-pay-button').addEventListener('click', async function (event) {
              await handlePaymentMethodSubmission(payments, event, googlePay);
            });
          } catch (e) {
            console.error('Initializing Google Pay failed', e);
            // There are a number of reason why Google Pay may not be supported
            // (e.g. Browser Support, Device Support, Account). Therefore you should handle
            // initialization failures, while still loading other applicable payment methods.
          }
        };
    
        initSquarePayments();
      }, [appId, locationId]);
    
    return (
        <div>
          <form id="payment-form">
            <div id="google-pay-button"></div>
          </form>
          <div id="payment-status-container"></div>
        </div>
      );
}















       