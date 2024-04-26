import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Lato"
  },
  primary: {
    light: '#8fcafa',
    main: '#1297f6',
    dark: '#0666c3',
    contrastText: '#fff',
  },
  secondary: {
    light: '#834bff', 
    main: '#651fff',
    dark: '#4615b2',
    contrastText: '#000',
  },
});

export default theme;
