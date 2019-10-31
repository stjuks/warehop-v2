import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Router, Switch, Route } from 'react-router-dom';

import history from '../../common/history';
import { AppContainer } from './styles';
import theme from '../../util/theme';
import routes from '../../common/routes';
import Products from '../Products';
import ProductDetails from '../ProductDetails';
import NewProduct from '../NewProduct';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <AppContainer>
                    <Switch>
                        <Route
                            path={routes.newProduct}
                            component={NewProduct}
                        />
                        <Route
                            path={routes.productDetails}
                            component={ProductDetails}
                        />
                        <Route path={routes.products} component={Products} />
                    </Switch>
                </AppContainer>
            </Router>
        </ThemeProvider>
    );
}

export default App;
