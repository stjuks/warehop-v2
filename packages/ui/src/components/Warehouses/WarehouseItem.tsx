import React from 'react';
import { Warehouse } from '@shared/types';
import { WarehouseItemContainer } from './styles';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface WarehouseItemProps {
  warehouse: Warehouse;
  onDelete: (warehouse: Warehouse) => any;
  onEdit: (warehouse: Warehouse) => any;
}

const WarehouseItem: React.FC<WarehouseItemProps> = ({ warehouse, onDelete, onEdit }) => (
  <WarehouseItemContainer tabIndex={0}>
    {warehouse.name}
    <span className="actions">
      <button onClick={() => onEdit(warehouse)}>
        <FiEdit />
      </button>
      <button onClick={() => onDelete(warehouse)}>
        <FiTrash2 />
      </button>
    </span>
  </WarehouseItemContainer>
);

export default WarehouseItem;
