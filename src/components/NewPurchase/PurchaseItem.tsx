import React from 'react';
import { $, multiply } from 'moneysafe';

import { PurchaseItemContainer } from './styles';
import { InvoiceItem } from '../../common/types';
import { FiDelete, FiEdit, FiTrash2 } from 'react-icons/fi';

interface PurchaseItemProps {
    item: InvoiceItem;
    onDelete: () => any;
    onEdit: () => any;
}

const PurchaseItem: React.FC<PurchaseItemProps> = ({ item, onDelete, onEdit }) => {
    const summedPrice = multiply($(item.quantity), $(item.purchasePrice)).toString();
    const formattedPrice = $(item.purchasePrice).toString();

    return (
        <PurchaseItemContainer>
            <div className="action-items">
                <button className="btn btn__delete" onClick={onEdit}><FiEdit /></button>
                <button className="btn btn__edit" onClick={onDelete}><FiTrash2 /></button>
            </div>
            <div className="row row-1">
                <span className="attr-1">{item.name}</span>
                <span className="attr-2">{summedPrice}€</span>
            </div>
            <div className="row row-2">
                <span className="attr-3">{item.code}</span>
                <span className="attr-4">
                    {item.quantity}
                    {item.unit && item.unit.abbreviation} × {formattedPrice}€
                </span>
            </div>
            <div className="row row-3">
                <span className="attr-5">{item.warehouse && item.warehouse.name}</span>
                <span className="attr-6">{item.type.name}</span>
            </div>
        </PurchaseItemContainer>
    );
};

export default PurchaseItem;
