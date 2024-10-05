import { FaLocationDot } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="section-wrapper flex-center">
      <div className="space-y-5">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold">Contact Us</h2>
          <p className="text-lg">
            Get in touch with us for any inquiries or support. We're here to
            help and would love to hear from you."
          </p>
        </div>

        <form className="space-y-1">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Enter you name"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Enter you email"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full pb-3">
            <div className="label">
              <span className="label-text">Message</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 "
              placeholder="Enter your message"
            ></textarea>
          </label>
          <button type="submit" className="btn btn-primary text-[white]">
            Get Started
          </button>
        </form>

        <ul className="contact-list">
          <li>
            <span>
              <FaLocationDot />
            </span>
            Kathmandu, Nepal
          </li>
          <li>
            <span>
              <MdMail />
            </span>
            <a href="">example@mail.com</a>
          </li>
          <li>
            <span>
              <FaPhoneAlt />
            </span>
            <a href="">98 12345678</a>
          </li>
        </ul>
      </div>
    </section>
  );
};

// "Get in touch with us for any inquiries or support. We're here to help and would love to hear from you."

/*
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">What is your name?</span>
    <span className="label-text-alt">Top Right label</span>
  </div>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
  <div className="label">
    <span className="label-text-alt">Bottom Left label</span>
    <span className="label-text-alt">Bottom Right label</span>
  </div>
</label>
*/

export default ContactUs;
