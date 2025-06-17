import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import {
  MdSearch,
  MdFavorite,
  MdShoppingCart,
  MdKeyboardArrowDown,
  MdMenu,
  MdClose,
  MdPerson,
  MdShoppingBag,
  MdSettings,
  MdLogout,
  MdKeyboardArrowUp,
} from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { getCartItemsCount, wishlistItems } = useContext(CartContext);
  const profileDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
      // Close navigation dropdowns when clicking outside
      if (!event.target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = {
    shop: {
      title: "Shop",
      items: [
        { name: "All Products", path: "/products" },
        { name: "New Arrivals", path: "/products?filter=new" },
        { name: "Best Sellers", path: "/products?filter=bestseller" },
      ],
    },
    men: {
      title: "Men",
      items: [
        { name: "Kurta", path: "/men/kurta" },
        { name: "Shirts", path: "/men/shirts" },
        { name: "Sherwani", path: "/men/sherwani" },
      ],
    },
    women: {
      title: "Women",
      items: [
        { name: "Lehenga", path: "/women/lehenga" },
        { name: "Saree", path: "/women/saree" },
        { name: "Kurti", path: "/women/kurti" },
      
      ],
    },
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Shopmart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium rounded-lg hover:bg-gray-50"
            >
              Home
            </Link>

            {/* Dropdown Menus */}
            {Object.entries(menuItems).map(([key, menu]) => (
              <div key={key} className="relative dropdown-container group">
                <Link
                  to={`/${key}`}
                  className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium rounded-lg hover:bg-gray-50 flex items-center"
                >
                  {menu.title}
                  <MdKeyboardArrowDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform translate-y-2 group-hover:translate-y-0">
                  {menu.items.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link
              to="/sale"
              className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors font-medium rounded-lg hover:bg-red-50"
            >
              Sale
            </Link>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-2">
            {/* Search - Hidden on smaller screens */}
            <div className="hidden xl:flex items-center bg-gray-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all">
              <MdSearch className="w-5 h-5 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm w-40 placeholder-gray-500"
              />
            </div>

            {/* Search Icon for smaller screens */}
            <button className="xl:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors hover:bg-gray-100 rounded-lg">
              <MdSearch className="w-6 h-6" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors hover:bg-gray-100 rounded-lg group"
            >
              <MdFavorite className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-indigo-600 transition-all duration-200 hover:bg-indigo-50 rounded-lg group"
            >
              <MdShoppingCart className="w-6 h-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center p-2 text-gray-700 hover:text-indigo-600 transition-colors hover:bg-gray-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">JD</span>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">JD</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          John Doe
                        </p>
                        <p className="text-xs text-gray-600">
                          john.doe@example.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <MdPerson className="w-4 h-4 mr-3" />
                      My Profile
                    </Link>

                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <MdShoppingBag className="w-4 h-4 mr-3" />
                      My Orders
                    </Link>

                    <Link
                      to="/wishlist"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <MdFavorite className="w-4 h-4 mr-3" />
                      Wishlist
                      {wishlistItems.length > 0 && (
                        <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          {wishlistItems.length}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <MdSettings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 py-2">
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <MdLogout className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <MdClose className="w-6 h-6" />
              ) : (
                <MdMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="xl:hidden mb-4">
                <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all">
                  <MdSearch className="w-5 h-5 text-gray-500 mr-3" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
                  />
                </div>
              </div>

              <Link
                to="/"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Menu Items */}
              {Object.entries(menuItems).map(([key, menu]) => (
                <div key={key}>
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === key ? null : key)
                    }
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                  >
                    {menu.title}
                    {activeDropdown === key ? (
                      <MdKeyboardArrowUp className="w-4 h-4" />
                    ) : (
                      <MdKeyboardArrowDown className="w-4 h-4" />
                    )}
                  </button>

                  {activeDropdown === key && (
                    <div className="pl-4 space-y-1 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                      {menu.items.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/sale"
                className="block px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sale
              </Link>

              {/* Mobile Profile Section */}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex items-center px-4 py-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-semibold">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-600">
                      john.doe@example.com
                    </p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  My Orders
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Settings
                </Link>
                <button className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
