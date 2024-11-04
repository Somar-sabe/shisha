const CuurencyDropdown = () => {
  return (
    <div className="dropdown">
      <button
        className="dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        AED
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="#">
           AED
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            USD
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            EUR
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CuurencyDropdown;
