import axios from 'axios';
import productApi from './products';
import authApi from './auth';
import warehouseApi from './warehouses';
import purchaseApi from './purchases';

interface IRequestArgs {
    url: string;
    data?: any;
    mockData?: any;
}

interface IRequest {
    get<T>(args: IRequestArgs): Promise<T>;
    put<T>(args: IRequestArgs): Promise<T>;
    post<T>(args: IRequestArgs): Promise<T>;
    delete<T>(args: IRequestArgs): Promise<T>;
}

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API_URL = process.env.NODE_ENV === 'production' ? 'https://warehop.ml/api' : 'http://localhost:8080';

const baseRequest = async <T>({ url, data, mockData }: IRequestArgs, method: HTTPMethod) => {
    const token = localStorage.getItem('access_token');
    let dataKey = '';

    if (method === 'GET' || method === 'DELETE') dataKey = 'params';
    else dataKey = 'data';

    try {
        if (mockData) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockData;
        }

        const res = await axios({
            baseURL: API_URL,
            method,
            url,
            [dataKey]: data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const result: T = res.data;

        return result;
    } catch (err) {
        throw err;
    }
};

export const request: IRequest = {
    get: async <T>(args: IRequestArgs) => await baseRequest<T>(args, 'GET'),
    put: async <T>(args: IRequestArgs) => await baseRequest<T>(args, 'PUT'),
    post: async <T>(args: IRequestArgs) => await baseRequest<T>(args, 'POST'),
    delete: async <T>(args: IRequestArgs) => await baseRequest<T>(args, 'DELETE')
};

export default {
    ...authApi,
    ...productApi,
    ...warehouseApi,
    ...purchaseApi
};
