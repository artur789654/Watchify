import { Link } from "react-router-dom";

const TermsOfService: React.FC = () => {
  return (
    <div className="container my-3 mx-auto p-6 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-inherit space-y-8">
      <h1 className="font-bold text-4xl mb-6">Terms Of Service</h1>
      <section className="bg-light-primary dark:bg-dark-primary p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">1. Introduction</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Welcome to Wachify! These Terms of Service ("Terms") govern your use
          of our website and services. By accessing or using Wachify, you agree
          to be bound by these Terms. If you do not agree with any part of these
          Terms, please do not use our site.
        </p>
      </section>
      <section className="p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">2. Acceptance of Terms</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          By accessing and using Wachify, you agree to comply with and be bound
          by these Terms. Your continued use of the site signifies your
          acceptance of any changes to these Terms.
        </p>
      </section>
      <section className="bg-light-primary dark:bg-dark-primary p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">3. Use of the Website</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Wachify provides a platform to watch movies and TV series. You may use
          our site for personal, non-commercial purposes only. You agree not to
          use the site for any unlawful activities or in any manner that could
          damage, disable, or impair the site.
        </p>
      </section>
      <section className="p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">
          4. Intellectual Property Rights
        </h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          All content on Wachify, including but not limited to text, graphics,
          logos, and images, is the property of Wachify or its licensors and is
          protected by copyright, trademark, and other intellectual property
          laws. You may not use, reproduce, or distribute any content from
          Wachify without explicit permission.
        </p>
      </section>
      <section className="bg-light-primary dark:bg-dark-primary p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">5. Limitation of Liability</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Wachify strives to provide accurate and reliable information, but we
          do not guarantee the accuracy or completeness of any content. We are
          not liable for any damages or losses resulting from the use of or
          inability to use our site.
        </p>
      </section>
      <section className="p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">6. Privacy Policy</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Your privacy is important to us. Please review our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link> to understand how we
          collect, use, and protect your personal information.
        </p>
      </section>
      <section className="bg-light-primary dark:bg-dark-primary p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">7. Changes to Terms</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Wachify may update these Terms from time to time. We will notify you
          of any changes by posting the new Terms on our site. It is your
          responsibility to review these Terms periodically for any updates.
        </p>
      </section>
      <section className="p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">8. Contact Information</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          For any questions or concerns about these Terms, please{" "}
          <Link
            to="/contact"
            className="font-semibold text-light-link-main hover:text-light-link-hover dark:text-dark-link-main dark:hover:text-dark-link-hover inline-block transform transition-transform duration-300 hover:scale-105"
            aria-label="Contact page">
            contact us
          </Link>{" "}
          at:
        </p>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          {" "}
          Email:{" "}
          <a
            href="mailto:contact@website.com"
            className="hover:underline"
            aria-label="Contact Email">
            contact@website.com
          </a>
        </p>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          {" "}
          Phone:{" "}
          <a
            href="tel:+380999999999"
            className="hover:underline"
            aria-label="Contact Phone">
            +(380) 99-999-99-99
          </a>
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
