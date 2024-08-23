import { FaSearch } from "react-icons/fa";
import { faqData, Faq } from "../../data/faqData";
import { useState } from "react";

const Faqs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleSearch = () => {
    const foundCategory = faqData.find((category: Faq) =>
      category.questions.some((q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (foundCategory) {
      const foundQuestion = foundCategory.questions.find((q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (foundQuestion) {
        setActiveCategory(foundCategory.category);
        setOpenQuestion(foundQuestion.question);
      }
    }
  };

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <section className="bg-light-primary dark:bg-dark-primary flex flex-col items-center space-y-6 container mx-auto">
      <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      <div className="flex items-center justify-center relative w-1/2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          aria-label="Search FAQs"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600 w-full"
        />
        <button
          onClick={handleSearch}
          aria-label="Search"
          className="absolute right-0 w-10 h-full flex items-center justify-center transform transition-transform duration-300 hover:scale-105 bg-slate-300 dark:bg-slate-600 rounded-md">
          <FaSearch className="fill-slate-600 dark:fill-slate-400 " />
        </button>
      </div>

      {faqData.map((category: Faq) => (
        <div
          key={category.category}
          className="bg-light-secondary dark:bg-dark-secondary w-full text-start space-y-4 rounded-md shadow-md pb-6">
          <button
            onClick={() => toggleCategory(category.category)}
            aria-expanded={activeCategory === category.category}
            aria-controls={`faq-category-${category.category}`}
            className="text-2xl font font-semibold cursor-pointer transform transition duration-300 hover:scale-95 px-6 pt-6">
            {category.category}
          </button>
          {activeCategory === category.category &&
            category.questions.map((q) => (
              <div
                key={q.question}
                className="p-4 m-6 space-y-4 bg-light-primary dark:bg-dark-primary rounded-md shadow-md">
                <button
                  onClick={() => toggleQuestion(q.question)}
                  aria-expanded={openQuestion === q.question}
                  aria-controls={`faq-question-${q.question}`}
                  aria-label={q.question}
                  className="w-full text-start text-lg font-medium transform transition-text duration-300 hover:text-xl">
                  {q.question}
                </button>
                {openQuestion === q.question && (
                  <p className="text-light-text-secondary dark:text-dark-text-secondary ps-2">
                    {q.answer}
                  </p>
                )}
              </div>
            ))}
        </div>
      ))}
    </section>
  );
};

export default Faqs;
