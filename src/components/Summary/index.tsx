import { useContext } from 'react';
import { Container } from "./styles";
import entradasImg from '../../assets/entradas.svg';
import saidasImg from '../../assets/saidas.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary(){

    const {transactions} = useTransactions();

    const summary = transactions.reduce((acc, transaction) =>{

        if(transaction.type === 'deposit'){
          acc.deposits += transaction.amount;  
          acc.total += transaction.amount;  
        }else{
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }
        return acc;

    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })
    
    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src= {entradasImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', { //USA O PROPRIO BROWSER COM A FUNÇÃO NATIVA Intl PARA FORMATAÇÃO DE MOEDA
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.deposits)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src= {saidasImg} alt="Saídas" />
                </header>
                <strong>-
                    {new Intl.NumberFormat('pt-BR', { //USA O PROPRIO BROWSER COM A FUNÇÃO NATIVA Intl PARA FORMATAÇÃO DE MOEDA
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.withdraws)}
                </strong>
            </div>

            <div className= "hightlight-background">
                <header>
                    <p>Total</p>
                    <img src= {totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', { //USA O PROPRIO BROWSER COM A FUNÇÃO NATIVA Intl PARA FORMATAÇÃO DE MOEDA
                        style: 'currency',
                        currency: 'BRL',
                    }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}