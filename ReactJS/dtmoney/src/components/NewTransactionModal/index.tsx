import Modal from "react-modal"
import { FormEvent, useState, useContext } from "react"
import { TransactionContext } from "../../TransactionsContext"

import closeimg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from "./styles"

interface NewTransactionModalProps {
    isOpen: boolean
    onRequestClose: () => void
}
export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const { createTransaction } = useContext(TransactionContext)

    const [type, setType] = useState('deposit')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)

     async function handleCreateNewtransaction(e: FormEvent) {
        e.preventDefault()

        await createTransaction({
            title,
            amount,
            category,
            type,
        })

        setType('deposit')
        setTitle('')
        setAmount(0)
        setCategory('')
        onRequestClose()
    }

    return (
        <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
      >
        <button 
            type='button' 
            onClick={onRequestClose}
            className='react-modal-close'    
        >
            <img src={closeimg} alt="fechar modal" />
        </button>

        <Container 
            onSubmit={handleCreateNewtransaction}
        >
            <h2>Cadastrar transação</h2>

            <input 
                placeholder='Titulo'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

             <input
                type='number'
                placeholder='Valor'
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
             />

            <TransactionTypeContainer>
                <RadioBox
                    type='button'
                    onClick={() => { setType('deposit') }}
                    isActive={type === 'deposit'}
                    activeColor='green'
                >
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>
                
                <RadioBox
                    type='button'
                    onClick={() => { setType('withdraw') }}
                    isActive={type === 'withdraw'}
                    activeColor='red'

                >
                    <img src={outcomeImg} alt="Saída" />
                    <span>Saída</span>
                </RadioBox>
            </TransactionTypeContainer>

             <input 
                placeholder='Categoria'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <button type='submit'>
                Cadastrar
            </button>
        </Container>
      </Modal>
    )
}