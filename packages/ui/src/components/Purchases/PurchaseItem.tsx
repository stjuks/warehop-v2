import React from 'react';
import moment from 'moment';
import currency from 'currency.js';

import routes from '../../util/routes';
import { PurchaseItemContainer, DaysLeftStyled } from './styles';
import { Invoice } from '@shared/types';
import { FiChevronRight } from 'react-icons/fi';

const PurchaseItem: React.FC<Invoice> = props => {
    const { number, sum, partner, id, dueDate, isPaid } = props;

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

    const formattedSum = currency(sum).toString();

    return (
        <PurchaseItemContainer to={{ pathname: `${routes.purchases}/${id}`, purchase: props }}>
            <div className="col-1">
                <div className="row-1">
                    <div className="partner-name">{partner.name}</div>
                    <div className="sum">{formattedSum}€</div>
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
