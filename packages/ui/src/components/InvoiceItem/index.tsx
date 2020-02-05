import React from 'react';
import moment from 'moment';
import currency from 'currency.js';

import routes from '@ui/util/routes';
import { InvoiceItemContainer, DaysLeftStyled } from './styles';
import { Invoice } from '@shared/types';

const InvoiceItem: React.FC<Invoice> = props => {
    const { number, sum, partner, id, dueDate, isPaid, type } = props;

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

    const routeProps = {
        pathname: `${type === 'PURCHASE' ? routes.purchases : routes.sales}/${id}`,
        invoice: props
    };

    return (
        <InvoiceItemContainer to={routeProps}>
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
        </InvoiceItemContainer>
    );
};

export default InvoiceItem;
