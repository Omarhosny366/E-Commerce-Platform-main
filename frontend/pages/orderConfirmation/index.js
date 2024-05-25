// pages/orderConfirmation.js

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/footerr';
import styles from '../../styles/orderConfirmation.module.css';

const OrderConfirmationPage = () => {
  const router = useRouter();
  const { orderNumber } = router.query;

  // Placeholder for fetched email
  const userEmail = "user@example.com";

  useEffect(() => {
    // Redirect to payment iframe after 3 seconds
    const paymentUrl = 'https://accept.paymob.com/api/acceptance/iframes/847842?payment_token=ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqb3hOemswTWpJeExDSmhiVzkxYm5SZlkyVnVkSE1pT2pFd01Dd2lZM1Z5Y21WdVkza2lPaUpGUjFBaUxDSnBiblJsWjNKaGRHbHZibDlwWkNJNk5EVTRNRE0yTWl3aWIzSmtaWEpmYVdRaU9qSXhNVGt6T0RZM055d2lZbWxzYkdsdVoxOWtZWFJoSWpwN0ltWnBjbk4wWDI1aGJXVWlPaUpEYkdsbVptOXlaQ0lzSW14aGMzUmZibUZ0WlNJNklrNXBZMjlzWVhNaUxDSnpkSEpsWlhRaU9pSkZkR2hoYmlCTVlXNWtJaXdpWW5WcGJHUnBibWNpT2lJNE1ESTRJaXdpWm14dmIzSWlPaUkwTWlJc0ltRndZWEowYldWdWRDSTZJamd3TXlJc0ltTnBkSGtpT2lKS1lYTnJiMnh6YTJsaWRYSm5hQ0lzSW5OMFlYUmxJam9pVlhSaGFDSXNJbU52ZFc1MGNua2lPaUpEVWlJc0ltVnRZV2xzSWpvaVkyeGhkV1JsZEhSbE1EbEFaWGhoTG1OdmJTSXNJbkJvYjI1bFgyNTFiV0psY2lJNklpczROaWc0S1RreE16VXlNVEEwT0RjaUxDSndiM04wWVd4ZlkyOWtaU0k2SWpBeE9EazRJaXdpWlhoMGNtRmZaR1Z6WTNKcGNIUnBiMjRpT2lKT1FTSjlMQ0pzYjJOclgyOXlaR1Z5WDNkb1pXNWZjR0ZwWkNJNlptRnNjMlVzSW1WNGRISmhJanA3ZlN3aWMybHVaMnhsWDNCaGVXMWxiblJmWVhSMFpXMXdkQ0k2Wm1Gc2MyVXNJbVY0Y0NJNk1UY3hOall3T1RRd09Dd2ljRzFyWDJsd0lqb2lNVFUwTGpFM05pNDVOaTR5TXpNaWZRLktqT3ZIRU9tMlZzLUtyVF81M3pBMlNwQ1JIdTZWX0NpR293eU9lekloUzNVRDlhU20wc05OZ2JYLUVnNXkyU3hLdjVtWkptNHZkQXA0SFBLS0x2NDJB';
    setTimeout(() => {
      router.push(paymentUrl);
    }, 10);
  }, [router]);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.message}>
          <h2>Congratulations!</h2>
          <p>Your order {orderNumber} has been placed successfully!</p>
          <p>Order details have been sent to the email</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
