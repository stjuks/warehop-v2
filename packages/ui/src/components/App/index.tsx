import React, { useEffect, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Switch, Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'flatpickr/dist/themes/material_green.css';
import PartnerStoreContext from '../../stores/PartnerStore';
import CommonStoreContext from '../../stores/CommonStore';
import WarehouseStoreContext from '../../stores/WarehouseStore';

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
import TransactionForm from '../TransactionForm';
import Modal from '../Modal';
import SaleForm from '../SaleForm';
import Transactions from '../Transactions';

const App = () => {
  const warehouseStore = useContext(WarehouseStoreContext);
  const commonStore = useContext(CommonStoreContext);

  useEffect(() => {
    warehouseStore.fetchWarehouses();
    commonStore.initialize();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <IconContext.Provider value={{ className: 'react-icon' }}>
          <AppContainer>
            <Switch>
              <Route path={routes.partnerForm} component={PartnerForm} />
              <Route path={routes.productForm} component={ProductForm} />
              <Route path={routes.purchaseForm} component={PurchaseForm} />
              <Route path={routes.saleForm} component={SaleForm} />
              <Route path={routes.productDetails} component={ProductDetails} />
              <Route path={routes.purchaseDetails} component={InvoiceDetails} />
              <Route path={routes.saleDetails} component={InvoiceDetails} />
              <Route path={routes.partnerDetails} component={Purchases} />
              <Route path={routes.products} component={Products} />
              <Route path={routes.purchases} component={Purchases} />
              <Route path={routes.sales} component={Sales} />
              <Route path={routes.partners} component={Partners} />
              <Route path={routes.incomes} render={() => <Transactions type="INCOME" />} />
              <Route path={routes.expenses} render={() => <Transactions type="EXPENSE" />} />
            </Switch>
            <Footer />
            <HamburgerMenu />
            <Modal />
          </AppContainer>
        </IconContext.Provider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
