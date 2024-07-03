import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductBox from '../Component/ProductBox';
import { ProductState } from '../Context/context';
import './main.css';

const Products = () => {
  const { user, cart, setCart, products, setProducts } = ProductState();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();

  const searchProducts = () => {
    if (!search) setFilteredProducts(products);
    else {
      const filtered = products.filter(
        (e) =>
          e.category.toLowerCase().includes(search.toLowerCase()) ||
          e.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    searchProducts();
  }, [products, search]);

  const handlePriceFilter = (price, value) =>{
    const filtered = products.filter((p)=>{
        if(value === 'above'){  
          return  price < p.price;
        }
        return price > p.price;
    })
    setFilteredProducts(filtered);
  }
  const handleCategoryFilter = (cat) => {
    const filtered = products.filter((c)=>{
        return cat === c.category;
    })
    setFilteredProducts(filtered)
  }
  return (
    <>
      <div>
        <div className='filter-section'>
          <h3>Search products: </h3>
        <div>
            <label htmlFor="price">Filter by price: </label>
             <input type="text" id='price' value={price} onChange={(e)=>handlePriceFilter(e.target.value, 'under')} placeholder='Enter price under you want...' />
             <input type="text" id='price' value={price} onChange={(e)=>handlePriceFilter(e.target.value, 'above')} placeholder='Enter price above you want...' />
             Filter by category: 
             <select name="" id="" style={{
                fontSize:"1.2rem",
                margin:"1rem",
                
             }} onChange={(e)=>(handleCategoryFilter(e.target.value))}> 
                <option value="mobile">Mobile</option>
                <option value="laptop">Laptop</option>
                <option value="keyboard">Keyboard</option>
                <option value="mouse">Mouse</option>
             </select>
             <label htmlFor="">Search by item name: </label>
          <input
            type='text'
            onKeyDown={searchProducts}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder='Search here...'
            />
          <button onClick={searchProducts}>Search</button>
            </div>
        </div>
        <div className='productList'>
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((pro) => (
              <ProductBox key={pro._id} value={pro} />
            ))
          ) : (
            <h1>No Products Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
