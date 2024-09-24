import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store";
import { fetchSearch } from "../../store/actions/searchActions";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";

const Search: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [, setQuery] = useState("");
  const { page } = useParams<{ page: string }>();
  const { results, totalPages, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  useEffect(() => {
    const currentPage = page ? parseInt(page, 10) : 1;
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
      dispatch(fetchSearch(currentPage, searchQuery));
    }
  }, [location, dispatch, page]);

  const handlePageChange = (newPage: number) => {
    const currentPathname = location.pathname;
    const currentSearchParams = new URLSearchParams(location.search);
    const newUrl = `${currentPathname
      .split("/")
      .slice(0, -1)
      .join("/")}/${newPage}?${currentSearchParams.toString()}`;
    navigate(newUrl);
  };

  return (
    <div className="container mx-auto py-6 md:px-6 px-2 m-4 bg-light-secondary dark:bg-dark-secondary rounded-md shadow-md space-y-6">
      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}
      <h2 className="text-3xl text-start">Search</h2>
      <div className="mx-auto flex flex-wrap gap-6 justify-center">
        {results.length > 0 ? (
          results.map((item: any) => <Card key={item.id} media={item} />)
        ) : (
          <p>No media available</p>
        )}
      </div>
      <Pagination
        currentPage={Number(page)}
        totalPages={Number(totalPages)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Search;
