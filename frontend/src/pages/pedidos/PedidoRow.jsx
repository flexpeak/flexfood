import { Alert, Box, Button, Chip, Collapse, IconButton, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import React, { useState } from 'react'
import api from '../../services/api'
import Statuses from '../../components/Statuses'

const PedidoRow = ({ pedido }) => {
    const [open, setOpen] = useState(false)
    const [sucesso, setSucesso] = useState(false)

    const handleConfirmar = () => {
        api.put(`/pedidos-restaurante/${pedido.id}/confirmado`)
            .then(() => {
                setSucesso(true)
                setTimeout(() => {
                    setSucesso(false)
                }, 2000)
            })
    }

    const handleSaiu = () => {
        api.put(`/pedidos-restaurante/${pedido.id}/saiu-entrega`)
            .then(() => {
                setSucesso(true)
                setTimeout(() => {
                    setSucesso(false)
                }, 2000)
            })
    }

    const handleEntregue = () => {
        api.put(`/pedidos-restaurante/${pedido.id}/entregue`)
            .then(() => {
                setSucesso(true)
                setTimeout(() => {
                    setSucesso(false)
                }, 2000)
            })
    }

    return (
        <>
            <Snackbar open={sucesso} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Operação realizada com sucesso
                </Alert>
            </Snackbar>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {pedido.status == 'P' && (<Button variant='contained' onClick={handleConfirmar}>Confirmar</Button>)}
                    {pedido.status == 'V' && (<Button variant='contained' onClick={handleSaiu} color="warning">Saiu Para Entrega</Button>)}
                    {pedido.status == 'J' && (<Button variant='contained' onClick={handleEntregue} color="success">Entregue</Button>)}
                </TableCell>
                <TableCell>{pedido.id}</TableCell>
                <TableCell>{pedido.usuario.nome}</TableCell>
                <TableCell>R$ {pedido.valor_total}</TableCell>
                <TableCell><Statuses status={pedido.status}/></TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open}>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6">Produtos</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Produto</TableCell>
                                        <TableCell>Quantidade</TableCell>
                                        <TableCell>Valor</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        pedido.produtos.map((produto) => (
                                            <TableRow>
                                                <TableCell>{produto.nome}</TableCell>
                                                <TableCell>{produto.pedidos_produtos.quantidade}</TableCell>
                                                <TableCell>{produto.pedidos_produtos.valor}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>

    )
}

export default PedidoRow