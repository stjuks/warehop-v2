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
import HamburgerMenu from '../HamburgerMenu';
import InvoiceDetails from '../InvoiceDetails';

const App = () => {
    const warehouseStore = useContext(WarehouseStoreContext);
    const partnerStore = useContext(PartnerStoreContext);
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
                            <Route path={routes.ProductForm} component={ProductForm} />
                            <Route path={routes.productDetails} component={ProductDetails} />
                            <Route path={routes.products} component={Products} />
                            <Route path={routes.purchaseForm} component={PurchaseForm} />
                            <Route path={routes.purchaseDetails} component={InvoiceDetails} />
                            <Route path={routes.purchases} component={Purchases} />
                            <Route path={routes.saleDetails} component={InvoiceDetails} />
                            <Route path={routes.sales} component={Sales} />
                        </Switch>
                        <Footer />
                        <HamburgerMenu />
                    </AppContainer>
                </IconContext.Provider>
            </Router>
        </ThemeProvider>
    );
};

export default App;
