import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { BsCart2 } from 'react-icons/bs';
import { CgCloseO, CgMenuRight } from 'react-icons/cg';

export const NavBar: React.FC = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white">
        <div className="flex justify-between items-center px-4 py-2">
            <Link to="/" className="text-3xl">
            <img src="../../src/assets/logo3.png" alt="logo" className="h-12" />
            </Link>
            <button onClick={(event) => {
              event.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }} className="text-3xl">
                {isMenuOpen ? <CgCloseO /> : <CgMenuRight />}
            </button>
        </div>
        <div ref={menuRef} className={`backdrop-blur-xl absolute right-0  mt-1 w-[90%] sm:w-[400px] transition-all duration-300 ${isMenuOpen ? 'h-screen' : 'max-h-0'} overflow-hidden bg-white`}>
          <div className="flex flex-col items-start  p-5 text-2xl  ">
            <Link to="/" className="py-2 hover:text-sky-700" onClick={closeMenu}>Home</Link>
            <Link to="/webshop" className="py-2 hover:text-sky-700" onClick={closeMenu}>Products</Link>
            <Link to="/contact" className="py-2 hover:text-sky-700" onClick={closeMenu}>Contact</Link>
            <div className="pt-2 flex items-center justify-between w-full">
                <Link to="/shoppingcart" className="flex items-center gap-2 hover:text-sky-700" onClick={closeMenu}>
                    <BsCart2 size={24} />
                    <span>{cart.length}</span>
                </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};