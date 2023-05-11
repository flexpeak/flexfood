import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Navegacao from '../../components/Navegacao'
import { Box, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Statuses from '../../components/Statuses'

const MeusPedidos = () => {
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        api.get('/pedidos').then(({ data }) => {
            setPedidos(data)
        })
    }, [])

    return (
        <>
            <Navegacao />
            <Box sx={{ mt: 2, px: 2 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Restaurante</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Valor Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pedidos.map((pedido) => (
                                    <TableRow>
                                        <TableCell>{ pedido.restaurante.nome }</TableCell>
                                        <TableCell>
                                            <Statuses status={pedido.status}/>
                                        </TableCell>
                                        <TableCell>R$ { pedido.valor_total }</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>

        </>
    )
}

export default MeusPedidos