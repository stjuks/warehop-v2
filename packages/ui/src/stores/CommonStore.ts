import { observable, action, flow } from 'mobx';
import { task } from 'mobx-task';
import { createContext } from 'react';
import { Unit } from 'shared/types';
import api from '../api';

class CommonStore {
    @observable units: Unit[] = [];

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
}

const CommonStoreContext: React.Context<CommonStore> = createContext(new CommonStore());

export default CommonStoreContext;
