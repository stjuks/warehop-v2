import { observable, computed } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { Partner, PaginatedData } from 'shared/types';
import api from '../api';

class PartnerStore {
    @observable paginatedPartners: PaginatedData<Partner> = {
        pageInfo: {
            hasNextPage: false,
            cursor: undefined
        },
        data: []
    };

    @task fetchPartners = async (opts: { loadMore?: boolean } = {}) => {
        const { loadMore } = opts;
        const { data } = this.paginatedPartners;

        const partners = await api.fetchPartners({
            limit: 5,
            cursor: loadMore ? this.paginatedPartners.pageInfo.cursor : undefined
        });

        if (!loadMore) this.paginatedPartners = partners;
        else this.paginatedPartners = { ...partners, data: [...data, ...partners.data] };
    };

    @computed
    get partners() {
        return this.paginatedPartners.data;
    }
}

export const PartnerStoreContext: React.Context<PartnerStore> = createContext(new PartnerStore());
