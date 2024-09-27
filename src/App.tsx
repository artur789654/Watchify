import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchData } from "../src/store/actions/dataActions";
import "./App.css";

import { RootState } from "./store/index";
import NewPage from "../src/pages/NewPage/NewPage";
import Header from "./components/Header/Header";
import { ThemeProvider } from "./contexts/themeContext";
import { Navigate, Route, Routes } from "react-router-dom";
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
import MediaDetails from "./pages/MediaDetails/MediaDetails";
import StatusPage from "./pages/StatusPage/StatusPage";
import Partnership from "./pages/Partnership/Partnership";
import InvestorRelations from "./pages/InvestorRelations/InvestorRelations";
import Error from "./pages/Error/Error";
import Media from "./pages/Media/Media";
import { restoreAuth } from "./store/actions/authActions";

import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { fetchWatchList } from "./store/actions/watchListActions";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.yourStateSlice.data);
  const loading = useSelector(
    (state: RootState) => state.yourStateSlice.loading
  );
  const error = useSelector((state: RootState) => state.yourStateSlice.error);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchWatchList(user.uid));
    }
  }, [dispatch, user]);

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
            <Route path="/search/:page" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/movie/:id" element={<MediaDetails />} />
            <Route path="/tv/:id" element={<MediaDetails />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/investor-relations" element={<InvestorRelations />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/movies/top-rated/:page" element={<Media />} />
            <Route path="/movies/popular/:page" element={<Media />} />
            <Route path="/movies/upcoming/:page" element={<Media />} />
            <Route path="/tv/popular/:page" element={<Media />} />
            <Route path="/tv/top-rated/:page" element={<Media />} />
            <Route
              path="/reset-password/:oobCode"
              element={<ResetPassword />}
            />
            <Route path="/404" element={<Error />} />
            <Route path="*" element={<Navigate to={"/404"} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
