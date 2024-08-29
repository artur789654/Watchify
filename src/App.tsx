import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchData } from "../src/store/actions/dataActions";
import "./App.css";

import { RootState } from "./store/index";
import NewPage from "../src/pages/NewPage/NewPage";
import Header from "./components/Header/Header";

import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Support from "./pages/Support/Support";
import Faqs from "./pages/Faqs/Faqs";
import Abuse from "./pages/Abuse/Abuse";

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
    <div className="App min-h-screen flex flex-col">
      {/* Define routes */}
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/new" element={<NewPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/abuse" element={<Abuse />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
