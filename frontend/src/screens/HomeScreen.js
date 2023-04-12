import { Link } from 'react-router-dom';
// import data from '../data';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';

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
      <h1>Feacture Products</h1>
      <div className="products">
        {loanding ? (
          <div>loanding</div>
        ) : error ? (
          <div>error</div>
        ) : (
          products.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name}></img>
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
