import React from 'react';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2>We're here to assist you!</h2>
      <p>Get in touch with our team through the following methods:</p>

      <h3>Support Email</h3>
      <p>
        Have any questions or need assistance? Drop us an email at <a href="mailto:help@libraryhubapp.com">help@libraryhubapp.com</a>. Our support team is dedicated to providing quick and helpful responses.
      </p>

      <h3>Snail Mail</h3>
      <p>
        Prefer sending letters? You can reach us at:
      </p>
      <address>
        Library Hub<br />
        789 Bookshelf Avenue<br />
        Noveltown, MB A1A 1A1<br />
        Booktopia
      </address>

      <p>
        For any inquiries or support needs, feel free to reach out using the above contact information. We look forward to hearing from you!
      </p>
    </div>
  );
};

export default ContactUs;
