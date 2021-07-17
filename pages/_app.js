import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { AlurakutStyles } from '../src/lib/OrkutCommons';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');
   
  
  
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
  }

  body {   
    font-family: 'Rubik', sans-serif;
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img{
    max-width: 100%;
    height: auto;
    display: block ;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}



export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
