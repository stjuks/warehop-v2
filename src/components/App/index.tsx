import React from 'react';
import { ThemeProvider } from 'styled-components';

import { AppContainer } from './styles';
import theme from '../../util/theme';
import Header from '../Header';
import Footer from '../Footer';
import ProductItem from '../ProductItem';
import Products from '../Products';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <Products />
            </AppContainer>
        </ThemeProvider>
    );
}

export default App;
