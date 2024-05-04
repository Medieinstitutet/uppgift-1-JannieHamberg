
import { Link } from "react-router-dom"


export const Success = () => {

      
      
  
   
        return (
            <div className="flex justify-center items-center h-screen success-bg text-grey">
              <div className="glass p-4 shadow-md rounded-lg max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center my-10">Thank you for your order.</h1>
                <p className="text-xl text-center">An email will be sent to you shortly with orderdetails!</p>
                <div className="text-center mt-10 mb-4">
                  <Link to="/" className=" text-success-bg font-semibold py-2 px-4 border border-success-bg success-btn rounded-xl pl-10 pr-10 text-l shadow-xl">
                   Back to homepage
                  </Link>
                </div>
              </div>
            </div>
          
          
    );
  };
  