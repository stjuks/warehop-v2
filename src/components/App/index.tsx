import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Switch, Route } from 'react-router-dom';
import { IconContext } from 'react-icons';

import history from '../../common/history';
import { AppContainer } from './styles';
import theme from '../../util/theme';
import routes from '../../common/routes';
import Products from '../Products';
import ProductDetails from '../ProductDetails';
import NewProduct from '../NewProduct';
import Purchases from '../Purchases';
import Footer from '../Footer';
import HamburgerMenu from '../HamburgerMenu';
import { request } from '../../api';

function App() {
    const clearSavedForms = () => {
        Object.keys(localStorage).forEach(key => {
            if (key.includes('form')) localStorage.removeItem(key);
        });
    };

    useEffect(() => {
        window.addEventListener('beforeunload', e => {
            clearSavedForms();
        });
    });

    return (
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <IconContext.Provider value={{ className: 'react-icon' }}>
                    <AppContainer>
                        <Switch>
                            <Route path={routes.newProduct} component={NewProduct} />
                            <Route path={routes.productDetails} component={ProductDetails} />
                            <Route path={routes.products} component={Products} />
                            <Route path={routes.purchases} component={Purchases} />
                        </Switch>
                        <HamburgerMenu />
                    </AppContainer>
                </IconContext.Provider>
            </Router>
        </ThemeProvider>
    );
}

export default App;
