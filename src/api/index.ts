import axios from 'axios';
import productApi from './products';
import authApi from './auth';
import warehouseApi from './warehouses';

interface IRequestArgs {
    url: string;
    data?: any;
    mockData?: any;
}

interface IRequest {
    get(args: IRequestArgs): Promise<any>;
    put(args: IRequestArgs): Promise<any>;
    post(args: IRequestArgs): Promise<any>;
    delete(args: IRequestArgs): Promise<any>;
}

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const API_URL = process.env.NODE_ENV === 'production' ? 'https://warehop.ml/api' : 'http://localhost:8080';

const baseRequest = async <T>({ url, data, mockData }: IRequestArgs, method: HTTPMethod) => {
    const token = localStorage.getItem('access_token');
    let dataKey = '';

    if (method === 'GET' || method === 'POST') dataKey = 'params';
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
    ...warehouseApi
};
