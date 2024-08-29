import React from "react";
import {
  Event,
  events,
  Report,
  reports,
  stockData,
} from "../../data/investorData";

const InvestorRelations: React.FC = () => {
  return (
    <div className="container p-6 mx-auto m-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md space-y-6">
      <h1 className="text-3xl font-bold">Investor Relations</h1>
      <section>
        <p className="text-lg leading-relaxed text-light-text-secondary dark:text-dark-text-secondary">
          Welcome to our Investor Relations page. Here you can find financial
          reports, stock information, and upcoming events for current and
          potential investors.
        </p>
      </section>

      <section className="bg-light-primary dark:bg-dark-primary space-y-6 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold">Financial Reports</h2>
        <ul className="p-6 space-y-4">
          {reports.map((report: Report, index) => (
            <li key={index}>
              <div className="flex flex-wrap space-y-4 sm:justify-between justify-around items-center p-4 rounded-md shadow-md bg-light-secondary dark:bg-dark-secondary  transform-bg duration-300 hover:bg-light-primary dark:hover:bg-dark-primary">
                <p className="font-medium">
                  {report.title} - {report.year}
                </p>

                <a
                  href={report.fileUrl}
                  download
                  className="transform duration-300 bg-light-button-main dark:bg-dark-button-main hover:bg-light-button-hover dark:hover:bg-dark-button-hover px-4 py-2 rounded-md text-dark-text-main">
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-light-primary dark:bg-dark-primary space-y-6 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold">Financial Performance</h2>
        <div className="grid grid-cols-2 border rounded-md shadow-md bg-light-secondary dark:bg-dark-secondary ">
          <h4 className="text-lg font-bold border-b p-5">Date</h4>
          <h4 className="text-lg font-bold border-b p-5">Price</h4>
          {stockData.map((data, index) => (
            <React.Fragment key={index}>
              <p className="border-b p-4 border-r text-light-text-secondary dark:text-dark-text-secondary">
                {data.date}
              </p>
              <p className="border-b p-4 text-light-text-secondary dark:text-dark-text-secondary">
                {data.price}
              </p>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="bg-light-primary dark:bg-dark-primary space-y-6 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <ul className="list-disc list-inside w-fit text-start mx-auto space-y-4">
          {events.map((event: Event, index) => (
            <li
              key={index}
              className="text-light-text-secondary dark:text-dark-text-secondary">
              {event.date} : {event.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-light-primary dark:bg-dark-primary space-y-6 p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold">Contact Information</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          For investor inquiries, please contact:
        </p>
        <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
          <li>
            Email:{" "}
            <a
              href="mailto:contact@website.com"
              className="hover:underline text-light-text-main dark:text-dark-text-main"
              aria-label="Contact Email">
              contact@website.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a
              href="tel:+380999999999"
              className="hover:underline text-light-text-main dark:text-dark-text-main"
              aria-label="Contact Phone">
              +(380) 99-999-99-99
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default InvestorRelations;
