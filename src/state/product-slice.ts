import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { query } from '../access';

export const productList: any = createAsyncThunk(
    'product/list',
    async (filter: string, {rejectWithValue}) => {
        try {
            const res = await query.product.list(filter);

            return {data: res.data, total: res.headers['x-total-count']};
        } catch (error: any) {
            return rejectWithValue(error)
        }
    }
);

export const productItem: any = createAsyncThunk(
    'product/item',
    async (id: number = 1) => {
        const res = await query.product.item(id);

        return { data: res, id: id };
    }
);

const slice = createSlice({
    name: 'product',
    initialState: {
        listIdData: [],
        itemIdData: 1,
        listData: {},
        totalProduct: 0
    },
    reducers: {
        item: (state: any, action: { payload: any }) => {
            state.itemIdData = action.payload;
        },
    },
    extraReducers: {
        [productList.fulfilled]: (state: any, action: { payload: any }) => {
            const {data, total} = action.payload

            state.listIdData = [];
            state.totalProduct = total
            data.map((item: any) => {
                state.listIdData.push(item.id);
                state.listData = { ...state.listData, [item.id]: item };
                return '';
            });
        },
        [productList.rejected]: (state: any, action: { payload: any }) => {
            throw new Error(action.payload)
        },
        [productItem.fulfilled]: (state: any, action: { payload: any }) => {
            const { id, data } = action.payload;

            state.itemIdData = id;
            state.listData = { ...state.listData, [id]: data };
        }
    },
});

const { reducer, actions } = slice;

export const { item } = actions;
export default reducer;
