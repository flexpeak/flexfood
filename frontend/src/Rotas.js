import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import CadastrarCliente from './pages/cadastrar-cliente/CadastrarCliente'
import CadastrarFornecedor from './pages/cadastrar-fornecedor/CadastrarFornecedor'
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/home/Home'

const Rotas = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cadastrar-cliente" element={<CadastrarCliente/>}/>
        <Route path="/cadastrar-fornecedor" element={<CadastrarFornecedor/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default Rotas