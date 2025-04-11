import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TbMenuDeep } from "react-icons/tb";
import { logout, authStateListener } from "../firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../redux/menuSlice";

const Navbar = () => {
  const { showMenu } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ Hook to navigate

  useEffect(() => {
    const unsubscribe = authStateListener((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const togglemenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <header className="w-full py-4 bg-[#4F46E5] text-white px-6 shadow-md">
      <nav className="max-w-[1300px] mx-auto flex items-center justify-between">
        <div className="logo">
          <NavLink to="/">
            <h1 className="text-2xl font-bold text-[#F8FAFC]">FreelancerBox</h1>
          </NavLink>
        </div>

        <div className="md:hidden cursor-pointer">
          <TbMenuDeep onClick={togglemenu} size={28} />
        </div>

        <ul
          className={`absolute md:static top-full left-0 w-full md:w-auto bg-[#4F46E5] md:bg-transparent px-6 py-4 md:p-0 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 transition-all duration-300 ${
            showMenu ? "mobileMenu" : "webMenu"
          }`}
        >
          {user ? (
            <>
              <li>
                <NavLink to="/home" className="hover:text-[#E11D48]">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-[#E11D48]">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="hover:text-[#E11D48]">
                  Profile
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/signup" className="hover:text-[#E11D48]">
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="hover:text-[#E11D48]">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
