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
import { theme } from '../../util/styled';
import routes from '../../util/routes';
import Products from '../Products';
import ProductDetails from '../ProductDetails';
import NewProduct from '../NewProduct';
import NewPurchase from '../NewPurchase';
import Purchases from '../Purchases';
import Footer from '../Footer';
import HamburgerMenu from '../HamburgerMenu';
import PurchaseDetails from '../PurchaseDetails';

const App = () => {
    const warehouseStore = useContext(WarehouseStoreContext);
    const partnerStore = useContext(PartnerStoreContext);
    const commonStore = useContext(CommonStoreContext);

    const clearSavedForms = () => {
        Object.keys(localStorage).forEach(key => {
            if (key.includes('form')) localStorage.removeItem(key);
        });
    };

    useEffect(() => {
        window.addEventListener('beforeunload', e => {
            clearSavedForms();
        });

        warehouseStore.fetchWarehouses();
        commonStore.initialize();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <IconContext.Provider value={{ className: 'react-icon' }}>
                    <AppContainer>
                        <Switch>
                            <Route path={routes.newProduct} component={NewProduct} />
                            <Route path={routes.productDetails} component={ProductDetails} />
                            <Route path={routes.products} component={Products} />
                            <Route path={routes.newPurchase} component={NewPurchase} />
                            <Route path={routes.purchaseDetails} component={PurchaseDetails} />
                            <Route path={routes.purchases} component={Purchases} />
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
