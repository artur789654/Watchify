import { useState } from "react";
import { setToLocalStorage } from "../../helpers/storageUtils";
import { Link } from "react-router-dom";

interface CookieCustomizationModalProps {
  onSave: (settings: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  }) => void;
  onClose:()=>void;
  initialSettings: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  };
}

const CookieCustomizationModal: React.FC<CookieCustomizationModalProps> = ({
  onSave,
  onClose,
  initialSettings,
}) => {
  const [necessaryCookies] = useState(initialSettings.necessary);
  const [analyticsCookies, setAnaliticsCookies] = useState(
    initialSettings.analytics
  );
  const [marketingCookies, setMarketingCookies] = useState(
    initialSettings.marketing
  );

  const handleSaveSettings = () => {
    const settings = {
      necessary: necessaryCookies,
      analytics: analyticsCookies,
      marketing: marketingCookies,
    };
    setToLocalStorage("cookie-consent", "customized");
    setToLocalStorage("cookies-settings", JSON.stringify(settings));
    onSave(settings);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dark-primary bg-opacity-80 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xl space-x-4 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Customize cookies</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-left">
            <p>
              <span className="font-medium">Necessary cookies:</span> These
              cookies ensure the basic functionality of the site.
            </p>
            <label className="inline-flex items-center cursor-pointer ">
              <input
                type="checkbox"
                checked={necessaryCookies}
                disabled={true}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between text-left">
            <p>
              <span className="font-medium">Analytics cookies:</span> These
              cookies help us analyze site usage.
            </p>
            <label className="cursor-pointer ">
              <input
                type="checkbox"
                checked={analyticsCookies}
                onChange={(e) => setAnaliticsCookies(e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between text-left">
            <p>
              <span className="font-medium">Marketing cookies</span>These
              cookies are used for personalized ads.
            </p>
            <label className="cursor-pointer ">
              <input
                type="checkbox"
                checked={marketingCookies}
                onChange={(e) => setMarketingCookies(e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            You can find more information in our{" "}
            <Link
              to="/privacy-policy"
              className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
          Close
        </button>
        <button
          onClick={handleSaveSettings}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
  );
};

export default CookieCustomizationModal;
