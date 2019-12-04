import { observable, action, flow } from 'mobx';
import { createContext } from 'react';

import api from '../api';

import sampleData from '../common/sampleData';

class PartnerStore {
    @observable partners = sampleData.partners;
}

export const PartnerStoreContext: React.Context<PartnerStore> = createContext(new PartnerStore());
