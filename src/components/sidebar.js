import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="sidebar-toggle-btn">
        {isOpen ? 'Close' : 'Open'} Sidebar
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>

      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100%;
          background-color: #333;
          color: white;
          padding: 20px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar-toggle-btn {
          position: fixed;
          top: 20px;
          left: 20px;
          background-color: #333;
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
        }

        nav ul {
          list-style-type: none;
          padding: 0;
        }

        nav ul li {
          margin: 15px 0;
        }

        nav ul li a {
          color: white;
          text-decoration: none;
          font-size: 18px;
        }

        nav ul li a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
