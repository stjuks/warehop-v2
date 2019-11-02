import { IProductDetailed, IPartner, IUnit, IWarehouse } from './types';

interface ISampleData {
    products: IProductDetailed[];
    units: IUnit[],
    partners: IPartner[],
    warehouses: IWarehouse[]
}

const warehouses: IWarehouse[] = [
    {
        id: 1,
        name: 'Ladu 1'
    },
    {
        id: 2,
        name: 'Ladu 2'
    }
];

const partners: IPartner[] = [
    {
        id: 1,
        name: 'Sevi kodukaubad OÜ'
    },
    {
        id: 2,
        name: 'Circle K'
    },
    {
        id: 3,
        name: 'Euronics AS'
    }
];

const units: IUnit[] = [
    {
        id: 1,
        name: 'Tükk',
        abbr: 'tk'
    },
    {
        id: 2,
        name: 'Kilogramm',
        abbr: 'kg'
    },
    {
        id: 3,
        name: 'Gramm',
        abbr: 'g'
    }
];

const products: IProductDetailed[] = [
    {
        id: 1,
        name: 'Külmkapp Electrolux',
        retailPrice: 430.99,
        purchasePrice: 250.99,
        quantity: 5,
        code: 'AB239939201',
        unit: units[0],
        description: 'Lahe kaup',
        warehouses: [{ ...warehouses[0], quantity: 5 }],
        partner: partners[0]
    },
    {
        id: 2,
        name: 'Pliit Electrolux',
        retailPrice: 349.99,
        purchasePrice: 159.99,
        quantity: 1,
        code: 'EL2967218',
        description: 'Lahe kaup',
        unit: units[0],
        warehouses: [{ ...warehouses[1], quantity: 3 }],
        partner: partners[1]
    },
    {
        id: 3,
        name: 'Kõrvaklapid Philips',
        retailPrice: 24.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula finibus luctus. Quisque nec ligula justo. Nam interdum interdum blandit.',
        purchasePrice: 15.99,
        quantity: 8,
        code: 'PH4932049',
        unit: units[0],
        warehouses: [{ ...warehouses[1], quantity: 2 }],
        partner: partners[2]
    }
]

const sampleData: ISampleData = {
    products,
    units,
    partners,
    warehouses
};

export default sampleData;
