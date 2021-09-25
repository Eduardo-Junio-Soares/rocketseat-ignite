import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";

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
}

export const TransactionContext = createContext<TransactionContextData>(
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
        console.log(response.data)
        const { transaction } = response.data

        setTransactions([
            ...transactions,
            transaction,
        ])
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionContext.Provider>
    )

}