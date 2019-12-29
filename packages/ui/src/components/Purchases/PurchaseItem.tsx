import React from 'react';
import moment from 'moment';

import routes from '../../common/routes';
import { PurchaseItemContainer, DaysLeftStyled } from './styles';
import { Invoice } from 'shared/types';
import { FiChevronRight } from 'react-icons/fi';

const PurchaseItem: React.FC<Invoice> = ({ number, sum, partner, id, dueDate, creationDate, isPaid }) => {
    const getDaysUntilDueDate = () => {
        let text = '';
        let diff: number | undefined = undefined;

        if (isPaid) text = 'Makstud';
        else {
            diff = moment(dueDate).diff(moment(), 'days');
            text = `${diff} päeva`;
        }

        return (
            <DaysLeftStyled isPaid={isPaid} diff={diff}>
                {text}
            </DaysLeftStyled>
        );
    };

    return (
        <PurchaseItemContainer to={`${routes.purchases}/${id}`}>
            <div className="col-1">
                <div className="row-1">
                    <div className="partner-name">{partner.name}</div>
                    <div className="sum">{sum}€</div>
                </div>
                <div className="row-2">
                    <div className="invoice-nr">#{number}</div>
                    <div className="days-left">{getDaysUntilDueDate()}</div>
                </div>
            </div>
            <div className="col-2">
                <FiChevronRight />
            </div>
        </PurchaseItemContainer>
    );
};

export default PurchaseItem;
