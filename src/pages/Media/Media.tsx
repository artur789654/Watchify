import Filter from "../../components/Filter/Filter";
import MediaList from "../../components/MediaList/MediaList";
import useToggle from "../../hooks/useToggle";
import { FaFilter } from "react-icons/fa";
const Media: React.FC = () => {
  const [isFilterOpen, toggleFilter] = useToggle();
  return (
    <div className="container mx-auto relative flex md:flex-row sm:flex-col flex-col gap-2">
      <button
        onClick={toggleFilter}
        className="p-2 absolute top-6 right-6 bg-light-secondary dark:bg-dark-secondary text-light-text-secondary dark:text-dark-text-secondary transition-colors duration-300 hover:text-light-link-hover dark:hover:text-dark-link-hover rounded-md m-4">
        <FaFilter />
      </button>
      {isFilterOpen && (
        <div className="xl:w-1/3 md:w-2/3">
          <Filter />
        </div>
      )}
      <div className="flex-grow">
        <MediaList />
      </div>
    </div>
  );
};

export default Media;
