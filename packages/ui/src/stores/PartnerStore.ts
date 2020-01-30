import { observable, computed } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { Partner, PartnerType } from '@shared/types';
import api from '../api';
import { paginatedData } from '../util/helpers';

class PartnerStore {
    private PARTNER_LIMIT = 20;

    @observable paginatedPartners = paginatedData<Partner>();

    @task
    fetchPartners = async () => {
        const partners = await api.fetchPartners({
            limit: this.PARTNER_LIMIT
        });

        this.paginatedPartners = partners;

        return partners.data;
    };

    @task
    fetchMorePartners = async () => {
        const partners = await api.fetchPartners({
            limit: this.PARTNER_LIMIT,
            cursor: this.paginatedPartners.pageInfo.cursor
        });

        this.paginatedPartners = { ...partners, data: [...this.paginatedPartners.data, ...partners.data] };
    };

    @task
    searchPartners = async (type: PartnerType, query: string) => {
        const partners = await api.searchPartners({
            type,
            generalQuery: query
        });

        return partners;
    };

    @computed
    get partners() {
        return this.paginatedPartners.data;
    }
}

const PartnerStoreContext: React.Context<PartnerStore> = createContext(new PartnerStore());

export default PartnerStoreContext;
