import { getAllProduct } from '../../common/apis/product.api';
import * as ActionTypes from '../ActionTypes';

export const loadingProduct = () => (dispatch) => {
    dispatch({ type: ActionTypes.LOADING_PRODUCT })
}

export const errorProduct = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_PRODUCT, payload: error })
}

export const getProduct = () => (dispatch) => {
    console.log("Hello");
    try {
        // fetch('http://0.0.0.0:3004/product', {
        //     method: 'GET', // or 'PUT',
        //     headers: {
        //         'Accept': "application/json"
        //     }, 
        // })
        // getAllProduct()
        //     .then(({data}) => {
        //         dispatch({ type: ActionTypes.GET_PRODUCT, payload: data })
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        dispatch({type: ActionTypes.GET_PRODUCT});
    } catch (e) {
        errorProduct(e) 
    }
}

export const setProduct = (product) => (dispatch) => {
    dispatch({type: ActionTypes.RETRIEVED_PRODUCT, payload: product.data})
}

export const deleteProduct = (id) => (dispatch) => {
    try {
        fetch('http://localhost:3004/product/' + id, {
            method: 'DELETE', // or 'PUT',
        })
            .then(() => {
                console.log("OKKK");
                dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: id })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } catch (e) {
        errorProduct(e)
    }
}

export const insertData = (data) => (dispatch) => {
    try{
        let fData = {
            id: Math.floor(Math.random() * 1000),
            ...data
        }
        fetch('http://localhost:3004/product/', {
            method: 'POST', // or 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(fData),
        })
            .then(() => {
                dispatch({ type: ActionTypes.INSERT_PRODUCT, payload: fData })
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } catch (e) {
        errorProduct(e)
    }
}