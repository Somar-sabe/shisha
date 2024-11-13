import { useCurrency } from "@/app/contexts/CurrencyContext";

const CurrencyDropdown = () => {
  const { currency, changeCurrency } = useCurrency();

  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {currency}
      </button>
      <ul className="dropdown-menu">
        {["AED", "USD", "EUR"].map((cur) => (
          <li key={cur}>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                changeCurrency(cur);  // This will update the currency context
              }}
            >
              {cur}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyDropdown;
