import { useEffect } from 'react';

const SquarePayment = () => {
  const appId = 'sandbox-sq0idb-wsqC4D3DFHA27GWQ3XHpPQ';
  const locationId = 'EAAAEBVbUSJyLbvyn6QnA9TuTZD-7Aa3ovR6CEGA2wf0RGxnqokDdxLU6Xcxtfsk';

  useEffect(() => {
    // Define async function outside of useEffect hook.
    // This allows us to pass the function as a parameter to the click event listener.
    async function handlePaymentMethodSubmission(payments, event, paymentMethod) {
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
    }

    async function initializeSquarePayments() {
      // Check if Square.js has loaded properly before initializing payments.
      if (!window.Square) {
        throw new Error('Square.js failed to load properly');
      }

      let payments;
      try {
        payments = window.Square.payments(appId, locationId);
      } catch (error) {
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
        document
          .getElementById('google-pay-button')
          .addEventListener('click', async function (event) {
            await handlePaymentMethodSubmission(payments, event, googlePay);
          });
      } catch (e) {
        console.error('Initializing Google Pay failed', e);
        // There are a number of reasons why Google Pay may not be supported
        // (e.g. Browser Support, Device Support, Account). Therefore, you should handle
        // initialization failures while still loading other applicable payment methods.
      }
    }

    // Required in SCA Mandated Regions: Learn more at https://developer.squareup.com/docs/sca-overview
    async function verifyBuyer(payments, token) {
      const verificationDetails = {
        amount: '1.00',
        billingContact: {
          addressLines: ['123 Main Street', 'Apartment 1'],
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

      const verificationResults = await payments.verifyBuyer(token, verificationDetails);
      return verificationResults.token;
    }

    // status is either SUCCESS or FAILURE;
    function displayPaymentResults(status) {
      const statusContainer = document.getElementById('payment-status-container');
      if (status === 'SUCCESS') {
        statusContainer.classList.remove('is-failure');
        statusContainer.classList.add('is-success');
      } else {
        statusContainer.classList.remove('is-success

        < ========================>






        statusContainer.classList.add('is-failure');
      }

      statusContainer.style.visibility = 'visible';
    }

    // Add your code for Square payment here
  }, []);


  useEffect(() => {
    async function handlePaymentMethodSubmission(payments, event, paymentMethod) {
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
    }

    if (!window.Square) {
      throw new Error('Square.js failed to load properly');
    }

    let payments;
    try {
      payments = window.Square.payments(appId, locationId);
    } catch {
      const statusContainer = document.getElementById('payment-status-container');
      statusContainer.className = 'missing-credientials';
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
      document
        .getElementById('google-pay-button')
        .addEventListener('click', async function (event) {
          await handlePaymentMethodSubmission(payments, event, googlePay);
        });
    } catch (e) {
      console.error('Initializing Google Pay failed', e);
      // There are a number of reason why Google Pay may not be supported
      // (e.g. Browser Support, Device Support, Account). Therefore you should handle
      // initialization failures, while still loading other applicable payment methods.
    }

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
          errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
        }

        throw new Error(errorMessage);
      }
    }
  }, [appId, locationId]);

      <=-=======================>
  
      // Required in SCA Mandated Regions: Learn more at https://developer.squareup.com/docs/sca-overview
      async function verifyBuyer(payments, token) {
        const verificationDetails = {
          amount: '1.00',
          billingContact: {
            addressLines: ['123 Main Street', 'Apartment 1'],
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
      
        const verificationResults = await payments.verifyBuyer(token, verificationDetails);
        return verificationResults.token;
      }
      
      function displayPaymentResults(status) {
        const statusContainer = document.getElementById('payment-status-container');
        if (status === 'SUCCESS') {
          statusContainer.classList.remove('is-failure');
          statusContainer.classList.add('is-success');
        } else {
          statusContainer.classList.remove('is-success');
          statusContainer.classList.add('is-failure');
        }
      
        statusContainer.style.visibility = 'visible';
      }
      
      async function handlePaymentMethodSubmission(payments, event, paymentMethod) {
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
      }
      
      function App() {
        const [payments, setPayments] = useState(null);
      
        useEffect(() => {
          async function initializePayments() {
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
      
              setPayments(payments);
            } catch (e) {
              console.error('Initializing Google Pay failed', e);
              // There are a number of reason why Google Pay may not be supported
              // (e.g. Browser Support, Device Support, Account). Therefore you should handle
              // initialization failures, while still loading other applicable payment methods.
            }
          }
      
          initializePayments();
        }, []);
      
        return (
          <div>
            <form id="payment-form">
              <div id="google-pay-button"></div>
            </form>
            <div id="payment-status-container"></div>
          </div>
        );
      }    
      