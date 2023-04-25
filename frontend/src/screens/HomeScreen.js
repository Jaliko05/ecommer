import { Link } from 'react-router-dom';
// import data from '../data';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from '../components/Product.js';
import { Helmet } from 'react-helmet-async';
import { LoandingBox } from '../components/LoandingBox.js';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loanding: true };
    case 'FETCH_SUCCES':
      return { ...state, products: action.playload, loanding: false };
    case 'FETCH_FAIL':
      return { ...state, loanding: false, error: action.playload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [{ loanding, error, products }, dispatch] = useReducer(
    logger(reducer),
    {
      products: [],
      loanding: true,
      error: '',
    }
  );
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ typr: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCES', playload: result.data });
      } catch (er) {
        dispatch({ type: 'FETCH_FAILD', playload: er.message });
      }
      //setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1>Feacture Products</h1>
      <div className="products">
        {loanding ? (
          <LoandingBox />
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div sm={3} md={4} ld={3} className="col mb-3" key={product.slug}>
                <Product product={product}></Product>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
