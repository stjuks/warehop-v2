import axios, { AxiosResponse } from 'axios';
import productApi from './products';
import authApi from './auth';
import warehouseApi from './warehouses';
import purchaseApi from './purchases';

interface IRequestArgs<T> {
    url: string;
    data?: any;
    mockData?: T;
}

interface IRequest {
    get<T>(args: IRequestArgs<T>): Promise<T>;
    put<T>(args: IRequestArgs<T>): Promise<T>;
    post<T>(args: IRequestArgs<T>): Promise<T>;
    delete<T>(args: IRequestArgs<T>): Promise<T>;
}

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API_URL = process.env.NODE_ENV === 'production' ? 'https://warehop.ml/api' : 'http://localhost:8080';

const baseRequest = async <T>({ url, data, mockData }: IRequestArgs<T>, method: HTTPMethod) => {
    const token = localStorage.getItem('access_token');
    let dataKey = '';

    if (method === 'GET' || method === 'DELETE') dataKey = 'params';
    else dataKey = 'data';

    try {
        if (mockData) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockData;
        }

        const result = await axios.request<T>({
            baseURL: API_URL,
            method,
            url,
            [dataKey]: data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return result.data;
    } catch (err) {
        throw err;
    }
};

export const request: IRequest = {
    get: async <T>(args: IRequestArgs<T>) => await baseRequest<T>(args, 'GET'),
    put: async <T>(args: IRequestArgs<T>) => await baseRequest<T>(args, 'PUT'),
    post: async <T>(args: IRequestArgs<T>) => await baseRequest<T>(args, 'POST'),
    delete: async <T>(args: IRequestArgs<T>) => await baseRequest<T>(args, 'DELETE')
};

export default {
    ...authApi,
    ...productApi,
    ...warehouseApi,
    ...purchaseApi
};
