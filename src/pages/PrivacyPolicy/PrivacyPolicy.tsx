import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container my-4 mx-auto p-6 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-inherit space-y-8">
      <h1 className="font-bold text-4xl mb-6">Privacy Policy</h1>

      <nav className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
        <ul className="list-decimal list-inside pl-5 text-start space-y-2 ">
          <li>
            <a
              href="#information"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover"
              tabIndex={0}
              aria-label="Information We Collect">
              Information We Collect
            </a>
          </li>
          <li>
            <a
              href="#usage"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover"
              tabIndex={0}
              aria-label="How We Use Your Information">
              How We Use Your Information
            </a>
          </li>
          <li>
            <a
              href="#third-party"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover"
              tabIndex={0}
              aria-label="Third-Party Sharing">
              Third-Party Sharing
            </a>
          </li>
          <li>
            <a
              href="#compliance"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover"
              tabIndex={0}
              aria-label="Data Protection Compliance">
              Data Protection Compliance
            </a>
          </li>
          <li>
            <a
              href="#rights"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover"
              tabIndex={0}
              aria-label="Your Rights">
              Your Rights
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="inline-block transform transition-transform duration-300 hover:scale-105 text-light-link-main dark:text-dark-link-main hover:text-light-link-hover hover:dark:text-dark-link-hover"
              tabIndex={0}
              aria-label="Contact Us">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>

      <section
        id="information"
        className="bg-light-primary dark:bg-dark-primary p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">1. Information We Collect</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          We collect various types of information from users of our streaming
          platform:
        </p>
        <ul className="list-disc list-inside pl-5">
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            Personal identification information (e.g., Name, email address,
            etc.)
          </li>
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            Viewing history and preferences (e.g., Movies and series watched,
            ratings, etc.)
          </li>
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            Device and usage data (e.g., IP address, browser type, etc.)
          </li>
        </ul>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          This information helps us provide you with a personalized and enhanced
          viewing experience.
        </p>
      </section>

      <section id="usage" className="p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">
          2. How We Use Your Information
        </h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          We use the collected information to:
        </p>
        <ul className="list-disc list-inside pl-5">
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            Provide personalized content recommendations based on your viewing
            history.
          </li>
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            Improve the platform's user experience through data-driven insights.
          </li>
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            Send updates, newsletters, and promotional offers directly to your
            email.
          </li>
        </ul>
      </section>

      <section
        id="third-party"
        className="p-6 rounded-md space-y-4 text-start bg-light-primary dark:bg-dark-primary">
        <h2 className="text-3xl font-semibold">3. Third-Party Sharing</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          We may share your information with third parties under specific
          circumstances:
        </p>
        <ul className="list-disc list-inside pl-5">
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            With content partners to analyze and recommend movies and series
            that match your interests.
          </li>
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            With payment processors to handle your subscription and transactions
            securely.
          </li>
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            To comply with legal obligations or protect our rights and
            interests.
          </li>
        </ul>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          We ensure that any third-party sharing complies with the relevant data
          protection laws.
        </p>
      </section>

      <section id="compliance" className="p-6 rounded-md space-y-4 text-start">
        <h2 className="text-3xl font-semibold">
          4. Data Protection Compliance
        </h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          We adhere to the GDPR, CCPA, and other applicable data protection laws
          to ensure the security and privacy of your personal data.
        </p>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Our practices include regular audits and updates to comply with
          evolving regulations and industry standards.
        </p>
      </section>

      <section
        id="rights"
        className="p-6 rounded-md space-y-4 text-start bg-light-primary dark:bg-dark-primary">
        <h2 className="text-3xl font-semibold">5. Your Rights</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Under GDPR and CCPA, you have the following rights:
        </p>
        <ul className="list-disc list-inside pl-5">
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            Right to access your data and obtain a copy.
          </li>
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            Right to rectify any inaccuracies in your data.
          </li>
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            Right to request the deletion of your data (right to be forgotten).
          </li>
          <li className="text-light-text-secondary dark:text-dark-text-secondary">
            Right to object to data processing or request data portability.
          </li>
        </ul>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          To exercise any of these rights, please contact us at the information
          provided below.
        </p>
      </section>

      <section
        id="contact"
        className="p-6 rounded-md space-y-4 text-start border-b-light-block-border">
        <h2 className="text-3xl font-semibold">6. Contact Us</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          If you have any questions, concerns, or requests related to this
          Privacy Policy, please{" "}
          <Link
            to="/contact"
            className="font-semibold text-light-link-main hover:text-light-link-hover dark:text-dark-link-main dark:hover:text-dark-link-hover inline-block transform transition-transform duration-300 hover:scale-105"
            aria-label="Contact page">
            contact us
          </Link>{" "}
          at:
        </p>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Email:{" "}
          <a
            href="mailto:contact@website.com"
            className="hover:underline"
            aria-label="Contact Email">
            contact@website.com
          </a>
        </p>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
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

export default PrivacyPolicy;
