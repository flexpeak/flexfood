import React, { useEffect, useState } from 'react'
import Navegacao from '../../components/Navegacao'
import api from '../../services/api'
import Restaurante from './Restaurante'
import { Box } from '@mui/material'

const FazerPedido = () => {
    const [restaurantes, setRestaurantes] = useState([])
    useEffect(() => {
        api.get('/restaurantes').then(({ data }) => {
            setRestaurantes(data)
        })
    }, [])

    return (
        <>
            <Navegacao />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    restaurantes.map((restaurante) => (
                        <Restaurante restaurante={ restaurante } />
                    ))
                }
            </Box>

        </>
    )
}

export default FazerPedido