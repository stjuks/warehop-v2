import React, { useContext, useState, useEffect } from 'react';

import Link from '../util/Link';
import Header from '../Header';
import { Transaction } from '@shared/types';
import routes from '../../util/routes';
import ContentContainer from '../util/ContentContainer';
import TransactionStoreContext from '@ui/stores/TransactionStore';
import { RouteComponentProps } from 'react-router';

const TransactionDetails: React.FC<Transaction & RouteComponentProps> = props => {
  const transactionStore = useContext(TransactionStoreContext);
  const [transaction, setTransaction] = useState<Transaction>();

  const headerIcons = [];

  useEffect(() => {
    const fetchTransaction = async () => {
      const { id }: any = props.match.params;

      if (id) {
        const loadedTransaction = await transactionStore.fetchTransaction(id);

        setTransaction(loadedTransaction);
      }
    };

    fetchTransaction();
  }, []);

  return (
    <>
      <Header
        title="Kauba detailid"
        components={headerIcons}
        backTo={transaction?.type === 'EXPENSE' ? routes.expenses : routes.incomes}
      />
      <ContentContainer padded>
        {transaction && (
          <>
            <Link
              to={
                transaction.invoice.type === 'PURCHASE'
                  ? `${routes.purchases}/${transaction.invoice.id}`
                  : `${routes.sales}/${transaction.invoice.id}`
              }
            >
              {transaction.invoice.number}
            </Link>
          </>
        )}
      </ContentContainer>
    </>
  );
};

export default TransactionDetails;
