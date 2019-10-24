import 'styled-components';

declare module 'styled-components' {
    export interface ITheme {
        lightShadow: string;
        colors: {
            lightGrey: string;
            danger: string;
            success: string;
            warning: string;
            white: string;
            primary: string;
            lightColor1: string;
            text: string;
            lightText: string;
        };
    }
}
