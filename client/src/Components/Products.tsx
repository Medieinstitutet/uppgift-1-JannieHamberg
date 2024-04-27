

import { useState, useEffect } from 'react';
import { Product, useCart } from '../Context/CartContext';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        console.error("There's been a problem with your fetch operation:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-bg p-10 text-white pb-20">
      <div className="flex justify-center flex-wrap gap-4 mt-20 w-100">
        <div className="w-full text-left">
          <h1 className="text-2xl mt-4 mb-2 text-black font-semibold">Products</h1>
        </div>
        <div className='products-container-bg w-full flex justify-center gap-4 p-32'>
        {products.map((product) => (
          <div key={product._id} className="card w-96 glass text-black">
            <figure className="card-image flex justify-center items-center overflow-hidden h-60">
              <img src={product.image} alt={product.name} className="card-image-img w-full h-60" />
            </figure>
            <div className="card-body rounded-t-xl">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.price} SEK</p>
              <p>{product.description}</p>
              <div className="card-actions justify-end">
                <button className="buy-btn btn btn-white pl-10 pr-10 text-l shadow-xl hover:text-sky-700" onClick={() => addToCart(product)}>Köp</button>
              </div>
            </div>
          </div>
          
        ))}
        </div>
      </div>
    </div>
  );
};

export default Products;