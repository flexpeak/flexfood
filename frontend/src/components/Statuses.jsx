import { Chip } from '@mui/material'
import React from 'react'

const Statuses = ({ status }) => {
    let texto = 'Desconhecido'
    let cor = 'error'
    if (status == 'P') {
        texto = 'Pendente'
        cor = 'primary'
    } else if (status == 'V') {
        texto = 'Confirmado'
        cor = 'secondary'
    } else if (status == 'J') {
        texto = 'Saiu para entrega'
        cor = 'warning'
    } else if (status == 'E') {
        texto = 'Entregue'
        cor = 'success'
    }


    return (
        <Chip label={texto} color={cor}/>
    )
}

export default Statuses