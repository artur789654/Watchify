import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchData } from "../src/store/actions/dataActions";
import "./App.css";

import { RootState } from "./store/index";
import NewPage from "../src/pages/NewPage/NewPage";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./contexts/themeContext";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Support from "./pages/Support/Support";
import Faqs from "./pages/Faqs/Faqs";
import Contact from "./pages/Contact/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService/TermsOfService";
import CookieConsentBanner from "./components/CookieConsentBanner/CookieConsentBanner";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import StatusPage from "./pages/StatusPage/StatusPage";
import Partnership from "./pages/Partnership/Partnership";
import InvestorRelations from "./pages/InvestorRelations/InvestorRelations";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.yourStateSlice.data);
  const loading = useSelector(
    (state: RootState) => state.yourStateSlice.loading
  );
  const error = useSelector((state: RootState) => state.yourStateSlice.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(data, "data");
  return (
    <ThemeProvider>
      <div className="App min-h-screen flex flex-col">
        <CookieConsentBanner />
        <Header />
        <main className="flex-grow bg-light-primary dark:bg-dark-primary text-light-text-main dark:text-dark-text-main">
          <Routes>
            <Route path="/new" element={<NewPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/investor-relations" element={<InvestorRelations />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
