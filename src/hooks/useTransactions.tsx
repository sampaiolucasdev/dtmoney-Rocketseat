import {createContext, useEffect, useState, ReactNode, useContext} from 'react';
import { api } from '../services/api';

interface Transaction{
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string,

}

interface TransactionsProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions:Transaction[];
    createTransaction: (transactioni:TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id'| 'createdAt'>;  

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps){
    const[transactions, setTransactions] = useState<Transaction[]>([]);
    
    useEffect(() =>{
        api.get('transactions') //PEGAR UMA RESPOSTA DA API
        .then(response =>setTransactions(response.data.transactions)) //E ENTAO ARMAZENAR EM SET TRANSACTIONS
    }, [])

    async function createTransaction(transactionInput: TransactionInput){ 
        const response = await api.post('/transactions', {
            ...transactionInput, createdAt: new Date(),
        })
        const { transaction } = response.data;

        setTransactions([ //RETICÊNCIAS PEGA TUDO QUE JA FOI INSERIDO DENTRO DE transactions, E ADICIONA transaction
            ...transactions, transaction,
        ])
    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}