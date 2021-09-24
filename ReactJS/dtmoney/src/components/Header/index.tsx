import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'
import { useState } from 'react'

interface headerProps {
    onOpenNewTransactionModal: () => void
}

export function Header({ onOpenNewTransactionModal }: headerProps) {    
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type='button' onClick={onOpenNewTransactionModal}>
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}