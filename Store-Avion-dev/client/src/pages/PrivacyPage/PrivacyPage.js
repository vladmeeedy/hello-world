import React from 'react'
import styles from './PrivacyPage.module.scss'

const PrivacyPage = () => {
  return (
    <div className={styles.privacyContainer} data-testid="privacy-container">
      <div className={styles.privacyBanner} data-testid="privacy-banner">
        <h1 className={styles.privacyHeader} data-testid="privacy-header">
          We care about your privacy
        </h1>
        <p className={styles.privacyTexts} data-testid="privacy-texts">
          Your privacy is important to us at Avion. We respect your privacy
          regarding any information we may collect from you across our website.
        </p>
      </div>

      <div className={styles.termsSection} data-testid="terms-section">
        <h2 className={styles.subHeader} data-testid="sub-header">
          TERMS AND CONDITIONS
        </h2>
        <p className={styles.texts} data-testid="texts">
          The following terms of sale and delivery apply to all purchases made
          in Avion stores and on our website, which are delivered to all regions
          of Ukraine. All purchase agreements in Avion stores and on the website
          are made in English. The minimum age for individuals who have the
          right to purchase in Avion stores and on our website is 18 years old.
        </p>
        <p
          className={styles.registrationTexts}
          data-testid="registration-texts"
        >
          Company Registration Number: 37642136 <br />
          Individual Tax Identification Number: 376421326504
        </p>
        <p className={styles.texts} data-testid="texts">
          We pay significant attention to customer protection on our website.
          Avion company controls all Avion websites and is responsible for all
          related data. We comply with all provisions of the `Personal Data
          Protection Law` and the European Data Protection Regulation since
          2018.
        </p>

        <h3 className={styles.sectionHeader} data-testid="section-header">
          Your Rights
        </h3>
        <ul className={styles.list} data-testid="list">
          <li>
            File a complaint with the supervisory authority (e.g., the
            Authorized Representative of the Verkhovna Rada of Ukraine for Human
            Rights).
          </li>
          <li>Request correction or deletion of personal data.</li>
          <li>Restrict or refuse the processing of personal data.</li>
          <li>If necessary, request a copy of your personal data.</li>
        </ul>

        <h3 className={styles.sectionHeader} data-testid="section-header">
          Data Collection
        </h3>
        <ul className={styles.list} data-testid="list">
          <li>When visiting and purchasing on our website.</li>
          <li>In our stores or by phone.</li>
          <li>When participating in surveys, competitions, or promotions.</li>
          <li>When creating a user profile on Avion.</li>
          <li>When leaving a review of our products.</li>
        </ul>

        <h3 className={styles.sectionHeader} data-testid="section-header">
          Information We Collect
        </h3>
        <ul className={styles.list} data-testid="list">
          <li>Email address</li>
          <li>Name</li>
          <li>Address</li>
          <li>Phone number</li>
          <li>Email mailbox address</li>
          <li>IP address from which you place orders</li>
        </ul>

        <h3 className={styles.sectionHeader} data-testid="section-header">
          Purpose of Data Processing
        </h3>
        <ul className={styles.list} data-testid="list">
          <li>
            The necessity of fulfilling a contract of which the data subject is
            a party (e.g., purchasing on our website).
          </li>
          <li>
            Processing is necessary for compliance with legal obligations
            imposed on Avion (e.g., compliance with accounting regulations).
          </li>
          <li>
            Processing is necessary for the purposes of legitimate interests
            pursued by Avion (e.g., internal business purposes, such as
            expanding our website or improving our services and products or
            detecting fraud).
          </li>
        </ul>

        <h3 className={styles.sectionHeader} data-testid="section-header">
          Use of Your Data
        </h3>
        <p className={styles.texts} data-testid="texts">
          The customer`s email address is only used as a tool for order
          fulfillment. To receive email newsletters, the customer must provide
          their consent. We do not use customer-provided phone numbers to make
          calls regarding our offers. Phone calls are only possible in case of
          order issues or when information regarding delivery is needed.
        </p>
        <p className={styles.texts} data-testid="texts">
          Your personal data may be used in the event of a police investigation,
          as we report fraudulent payments to the police. We provide data about
          the account and other personal information when necessary to comply
          with applicable laws and prevent theft or fraud, such as credit card
          fraud.
        </p>
        <p className={styles.texts} data-testid="texts">
          Avion only shares personal data with relevant carriers associated with
          delivery and does not disclose, sell, or provide access to your
          personal information to third parties, including other companies.
        </p>
        <p className={styles.texts} data-testid="texts">
          We will retain your personal data only as long as necessary for the
          purposes described in this Privacy Policy. Retention periods depend on
          the type of data and the reason for collecting and storing your data.
          We constantly review our retention terms, taking into account our
          reasons for processing your personal data and the legal basis for
          doing so.
        </p>

        <h3 className={styles.sectionHeader} data-testid="section-header">
          Payment on Avion
        </h3>
        <p className={styles.texts} data-testid="texts">
          Payments on our website are made through a secure connection that
          prevents unauthorized access by third parties to customer payment
          information.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPage
