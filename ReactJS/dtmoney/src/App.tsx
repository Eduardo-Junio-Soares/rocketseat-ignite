import { useState } from "react";

import { Header } from "./components/Header";
import { TransactionTable } from "./components/TransactionsTable";
import { Dashboard } from "./components/Dashboard";
import { NewTransactionModal } from "./components/NewTransactionModal";

import Modal from 'react-modal'

import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./TransactionsContext";


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
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>

      <Dashboard />

      <GlobalStyle />

      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>

      <TransactionTable />
    </TransactionsProvider>
  );
}

export default App;
