import { Dashboard } from "./components/Dashboard";
import { useState } from "react";
import { Header } from "./components/Header";
import { TransactionTable } from "./components/TransactionsTable";
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal'

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState(false)

  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false)
  }
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>

      <Dashboard />

      <Modal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      >
        <h2>Cadastrar transação</h2>
                    
      </Modal>
      <GlobalStyle />
      <TransactionTable />
    </>
  );
}

export default App;
