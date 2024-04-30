
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
export const Footer = () => { 

    return (
        <div className="flex flex-col-reverse items-center justify-center  bg-custom-purple px-5 py-5 md:flex-row md:p-20 bg-white text-black">

                        <div className="w-full md:w-1/3 text-black text-center pt-4 pb-4 md:pt-0">
                        <FontAwesomeIcon icon={faFacebook} size="2xl" className="px-4 pt-4"/>
                        <FontAwesomeIcon icon={faInstagram} size="2xl" />
                        <FontAwesomeIcon icon={faSquareXTwitter} size="2xl" className="px-4"/> 
                        <p className="pt-8">© copyright all rights reserved 2024</p>
                        </div>
            <div className="w-full md:w-1/3 text-black text-center pt-0 md:pt-4 md:pb-6">
                <ul className="text-lg leading-loose">
                    <li>
                    <Link to="/contact" className="py-2 hover:text-sky-700">Contact</Link>
                    </li>
                    <li>
                    <Link to="/about" className="py-2 hover:text-sky-700">About us</Link>
                    </li>
                    <li>
                    <Link to="/policy" className="py-2 hover:text-sky-700">Policy</Link>
                    </li>
                    <li>
                    <Link to="/shipping" className="py-2 hover:text-sky-700">Shipping</Link>
                    </li>
                    <li>
                    <Link to="/faq" className="py-2 hover:text-sky-700">FAQ</Link>
                    </li>
                    <li className='text-white'>
                    <Link to="/admin" className="py-2 hover:text-sky-700">Admin</Link>
                    </li>
                </ul>
                
                </div>
            <div className="w-full md:w-1/3 text-black text-right pb-0 md:py-4">
                <img src="../../src/assets/logo3.png" alt="logo" className="mx-auto  h-12 w-auto object-contain center"/>
            </div>
        </div>
    )
}