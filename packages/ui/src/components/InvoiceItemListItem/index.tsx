import React from 'react';
import currency from 'currency.js';

import { InvoiceItemListItemContainer } from './styles';
import { InvoiceItem } from '@shared/types';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { itemTypeTranslations } from '../../util/translations';

interface InvoiceItemListItemProps {
  item: InvoiceItem;
  onDelete?: () => any;
  onEdit?: () => any;
  style?: any;
}

const InvoiceItemListItem: React.FC<InvoiceItemListItemProps> = ({
  item,
  onDelete,
  onEdit,
  style
}) => {
  const summedPrice = currency(item.price)
    .multiply(item.quantity)
    .toString();
  const formattedPrice = currency(item.price).toString();

  return (
    <InvoiceItemListItemContainer style={style}>
      <div className='action-items'>
        {onEdit && (
          <button className='btn btn__delete' onClick={onEdit} type='button'>
            <FiEdit />
          </button>
        )}
        {onDelete && (
          <button className='btn btn__edit' onClick={onDelete} type='button'>
            <FiTrash2 />
          </button>
        )}
      </div>
      <div className='row row-1'>
        <span className='attr-1'>{item.name}</span>
        <span className='attr-2'>{summedPrice}€</span>
      </div>
      <div className='row row-2'>
        <span className='attr-3'>{item.code}</span>
        <span className='attr-4'>
          {item.quantity}
          {item.unit && item.unit.abbreviation} × {formattedPrice}€
        </span>
      </div>
      <div className='row row-3'>
        <span className='attr-5'>{item.warehouse && item.warehouse.name}</span>
        <span className='attr-6'>{itemTypeTranslations[item.type]}</span>
      </div>
    </InvoiceItemListItemContainer>
  );
};

export default InvoiceItemListItem;
