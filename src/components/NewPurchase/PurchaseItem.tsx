import React from 'react';
import { $, multiply } from 'moneysafe';

import { PurchaseItemContainer } from './styles';
import { InvoiceItem } from '../../common/types';

interface PurchaseItemProps {
    item: InvoiceItem;
    onDelete: () => any;
    onEdit: () => any;
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({ item, onDelete, onEdit }) => {
    const summedPrice = multiply($(item.quantity), $(item.purchasePrice)).toString();
    const formattedPrice = $(item.purchasePrice).toString();

    const itemTypes = {
        SERVICE: 'Teenus',
        PRODUCT: 'Laoartikkel'
    };

    return (
        <PurchaseItemContainer>
            <div className="row row-1">
                <span className="item-name">{item.name}</span>
                <span className="item-sum">{summedPrice}€</span>
            </div>
            <div className="row row-2">
                <span className="item-code">{item.code}</span>
                <span className="item-quantity-price">
                    {item.quantity}
                    {item.unit && item.unit.abbreviation} × {formattedPrice}€
                </span>
            </div>
            <div className="row row-3">
                <span className="item-type">{item.warehouse ? item.warehouse.name : itemTypes[item.type]}</span>
                <span className="item-actions">
                    <button className="edit-item-btn" onClick={onEdit}>
                        Muuda
                    </button>
                    <button className="delete-item-btn" onClick={onDelete}>
                        Kustuta
                    </button>
                </span>
            </div>
        </PurchaseItemContainer>
    );
};

export default PurchaseItem;
