import { RootState } from './store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductType, PRODUCT_IMAGE_MAP } from '../data/products'
import data from '../data/products.ts'

interface State {
  products: ProductType[];
  status: string;
  error: string | null;
  data: ProductType[];
}

const initialState : State = {
  products: data,
  status: 'idle',
  error: null,
  data: data
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // return fetch("http://103.28.121.57/api/products")
	// 	.then((response) => response.json())
	// 	.then((json) => json)
  const response = await fetch("http://103.28.121.57/api/products")
  return response.json()
})

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchProducts.pending as any]: (state, action) => {
      state.status = 'loading'
    },
    [fetchProducts.fulfilled as any]: (state, action) => {
      state.status = 'succeeded'
      const { payload } = action
      payload.products.forEach((product : ProductType) => {
        product.featuredImage = PRODUCT_IMAGE_MAP[product.name].featuredImage
        product.images = PRODUCT_IMAGE_MAP[product.name].images
      })
      state.products = action.payload.products
    },
    [fetchProducts.rejected as any]: (state, action) => {
      state.status = 'failed'
    }
  }
})


export const {  } = productsSlice.actions
export const selectProducts = (state : RootState) => state.products.data
export const selectHeadphones = (state : RootState) => state.products.data.filter(product => product.category === 'headphones')
export const selectSpeakers = (state : RootState) => state.products.data.filter(product => product.category === 'speakers')
export const selectEarphones = (state : RootState) => state.products.data.filter(product => product.category === 'earphones')
export const selectProductsByCategory = (state : RootState, category : string) => state.products.products.filter(product => product.category === category)
export const selectProductById   = (state : RootState, id : number)  => state.products.products.find((product : ProductType) => product.id === id) as ProductType
export const selectProductIfFeatured = (state : RootState) => state.products.products.filter(product => product.is_featured)

export default productsSlice.reducer