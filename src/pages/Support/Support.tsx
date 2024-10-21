import { Link } from "react-router-dom";

const Support: React.FC = () => {
  return (
    <div className="container mx-auto p-6 m-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md">
      <h1 className="text-3xl text-center">Support</h1>

      <p className="my-6 text-lg">
        Welcome to our Support page. We’re here to help you with any issues or
        questions you may have. Below, you'll find different ways to get in
        touch with us. Whether it's technical difficulties, account-related
        questions, or feedback, we’re ready to assist you.
      </p>

      <div className="space-y-6 text-start text-light-text-secondary dark:text-dark-text-secondary">
        <div className="bg-light-primary dark:bg-dark-primary rounded-md shadow-md p-4 space-y-4">
          <h2 className="text-center text-xl font-semibold text-light-text-main dark:text-dark-text-main">
            Email Support
          </h2>
          <p className="mb-2">
            If you have non-urgent inquiries or prefer communicating via email,
            feel free to send us a message at:
          </p>
          <p>
            <a
              href="mailto:support@example.com"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
              contact@website.com
            </a>
          </p>
          <p className="mt-2">
            Our support team typically responds within 24-48 hours. Please
            include as much detail as possible about your issue to help us
            assist you quickly.
          </p>
        </div>

        <div className="bg-light-primary dark:bg-dark-primary rounded-md shadow-md p-4 space-y-4">
          <h2 className="text-center text-xl font-semibold text-light-text-main dark:text-dark-text-main">
            Phone Support
          </h2>
          <p className="mb-2">
            For immediate assistance, you can contact us by phone. Our customer
            support representatives are available Monday through Friday from
            9:00 AM to 6:00 PM.
          </p>
          <p>
            <a
              href="tel:+380999999999"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
              +(380) 99-999-99-99
            </a>
          </p>
          <p className="mt-2">
            Please have your account information ready to speed up the process.
            If calling outside business hours, you can leave a voicemail, and
            we’ll get back to you the next business day.
          </p>
        </div>

        <div className="bg-light-primary dark:bg-dark-primary rounded-md shadow-md p-4 space-y-4">
          <h2 className="text-center text-xl font-semibold text-light-text-main dark:text-dark-text-main">
            Help Center
          </h2>
          <p className="mb-2">
            Our Help Center contains a comprehensive collection of FAQs, guides,
            and tutorials that cover common questions and issues. You can browse
            through the topics or use the search bar to find quick answers.
          </p>
          <p>
            Visit our{" "}
            <Link
              to="/faqs"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
              Help Center
            </Link>{" "}
            for more resources.
          </p>
        </div>

        <div className="bg-light-primary dark:bg-dark-primary rounded-md shadow-md p-4 space-y-4">
          <h2 className="text-center text-xl font-semibold text-light-text-main dark:text-dark-text-main">
            Social Media Support
          </h2>
          <p className="mb-2">
            You can also reach us via our social media channels. Follow us on
            Twitter, Facebook, or Instagram to stay updated on the latest news
            and contact our team directly through messaging.
          </p>
          <p>
            Visit our{" "}
            <a
              href="https://twitter.com/website"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
              Twitter
            </a>
            ,{" "}
            <a
              href="https://web.telegram.org/"
              aria-label="Telegram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
              Telegram
            </a>
            ,{" "}
            <a
              href="https://facebook.com/website"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
              Facebook
            </a>
            , or{" "}
            <a
              href="https://instagram.com/website"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover">
              Instagram
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
