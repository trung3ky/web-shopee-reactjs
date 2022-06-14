import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './product-slice';

const rootReducer = {
    productList: productListReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
