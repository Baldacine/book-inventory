import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            primaryDark: string;
            secondary: string;
            secondaryDark: string;
            white: string;
            black: string;
            gray100: string;
            gray300: string;
            gray500: string;
            gray700: string;
            danger: string;
            warning: string;
            success: string;
            background: string;
            text: string;
        };
        spacing: Record<string, string>;
        typography: {
            fontFamily: string;
            fontSizes: Record<string, string>;
            fontWeights: Record<string, number>;
            lineHeights: Record<string, string>;
        };
        borderRadius: {
            sm: string;
            md: string;
            lg: string;
        };
    }
}
