import { observable, action, flow } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { Unit, ItemType, PartnerType, InvoiceType } from '@shared/types';
import api from '../api';

class CommonStore {
    @observable units: Unit[] = [];
    
    @observable itemTypes: ItemType[] = [];
    @observable partnerTypes: PartnerType[] = [];
    @observable invoiceTypes: InvoiceType[] = [];

    @task
    initialize = async () => {
        this.fetchUnits();
        this.fetchTypes();
    };

    @task
    fetchUnits = async () => {
        const units = await api.fetchUnits();

        this.units = units;
    };

    @task
    addUnit = async (unit: Unit) => {
        const unitId = await api.addUnit(unit);
        unit.id = unitId;

        this.units.push(unit);
    };

    @task
    fetchTypes = async () => {
        const types = await api.fetchTypes();

        this.itemTypes = types.itemTypes;
        this.partnerTypes = types.partnerTypes;
        this.invoiceTypes = types.invoiceTypes;
    };
}

const CommonStoreContext: React.Context<CommonStore> = createContext(new CommonStore());

export default CommonStoreContext;
