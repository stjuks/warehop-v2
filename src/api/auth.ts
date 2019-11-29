import { request } from './index';

const login = async (data: { username: string; password: string }) => {
    return await request.post({ url: '/auth/login', data });
};

export default {
    login
};
