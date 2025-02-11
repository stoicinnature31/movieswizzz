import React, { useState } from "react";
import { Navbar, NavbarContent } from "@nextui-org/react";
import { FaUserAlt } from "react-icons/fa";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSearchStore from "../../Store/Store.js"; 
import Logo from "/images/logo.png";

const NavBar = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { setSearchResults } = useSearchStore(); 

  const apiKey = "81a74c01";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    } else {
      toast.info("Please enter a search query");
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== "") {
      fetchSearchResults(query);
    } else {
      setSearchResults([]); 
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
      );
      const data = await response.json();
      if (data.Search) {
        setSearchResults(data.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      toast("Error fetching search results");
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  return (
    <Navbar shouldHideOnScroll className="w-full bg-NavBG text-white h-32">
      <div className="lg:w-full flex flex-col sm:flex-row items-center px-4 py-4 sm:py-0 relative ml-8">
        {/* Logo and Search Box */}
        <div className="flex flex-col sm:flex-row w-full items-center sm:justify-between">
          <Link to="/" className="flex items-center justify-start w-auto mb-4 sm:mb-0">
            <img src={Logo} alt="Logo" className="h-16 w-auto sm:h-20" />
          </Link>

          {/* Search Box */}
          <form
            className="relative w-full sm:w-[60%] md:w-[70%] flex flex-col"
            onSubmit={handleSearch}
          >
            <div className="relative">
              <input
                type="text"
                className="w-full p-3 pl-12 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                placeholder="Search Movies..."
                value={searchQuery}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-0.5 text-white bg-blue-600 hover:bg-blue-700 p-3 rounded-full"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Hamburger Menu */}
      <div className="absolute right-4 top-4 lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-screen bg-slate-800 text-white px-10 py-5 flex flex-col transform transition-transform duration-1000 ease-in-out ${
          menuOpen ? "translate-x-0" : "hidden translate-x-full"
        }`}
      >
        {/* Close Icon */}
        <div className="flex justify-end">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-blue-500 focus:outline-none"
          >
            <MdCancel size={30} />
          </button>
        </div>

        <NavLink to="/movies" className="text-sky-500 font-bold uppercase mb-4">
          Movies
        </NavLink>
        <NavLink to="/about" className="text-sky-500 font-bold uppercase mb-4">
          About
        </NavLink>
        <NavLink to="/contact" className="text-sky-500 font-bold uppercase mb-4">
          Contacts
        </NavLink>
        <NavLink to="/login" className="text-sky-500 font-bold uppercase mb-4">
          Login
        </NavLink>
        <NavLink to="/profile" className="flex items-center space-x-2">
          <FaUserAlt className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>
      </div>

      {/* Central Navigation Menu (Visible only on medium screens and larger) */}
      <NavbarContent className="hidden lg:flex gap-8 justify-center">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `font-bold uppercase transform hover:scale-110 transition-transform duration-300 ease-in-out ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
          Movies
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `font-bold uppercase transform hover:scale-110 transition-transform duration-300 ease-in-out ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `font-bold uppercase transform hover:scale-110 transition-transform duration-300 ease-in-out ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
          Contacts
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `font-bold uppercase transform hover:scale-110 transition-transform duration-300 ease-in-out ${
              isActive ? "text-blue-500" : "text-white"
            }`
          }
        >
          Login
        </NavLink>
        <NavLink to="/profile">
          <FaUserAlt className="w-5 h-5" />
        </NavLink>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
