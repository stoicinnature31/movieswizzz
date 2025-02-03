import React from 'react';
import MovieCategoryMenu from '../Components/Home/MovieCategoryMenu.jsx';
import Footer from './Footer/Footer.jsx';
import NavBar from './Navbar/Navbar.jsx';

const Layout = ({ children }) => {
    const charcoal = "#34495e";
    return (
        <>
            <div className="bg-main text-charcoal mx-auto p-3">
                <NavBar />  \
                <MovieCategoryMenu/>              
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout