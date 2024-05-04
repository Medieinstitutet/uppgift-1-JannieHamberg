import { useState } from 'react';
import   { useCart } from '../Context/CartContext';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';

export const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity, calculateTotal, clearCart} = useCart();
  const navigate = useNavigate();
  
  const [customer, setCustomer] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    address1: '',
    address2: '',
    city: '',
    zipcode: '',
    country: ''
  });
  const [customerRegistered, setCustomerRegistered] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleCustomerRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register-customer', {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        password: customer.password,
        address: {
          address1: customer.address1,
          address2: customer.address2,
          city: customer.city,
          zipcode: customer.zipcode,
          country: customer.country
        }
      });
      if (response.status === 201) {
        setCustomerRegistered(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your entries and try again.');
    }
  };

  const handleCheckout = async () => {
   
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
  
    
    const orderData = {
      customer: customer.email,
      orderDate: new Date().toISOString(), 
      status: 'unpaid',
      totalPrice: calculateTotal(),
      paymentId: null,
      items: cart.map(item => ({ 
        product_id: item.product._id,
        amount: item.quantity,
        price: item.product.price
      }))
    };
  
    try {
     
      const response = await axios.post('http://localhost:3000/create-order', orderData);
      if (response.status === 201) {
        alert('Order placed successfully!');
        clearCart();
        navigate('/success');
       
      }
    } catch (error) {
      alert('Failed to place the order. Please try again.');
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
                  <span className="text-lg font-bold p-10">{item.product.price} SEK</span>
                  <button onClick={() => removeFromCart(item.product._id)} className="text-white">Remove</button>
                </div>
              ))}
            </div>
            <div className="col-span-1 glass p-6 shadow-md rounded-lg flex flex-col">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="mt-auto">
                <p className="mb-4 font-bold text-lg ">Total: {calculateTotal()} SEK</p>
                {!customerRegistered && (
                  <div className='text-black'>
                    <input type="email" placeholder="Email" value={customer.email} onChange={handleInputChange} name="email" className="input input-bordered w-full mb-2" required/>
                    <input type="text" placeholder="First Name" value={customer.firstName} onChange={handleInputChange} name="firstName" className="input input-bordered w-full mb-2" required/>
                    <input type="text" placeholder="Last Name" value={customer.lastName} onChange={handleInputChange} name="lastName" className="input input-bordered w-full mb-2" required/>
                    <input type="password" placeholder="Password" value={customer.password} onChange={handleInputChange} name="password" className="input input-bordered w-full mb-2" required/>
                    <input type="text" name="address1" placeholder="Address Line 1" value={customer.address1} onChange={handleInputChange} className="input input-bordered w-full mb-2" required/>
                    <input type="text" name="address2" placeholder="Address Line 2" value={customer.address2} onChange={handleInputChange} className="input input-bordered w-full mb-2" />
                    <input type="text" name="city" placeholder="City" value={customer.city} onChange={handleInputChange} className="input input-bordered w-full mb-2" required/>
                    <input type="text" name="zipcode" placeholder="Zip Code" value={customer.zipcode} onChange={handleInputChange} className="input input-bordered w-full mb-2" required/>
                    <input type="text" name="country" placeholder="Country" value={customer.country} onChange={handleInputChange} className="input input-bordered w-full mb-2" required/>
                    <button onClick={handleCustomerRegistration} className="checkout-btn text-white w-full py-2 rounded-lg">Register</button>
                  </div>
                )}
                {customerRegistered && (
                  <button onClick={handleCheckout} className="checkout-btn text-white w-full py-2 rounded-lg">Checkout</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};























