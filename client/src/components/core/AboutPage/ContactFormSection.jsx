import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

function ContactFormSection() {
  return (
    <div className="mx-auto w-11/12 max-w-[600px] text-center">
      <h2 className="text-4xl font-semibold text-richBlack-5">Get in Touch</h2>
      <p className="mt-3 text-richBlack-300">
        We'd love to here for you, Please fill out this form.
      </p>
      <ContactUsForm />
    </div>
  );
}

export default ContactFormSection;
