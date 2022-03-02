import { FormEvent, useState } from 'react';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import Modal from 'react-modal';
import closeImg from '../../assets/fechar.svg';
import incomeImg from '../../assets/entradas.svg';
import outcomeImg from '../../assets/saidas.svg';
import { api } from '../../services/api';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const[type, setType] = useState('deposit')

    function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault(); //FUNCIONALIDADE DO HTML QUE PREVINE QUE A PÁGINA SEJA RECARREGADA QUANDO HOUVER SUBMIT

        const data = {
            title,
            value,
            category,
            type
        };
        
        api.post('/transactions', data)
    }
    return(

        <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">
        
        <button type="button" onClick={onRequestClose} className="react-modal-close">
            <img src={closeImg} alt="Fechar"/>
        </button>

        <Container onSubmit={handleCreateNewTransaction}>

        <h2>Cadastrar Transação</h2>

        
        <input
            placeholder="Título"
            value={title}
            onChange={event => setTitle(event.target.value)} //CADA VEZ QUE HOUVER MUDANÇA NO INPUT, SERÁ ARMAZENADO NO setTitle
        >
        </input> 
        <input
            placeholder="Valor"
            type="value"
            value={value}
            onChange={event => setValue(Number(event.target.value))} //COMO O event.target.value SÓ RECEBE string, TEM QUE USAR A FUNCIONALIDADE Number PRA CONVERTER
        >
        </input>
        
        <TransactionTypeContainer>
            <RadioBox type="button" onClick = { () =>{setType('deposit')}} isActive ={type === 'deposit'} activeColor="green" >
                <img src={incomeImg} alt="Entradas" />
                <span>Entradas</span>
            </RadioBox>

            <RadioBox type="button" onClick = { () =>{setType('withdraw')}} isActive ={type === 'withdraw'} activeColor="red">
                <img src={outcomeImg} alt="Saídas" />
                <span>Saídas</span>
            </RadioBox>

        </TransactionTypeContainer>

        <input
            placeholder="Categoria"
            value={category}
            onChange={event => setCategory(event.target.value)}
        >
        </input>
        <button type="submit">Cadastrar</button>

        </Container>


        </Modal>


    )
}