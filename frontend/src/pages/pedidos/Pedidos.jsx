import React, { useEffect, useState } from 'react'
import Navegacao from '../../components/Navegacao'
import { Box, Button, Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import api from '../../services/api'
import PedidoRow from './PedidoRow'

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([])
    const [atualizaPedidos, setAtualizaPedidos] = useState(0)
    

    useEffect(() => {
        api.get('/pedidos-restaurante').then(({ data }) => {
            setPedidos(data)
        })
    }, [atualizaPedidos])

    setTimeout(() => {
        let proxValor = atualizaPedidos + 1
        setAtualizaPedidos(proxValor)
    }, 5000)

    return (
        <>
            <Navegacao />
            <Box sx={{ px: 2, mt: 2 }}>
                <Typography variant="h5" component="h1">
                    Pedidos
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Ações</TableCell>
                                <TableCell>Número</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pedidos.map((pedido) => (
                                    <PedidoRow pedido={pedido}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default Pedidos