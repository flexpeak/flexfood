import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import CadastrarCliente from './pages/cadastrar-cliente/CadastrarCliente'
import CadastrarFornecedor from './pages/cadastrar-fornecedor/CadastrarFornecedor'
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/home/Home'
import Restaurante from './pages/restaurante/Restaurante'
import ProdutosIndex from './pages/produtos/ProdutosIndex'
import ProdutosForm from './pages/produtos/ProdutosForm'
import FazerPedido from './pages/fazer-pedido/FazerPedido'
import RestauranteProdutos from './pages/restaurante-produtos/RestauranteProdutos'
import MeusPedidos from './pages/meus-pedidos/MeusPedidos'
import Pedidos from './pages/pedidos/Pedidos'

const Rotas = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastrar-cliente" element={<CadastrarCliente/>}/>
        <Route path="/cadastrar-fornecedor" element={<CadastrarFornecedor/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/restaurante" element={<Restaurante/>}/>

        <Route path="/produtos" element={<ProdutosIndex/>}/>
        <Route path="/produtos/form" element={<ProdutosForm/>}/>
        <Route path="/produtos/form/:id" element={<ProdutosForm/>}/>

        <Route path="/fazer-pedido" element= {<FazerPedido/>} />
        <Route path="/restaurante-produtos/:id" element={<RestauranteProdutos/>}/>
        <Route path="/meus-pedidos" element={<MeusPedidos/>} />
        <Route path="/pedidos" element={<Pedidos/>} />
    </Routes>
  )
}

export default Rotas