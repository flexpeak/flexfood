import React, { useContext, useState } from 'react'
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { AddShoppingCart, Deck, Home, ShoppingBag, ShoppingCart, Shower } from '@mui/icons-material';
import ItemDaLista from './ItemDaLista';
import { useNavigate } from 'react-router-dom';
import { CarrinhoContext } from '../context/CarrinhoContext';
import api from '../services/api';

const Navegacao = () => {
    const navigate = useNavigate()
    const [drawer, setDrawer] = useState(false)
    const tipoUsuario = localStorage.getItem('user-type')
    const [abrirMenu, setAbrirMenu] = useState(false)
    const [elemento, setElemento] = useState(null)
    const { carrinho, setCarrinho } = useContext(CarrinhoContext)

    const handleSair = () => {
        localStorage.removeItem('user-token')
        navigate('/login')
    }

    const handleFinalizarPedido = () => {
        api.post('/pedidos', {
            restaurante_id: carrinho[0].restaurante_id
        }).then(({data}) => {
            const pedido_id = data.id
            carrinho.forEach((produto) => {
                api.post('/pedidos/' + pedido_id + '/produtos/' + produto.id, {
                    quantidade: 1
                }).then(({data}) => {
                    setCarrinho([])
                    navigate('/meus-pedidos')
                })
            })
        })
    }

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => { setDrawer(true) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h5' sx={{ flexGrow: 1 }}>
                        FlexFood
                    </Typography>
                    {
                        tipoUsuario == 'C' && (
                            <IconButton color="inherit" onClick={(e) => { setAbrirMenu(true); setElemento(e.target) }}>
                                <ShoppingCart />
                            </IconButton>
                        )
                    }
                    <Menu open={abrirMenu} anchorEl={elemento} onClose={() => { setAbrirMenu(false) }}>
                        {
                            carrinho.length > 0 && (
                                <>
                                    {
                                        carrinho.map((produto) => (
                                            <MenuItem>{produto.nome}</MenuItem>
                                        ))

                                    }
                                    < Divider />
                                    <MenuItem>
                                        <Button variant='contained' onClick={handleFinalizarPedido}>
                                            FINALIZAR PEDIDO
                                        </Button>
                                    </MenuItem>
                                </>
                            )
                        }
                    </Menu>

                    <Button color="inherit" onClick={handleSair}>Sair</Button>
                </Toolbar>
            </AppBar>
            <Drawer open={drawer} onClose={(e) => setDrawer(false)}>
                <Box sx={{ width: 250 }}>
                    <List>
                        <ItemDaLista texto="Home" icone={<Home />} link="/dashboard" />
                        {(tipoUsuario == 'R') && (<ItemDaLista texto="Restaurante" icone={<Deck />} link="/restaurante" />)}
                        {(tipoUsuario == 'R') && (<ItemDaLista texto="Produtos" icone={<Shower />} link="/produtos" />)}
                        {(tipoUsuario == 'R') && (<ItemDaLista texto="Pedidos" icone={<ShoppingCart />} link="/pedidos" />)}
                        {(tipoUsuario == 'C') && (<ItemDaLista texto="Fazer Pedido" icone={<AddShoppingCart />} link="/fazer-pedido" />)}
                        {(tipoUsuario == 'C') && (<ItemDaLista texto="Meus Pedidos" icone={<ShoppingBag />} link="/meus-pedidos" />)}
                        <Divider />
                        <Box sx={{ mt: 2, mx: 2 }}>
                            {(tipoUsuario == 'R') ? <Typography>Tipo: Restaurante</Typography> : <Typography>Tipo: Cliente</Typography>}
                        </Box>

                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default Navegacao