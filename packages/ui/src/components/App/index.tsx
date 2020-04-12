import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Switch, Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from '@ui/util/apollo';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'flatpickr/dist/themes/material_green.css';

import history from '../../util/history';
import { AppContainer } from './styles';
import { theme } from '@ui/util/styled';
import routes from '../../util/routes';
import Products from '../Products';
import ProductDetails from '../ProductDetails';
import ProductForm from '../ProductForm';
import PurchaseForm from '../PurchaseForm';
import Sales from '../Sales';
import Purchases from '../Purchases';
import Footer from '../Footer';
import Partners from '../Partners';
import PartnerForm from '../PartnerForm';
import HamburgerMenu from '../HamburgerMenu';
import InvoiceDetails from '../InvoiceDetails';
import TransactionDetails from '../TransactionDetails';
import Modal from '../Modal';
import SaleForm from '../SaleForm';
import Transactions from '../Transactions';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <IconContext.Provider value={{ className: 'react-icon' }}>
          <Router history={history}>
            <AppContainer>
              <Switch>
                <Route path={routes.partnerForm} component={PartnerForm} />
                <Route path={routes.productForm} component={ProductForm} />
                <Route path={routes.purchaseForm} component={PurchaseForm} />
                <Route path={routes.saleForm} component={SaleForm} />
                <Route path={routes.productDetails} component={ProductDetails} />
                <Route path={routes.purchaseDetails} component={InvoiceDetails} />
                <Route path={routes.incomeDetails} component={TransactionDetails} />
                <Route path={routes.expenseDetails} component={TransactionDetails} />
                <Route path={routes.saleDetails} component={InvoiceDetails} />
                <Route path={routes.partnerDetails} component={Purchases} />
                <Route path={routes.products} component={Products} />
                <Route path={routes.purchases} component={Purchases} />
                <Route path={routes.sales} component={Sales} />
                <Route path={routes.partners} component={Partners} />
                <Route
                  path={routes.incomes}
                  render={() => <Transactions type="INCOME" key="INCOME" />}
                />
                <Route
                  path={routes.expenses}
                  render={() => <Transactions type="EXPENSE" key="EXPENSE" />}
                />
              </Switch>
              <Footer />
              <HamburgerMenu />
              <Modal />
            </AppContainer>
          </Router>
        </IconContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
