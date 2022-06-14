import { Product } from '../model';
import { axiosClient } from './axios';

export const query = {
    product: {
        list: async (filter: any) => {
            return axiosClient
                .get(`/shoppe?_sort=id&_order=desc&${filter}`)
                .then((res) => res);
        },
        item: async (id: number) => {
            return axiosClient
                .get(`/shoppe?id=${id}`)
                .then((res) => res.data[0]);
        },
        add: async (data: Product) => {
            return axiosClient.post('/shoppe', data).then((res) => res);
        },
        update: async (id: number, data: any) => {
            return axiosClient.put(`/shoppe/${id}`, data).then((res) => res);
        },
        search: async (text: any) => {
            return axiosClient.get(`/shoppe?name_like=${text}&_page=1&_limit=12&_sort=id&_order=desc`).then((res) => res);
        },
    },
};
