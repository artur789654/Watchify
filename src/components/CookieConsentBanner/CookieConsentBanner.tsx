import { useEffect, useState } from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../helpers/storageUtils";
import CookieCustomizationModal from "./CookieCustomizationModal";

const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const consent = getFromLocalStorage("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setToLocalStorage("cookie-consent", "accepted");
    setToLocalStorage(
      "cookies-settings",
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
      })
    );
    setShowBanner(false);
  };

  const handleReject = () => {
    setToLocalStorage("cookie-consent", "rejected");
    setToLocalStorage(
      "cookies-settings",
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
      })
    );
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  const handleCloseModal = (settings: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  }) => {
    setToLocalStorage("cookie-consent", "customized");
    setToLocalStorage("cookies-settings", JSON.stringify(settings));
    setShowModal(false);
    setShowBanner(false);
  };

  const handleCloseWithoutSaving = () => {
    setShowModal(false);
    setShowBanner(true);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 w-full text-light-primary dark:text-dark-primary bg-dark-primary dark:bg-light-secondary rounded-t-md shadow-lg flex flex-col items-center md:flex-row md:justify-between md:p-6 p-4 z-50">
          <p className="text-center md:text-left">
            We use cookies to improve your experience on our site. By continuing
            to browse, you agree to our use of cookies.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handleAcceptAll}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Accept all
            </button>
            <button
              onClick={handleReject}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              Reject unnecessary
            </button>
            <button
              onClick={handleCustomize}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Customize
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <CookieCustomizationModal
          onSave={handleCloseModal}
          onClose={handleCloseWithoutSaving}
          initialSettings={{
            necessary: true,
            analytics: false,
            marketing: false,
          }}
        />
      )}
    </>
  );
};

export default CookieConsentBanner;
