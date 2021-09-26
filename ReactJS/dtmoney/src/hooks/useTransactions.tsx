import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transactions {
    id: number
    title: string,
    amount: number,
    category: string,
    type: string,
    createdAt: string,
}

type TransactionInput = Omit<Transactions, 'id' | 'createdAt'>
// type TransactionInput = Pick<Transactions, 'title' | 'amount' | 'type' | 'category'>

interface transactionsProviderProps {
    children: ReactNode;
}

interface TransactionContextData {
    transactions: Transactions[],
    createTransaction: (transaction: TransactionInput) => Promise<void>
    deleteTransaction: (id: number) => void
}

const TransactionContext = createContext<TransactionContextData>(
    {} as TransactionContextData
)

export function TransactionsProvider({children}: transactionsProviderProps ) {
    const [transactions, setTransactions] = useState<Transactions[]>([])

    useEffect(() => {
        api.get('/transactions')
            .then(res => setTransactions(res.data.transactions))
    },[])

    async function createTransaction(transactionInput: TransactionInput) {

        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        })

        const { transaction } = response.data

        setTransactions([
            ...transactions,
            transaction,
        ])
    }

    function deleteTransaction(id: number) {
        const removeTransaction = transactions.filter((tr) => Number(tr.id) !== id)
        setTransactions(removeTransaction)
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction, deleteTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionContext)

    return context
}