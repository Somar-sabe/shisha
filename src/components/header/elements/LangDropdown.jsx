import { useTranslation } from 'react-i18next';

const LangDropdown = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Change the language when clicked
  };

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {i18n.language === "en" ? "En" : "Ar"} {/* Display current language */}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleLanguageChange("en")}
          >
            English
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => handleLanguageChange("ar")}
          >
            Arabic
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LangDropdown;
