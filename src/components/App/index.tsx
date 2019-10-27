import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AppContainer } from './styles';
import theme from '../../util/theme';
import routes from '../../common/routes';
import Products from '../Products';
import ProductDetails from '../ProductDetails';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AppContainer>
                    <Switch>
                        <Route
                            path={routes.productDetails}
                            component={ProductDetails}
                        />
                        <Route path={routes.products} component={Products} />
                    </Switch>
                </AppContainer>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
