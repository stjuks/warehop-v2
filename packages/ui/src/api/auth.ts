import { request } from './index';
import endpoints from 'shared/endpoints';

const login = async (data: { username: string; password: string }) => {
    return await request.post({ url: endpoints.login, data });
};

export default {
    login
};
