import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";


export function App() { //FRAGMENT (<> </>) É UMA DIV QUE NÃO É REPASSADA AO HTML
 return(
   <>  
     <Header />
     <GlobalStyle />
   </>
 )
}
