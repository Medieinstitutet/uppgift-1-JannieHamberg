
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
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
                        <a href="#">Kontakt</a>
                    </li>
                    <li>
                        <a href="#">Hitta</a>
                    </li>
                    <li>
                        <a href="#">Om oss</a>
                    </li>
                </ul>
                
                </div>
            <div className="w-full md:w-1/3 text-black text-right pb-0 md:py-4">
                <img src="../../src/assets/logo3.png" alt="logo" className="mx-auto  h-12 w-auto object-contain center"/>
            </div>
        </div>
    )
}