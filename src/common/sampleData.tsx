import { IProduct, IProductDetailed } from './types';

interface ISampleData {
    products: IProductDetailed[];
}

const sampleData: ISampleData = {
    products: [
        {
            id: 1,
            name: 'Külmkapp Electrolux',
            retailPrice: 430.99,
            purchasePrice: 250.99,
            quantity: 5,
            code: 'AB239939201',
            unit: { id: 1, abbr: 'tk', name: 'Tükk' },
            description: 'Lahe kaup',
            warehouses: [
                {
                    id: 1,
                    name: 'Ladu 1',
                    quantity: 5
                }
            ],
            partner: {
                id: 1,
                name: 'Sevi kodukaubad OÜ'
            }
        },
        {
            id: 2,
            name: 'Pliit Electrolux',
            retailPrice: 349.99,
            purchasePrice: 159.99,
            quantity: 1,
            code: 'EL2967218',
            description: 'Lahe kaup',
            unit: { id: 1, abbr: 'tk', name: 'Tükk' },
            warehouses: [
                {
                    id: 1,
                    name: 'Ladu 1',
                    quantity: 4
                }
            ],
            partner: {
                id: 1,
                name: 'Sevi kodukaubad OÜ'
            }
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
            unit: { id: 1, abbr: 'tk', name: 'Tükk' },
            warehouses: [
                {
                    id: 1,
                    name: 'Ladu 1',
                    quantity: 2
                }
            ],
            partner: {
                id: 1,
                name: 'Sevi kodukaubad OÜ'
            }
        }
    ]
};

export default sampleData;
