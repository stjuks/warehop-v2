import { observable, computed } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { ProductItem, ExpenseItem, AddItemInput, ItemQueryInput, ItemInput } from '@shared/types';
import api from '../api';
import { paginatedData } from '../util/helpers';
import { uiStore } from './UIStore';

class ItemStore {
  private ITEM_LIMIT = 25;

  @observable paginatedProducts = paginatedData<ProductItem>();
  @observable paginatedServices = paginatedData<ExpenseItem>();

  @task
  fetchProducts = async (filter?: ItemQueryInput) => {
    /* uiStore.setLoading(true);

    const safeFilter = filter || {};

    const products = await api.fetchProducts({
      ...safeFilter,
      pagination: {
        limit: this.ITEM_LIMIT
      }
    });

    uiStore.setLoading(false);

    this.paginatedProducts = products;

    return products.data; */
  };

  @task
  fetchMoreProducts = async (filter?: ItemQueryInput) => {
    /* uiStore.setLoading(true);

    const safeFilter = filter || {};

    const products = await api.fetchProducts({
      ...safeFilter,
      pagination: { cursor: this.paginatedProducts.pageInfo.cursor, limit: this.ITEM_LIMIT }
    });

    uiStore.setLoading(false);

    this.paginatedProducts.pageInfo = products.pageInfo;
    this.paginatedProducts.data.push(...products.data); */
  };

  @task
  fetchProduct = async (id: number) => {
    /* uiStore.setLoading(true);

    const product = await api.fetchProduct(id);

    uiStore.setLoading(false);

    return product; */
  };

  @task
  editProduct = async (item: ProductItem) => {
    /* const itemInput = {
      ...item,
      partnerId: item.partner?.id,
      unitId: item.unit.id
    };

    delete itemInput.unit;
    delete itemInput.partner;
    delete itemInput.id;

    if (item.id) await api.editItem(item.id, itemInput); */
  };

  @task
  fetchServices = async () => {
    /* const services = await api.fetchServices({
      limit: this.ITEM_LIMIT
    });

    this.paginatedServices = services; */
  };

  @task
  fetchMoreServices = async () => {
    /* const services = await api.fetchServices({
      limit: this.ITEM_LIMIT,
      cursor: this.paginatedServices.pageInfo.cursor
    });

    this.paginatedServices.pageInfo = services.pageInfo;
    this.paginatedServices.data.push(...services.data); */
  };

  @task
  addProduct = async (product: ProductItem) => {
    /* const itemInput: AddItemInput = {
      ...product,
      partnerId: product.partner && product.partner.id,
      unitId: product.unit.id
    };

    const id = await api.addItem(itemInput);
    product.id = id;

    this.paginatedProducts.data.push(product); */
  };

  @task
  deleteItem = async (id?: number) => {
    /* try {
      if (id) await api.deleteItem(id);
    } catch (err) {
      throw err;
    } */
  };

  @computed
  get products() {
    return this.paginatedProducts.data;
  }

  @computed
  get services() {
    return this.paginatedServices.data;
  }
}

const ItemStoreContext: React.Context<ItemStore> = createContext(new ItemStore());

export default ItemStoreContext;
