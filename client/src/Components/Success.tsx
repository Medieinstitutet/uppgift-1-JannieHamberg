import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useCart } from "../Context/CartContext";
import axios from "axios";

export const Success = () => {
     const { clearCart } = useCart(); 
    const [verified, setVerified] = useState(false);
  
    useEffect(() => {
        if (!verified) {
        const verifySession = async () => {
          try {
            console.log("Starting verification...");
            const session_id = localStorage.getItem("session_id");
            console.log("Retrieved session_id from localStorage:", session_id);
            
      
            if (session_id) {
              const response = await axios.post(
                "http://localhost:3001/api/checkout/verify-checkout-session",
                { session_id },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
      
              if (response.data && response.data.verified) {
                console.log("Betalningen är verifierad!");
                setVerified(true);
                clearCart();
                
              } else {
                console.log("Betalningen är inte verifierad.");
              
              }
            } else {
              console.log("No session_id found in localStorage.");
          
            }
          } catch (error) {
            console.error("Fel uppstod vid verifiering:", error);
          }
        };
          verifySession();
        }
      }, [verified]);
      
      
  
   
        return (
            <div className="flex justify-center items-center h-screen success-bg text-grey">
              <div className="glass p-4 shadow-md rounded-lg max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center my-10">Tack för ditt köp!</h1>
                <p className="text-xl text-center">Vårt bokningssystem är under uppbyggnad. Ring 072-0012-367 för bokning</p>
                <div className="text-center mt-10 mb-4">
                  <Link to="/contact" className=" text-success-bg font-semibold py-2 px-4 border border-success-bg success-btn rounded-xl pl-10 pr-10 text-l shadow-xl">
                    Kontakt
                  </Link>
                </div>
              </div>
            </div>
          
          
    );
  };
  