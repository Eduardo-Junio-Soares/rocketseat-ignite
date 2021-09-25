import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";
import { formatToMonetaryValue } from "../../utils/formatToMonetaryValue";


export function TransactionTable() {
    const { transactions }  = useTransactions()

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map((transaction) => (
                        <tr key={transaction.id}>
                            <td >{transaction.title}</td>
                            <td className={transaction.type}>
                                {formatToMonetaryValue(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                { new Intl.DateTimeFormat('pt-br').format(
                                    new Date(transaction.createdAt)
                                )}
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </Container>
    )
}