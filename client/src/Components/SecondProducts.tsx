import { useState, useEffect } from 'react';
import { Product, useCart } from '../Context/CartContext';

const SecondProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>('AquaScaping'); 
  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const endpoint = filter ? `/products/by-category/${encodeURIComponent(filter)}` : '/products/by-category/AquaScaping';
      const response = await fetch(`http://localhost:3000${endpoint}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("There's been a problem with your fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);


  return (
    <div className="products-bg p-10 text-white pb-20">
<div className="flex justify-center flex-wrap gap-4 mt-20 w-100">
<div className="w-full text-left">
  <h1 className="text-2xl mt-4 mb-2 text-black font-semibold">Aquascaping</h1>
  <button
    onClick={() => setFilter('Coral')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
    Coral
  </button>
  <button
    onClick={() => setFilter('Soft Corals')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
    Soft Corals
  </button>
  <button
    onClick={() => setFilter('Mushroom Corals')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
   Mushroom Corals
  </button>
  <button
    onClick={() => setFilter('Zoanthids & Palythoa')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
   Zoanthids & Palythoa
  </button>
  <button
    onClick={() => setFilter('Rare and Exotic Corals')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
   Rare and Exotic Corals
  </button>
  <button
    onClick={() => setFilter('Stones')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
   Rocks
  </button>
  <button
    onClick={() => setFilter('Wood')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
   Wood
  </button>
  <button
    onClick={() => setFilter('Substrate & soils')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
   Substrate and Soils
  </button>
  <button
    onClick={() => setFilter('Plants')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
  Plants
  </button>
  <button
    onClick={() => setFilter('Layout materials')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
  Layout materials
  </button>
  <button
    onClick={() => setFilter('Designer Layouts')}
    className="filter-btn text-white px-4 py-2 rounded  transition duration-300 ease-in-out m-1"
  >
 Designer Layouts
  </button>
  <button
    onClick={() => setFilter('')}
    className="filter-btn text-white px-4 py-2 rounded transition duration-300 ease-in-out m-1"
  >
    Show all
  </button>
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
          <button className="buy-btn btn text-white pl-10 pr-10 text-l shadow-xl" onClick={() => addToCart(product)}>Köp</button>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
</div>
  );
};

export default SecondProducts;
