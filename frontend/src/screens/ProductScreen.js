import { useParams } from 'react-router-dom';
import { useContext, useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import axios from 'axios';
import Rating from '../components/Rating.js';
import { Helmet } from 'react-helmet-async';
import { LoandingBox } from '../components/LoandingBox.js';
import { Store } from '../Store.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loanding: true };
    case 'FETCH_SUCCES':
      return { ...state, product: action.playload, loanding: false };
    case 'FETCH_FAILD':
      return { ...state, loanding: false, error: action.playload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;

  const [{ loanding, error, product }, dispatch] = useReducer(logger(reducer), {
    product: [],
    loanding: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ typr: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCES', playload: result.data });
      } catch (er) {
        dispatch({ type: 'FETCH_FAILD', playload: er.message });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const addToCartHandler = () => {
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: 1 },
    });
  };
  return (
    <div className="products">
      {loanding ? (
        <LoandingBox />
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="col col-md-6 d-flex justify-content-center">
              <img
                src={product.image}
                alt={product.name}
                className="img-large"
              ></img>
            </div>
            <div className="col col-md-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                </li>
                <li className="list-group-item">
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li className="list-group-item">Price: ${product.price}</li>
                <li className="list-group-item">
                  Description: ${product.description}
                </li>
              </ul>
            </div>
            <div className="col col-md-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Price:</div>
                    <div className="col">${product.price}</div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col">Status:</div>
                    <div className="col">
                      {product.countInStock > 0 ? (
                        <div className="badge text-bg-success"> In Stock</div>
                      ) : (
                        <div className="badge text-bg-danger">Unavailable</div>
                      )}
                    </div>
                  </div>
                </li>

                {product.countInStock > 0 && (
                  <li className="list-group-item">
                    <div className="d-grid">
                      <button
                        onClick={addToCartHandler}
                        className="btn btn-dark"
                      >
                        Add to cart
                      </button>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductScreen;
