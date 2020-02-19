import { observable, computed, flow, action } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { Partner, PartnerType, SearchPartnerInput } from '@shared/types';
import api from '../api';
import { uiStore } from './UIStore';
import { paginatedData } from '../util/helpers';

interface FetchOptions {
  keepStoreValue?: boolean;
  globalLoader?: boolean;
}

class PartnerStore {
  private PARTNER_LIMIT = 25;

  @observable paginatedPartners = paginatedData<Partner>();

  @task
  fetchPartners = async (filter?: SearchPartnerInput, opts?: FetchOptions) => {
    const safeFilter = filter || {};
    const safeOpts = opts || {};
    const { keepStoreValue, globalLoader } = safeOpts;

    if (globalLoader) uiStore.setLoading(true);

    const partners = await api.fetchPartners({
      ...safeFilter,
      pagination: { limit: this.PARTNER_LIMIT }
    });

    if (globalLoader) uiStore.setLoading(false);

    if (!keepStoreValue) {
      this.paginatedPartners = partners;
    }

    return partners.data;
  };

  @task
  fetchMorePartners = async (filter?: SearchPartnerInput) => {
    uiStore.setLoading(true);

    const safeFilter = filter || {};
    const partners = await api.fetchPartners({
      ...safeFilter,
      pagination: { cursor: this.paginatedPartners.pageInfo.cursor, limit: this.PARTNER_LIMIT }
    });

    uiStore.setLoading(false);

    this.paginatedPartners.pageInfo = partners.pageInfo;
    this.paginatedPartners.data.push(...partners.data);
  };

  @task
  addPartner = async (partner: Partner) => {
    uiStore.setLoading(true);

    try {
      await api.addPartner(partner);
    } catch (err) {
      throw err;
    } finally {
      uiStore.setLoading(false);
    }
  };

  @computed
  get partners() {
    return this.paginatedPartners.data;
  }
}

const PartnerStoreContext: React.Context<PartnerStore> = createContext(new PartnerStore());

export default PartnerStoreContext;
