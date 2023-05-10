import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import Navegacao from '../../components/Navegacao'
import Produto from './Produto'

const RestauranteProdutos = () => {
    const { id } = useParams()
    const [restaurante, setRestaurante] = useState({})

    useEffect(() => {
        api.get('/restaurantes/' + id).then(({ data }) => {
            setRestaurante(data)
        })
    }, [])

    return (
        <>
            <Navegacao />
            <Box sx={{ mt: 2, pl: 2 }}>
                <Typography variant='h4'>{restaurante.nome}</Typography>
                <Box sx={{ display: 'flex' }}>
                    {
                        restaurante.produtos && restaurante.produtos.map((produto) => (
                            <Produto produto={produto} />
                        ))
                    }
                </Box>

            </Box>
        </>
    )
}

export default RestauranteProdutos