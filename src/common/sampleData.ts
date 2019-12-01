import { Warehouse, Partner, Unit, Product, Invoice } from './types';

const warehouses: Warehouse[] = [
    {
        id: 1,
        name: 'Ladu 1'
    },
    {
        id: 2,
        name: 'Ladu 2'
    }
];

const partners: Partner[] = [
    {
        id: 1,
        type: 'CLIENT',
        name: 'Sevi kodukaubad OÜ'
    },
    {
        id: 2,
        type: 'VENDOR',
        name: 'Circle K'
    },
    {
        id: 3,
        type: 'VENDOR',
        name: 'Euronics AS'
    }
];

const units: Unit[] = [
    {
        id: 1,
        name: 'Tükk',
        abbreviation: 'tk'
    },
    {
        id: 2,
        name: 'Kilogramm',
        abbreviation: 'kg'
    },
    {
        id: 3,
        name: 'Gramm',
        abbreviation: 'g'
    }
];

const products: Product[] = [
    {
        id: 1,
        name: 'Külmkapp Electrolux',
        retailPrice: 430.99,
        purchasePrice: 250.99,
        code: 'AB239939201',
        unit: units[0],
        description: 'Lahe kaup',
        quantity: 7,
        quantityByWarehouse: [
            { ...warehouses[0], quantity: 3 },
            { ...warehouses[1], quantity: 4 }
        ],
        vendor: partners[1]
    },
    {
        id: 2,
        name: 'Pliit Electrolux',
        retailPrice: 349.99,
        purchasePrice: 159.99,
        code: 'EL2967218',
        description: 'Lahe kaup',
        unit: units[0],
        quantity: 3,
        quantityByWarehouse: [{ ...warehouses[0], quantity: 3 }],
        vendor: partners[1]
    },
    {
        id: 3,
        name: 'Kõrvaklapid Philips',
        retailPrice: 24.99,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula finibus luctus. Quisque nec ligula justo. Nam interdum interdum blandit.',
        purchasePrice: 15.99,
        code: 'PH4932049',
        unit: units[0],
        quantity: 1,
        quantityByWarehouse: [{ ...warehouses[1], quantity: 1 }],
        vendor: partners[1]
    }
];

const purchases: Invoice[] = [
    {
        id: 1,
        type: 'PURCHASE',
        number: 'A29030239',
        creationDate: new Date('11-25-2019'),
        dueDate: new Date('12-03-2019'),
        partner: partners[1],
        sum: 100.99,
        isPaid: false,
        description: 'Ülekanne',
        items: [
            products[0],
            products[1]
        ]
    },
    {
        id: 2,
        type: 'PURCHASE',
        number: 'A129031923',
        creationDate: new Date('11-25-2019'),
        dueDate: new Date('12-16-2019'),
        partner: partners[2],
        sum: 100.99,
        isPaid: true,
        description: 'Ülekanne'
    }
];

const sales: Invoice[] = [
    {
        id: 3,
        type: 'SALE',
        number: '19021231',
        creationDate: new Date('11-25-2019'),
        dueDate: new Date('12-16-2019'),
        partner: partners[1],
        sum: 100.99,
        isPaid: true,
        description: 'Ülekanne'
    },
    {
        id: 4,
        type: 'SALE',
        number: '19203191',
        creationDate: new Date('10-25-2019'),
        dueDate: new Date('11-16-2019'),
        partner: partners[1],
        sum: 100.99,
        isPaid: false,
        description: 'Ülekanne'
    }
];

const sampleData = {
    products,
    units,
    partners,
    warehouses,
    purchases,
    sales
};

export default sampleData;
