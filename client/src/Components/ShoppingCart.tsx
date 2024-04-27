import { useCart, Product } from "../Context/CartContext";

export const ShoppingCart = () => {
    const { cart, removeFromCart, updateQuantity, calculateTotal } = useCart();
    


    const handleCheckout = async () => {
        try {
            const products = cart.map((item) => ({
                product: item.product.price,
                quantity: item.quantity,
            }));

            const response = await fetch('http://localhost:3000/checkout/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ cart: products }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const sessionData = await response.json();
            console.log(sessionData);
            localStorage.setItem('session_id', sessionData.session_id);


            window.location.href = sessionData.url;
        } catch (error) {
            console.error('There was a problem with the checkout operation:', error);
        }
    };
  
  
    return (
        <div className="shoppingCart-bg p-10 text-white pb-20">
        <div className="flex justify-center flex-wrap gap-4 mt-20 w-100">
          <div className="w-full text-left">
            <h1 className="text-2xl mt-4 mb-2 text-black font-semibold">Order Summary</h1>
          </div>
          <div className="shoppingCart-container-bg w-full flex justify-center p-32">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {cart.map((item) => (
              <div key={item.product._id} className="flex items-center justify-between glass p-4 shadow-md mb-3 rounded-lg">
                <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded" />
                <div className='p-7'>
                  <h2 className="text-lg font-bold">{item.product.name}</h2>
                  <p className="text-white text-xl">{item.product.description}</p>
                </div>
                <div className="flex items-center p-10">
                <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                </div>
                <span className="text-lg font-bold p-10">{(item.product.price)} SEK</span>
                <button onClick={() => removeFromCart(item.product._id)} className="text-white">Remove</button>
              </div>
            ))}
          </div>
          <div className="col-span-1 glass p-6 shadow-md rounded-lg  flex flex-col">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="mt-auto">
            <p className="mb-4 font-bold text-lg">Total: {calculateTotal()} SEK</p>
            <button onClick={handleCheckout} className="checkout-btn text-white w-full py-2 rounded-lg">Checkout</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  };