import { Alert, Button, Card, Container, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Logo from './logo.png'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { LoadingButton } from '@mui/lab'

const CadastrarFornecedor = () => {
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)
    const [sucesso, setSucesso] = useState(false)
    const [error, setError] = useState('')

    const handleClick = () => {
        setLoading(true)
        api.post('/registrar', {
            nome: nome,
            senha: senha,
            email: email,
            tipo: 'R'
        }).then(({ data }) => {
            setSucesso(true)
            setEmail('')
            setNome('')
            setSenha('')
        }).catch((error) => {
            setError(error.response.data.error)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Snackbar open={sucesso} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Cliente cadastrado com sucesso
                </Alert>
            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            <Card sx={{ mt: 5, pt: 5, px: 10, width: '40%', display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
                <Typography variant='h4' align="center">CADASTRAR FORNECEDOR</Typography>
                <img src={Logo} alt="" width="200px" style={{ marginTop: '20px' }} />

                <TextField
                    label="Nome"
                    sx={{ my: 3 }}
                    fullWidth
                    onChange={(e) => setNome(e.target.value)}
                    value={nome}
                />

                <TextField
                    label="E-mail"
                    sx={{ mb: 3 }}
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <TextField
                    label="Senha"
                    type="password"
                    sx={{ mb: 3 }}
                    fullWidth
                    onChange={(e) => setSenha(e.target.value)}
                    value={senha}
                />

                <LoadingButton color="primary" variant="contained" fullWidth onClick={handleClick} loading={loading}>
                    Cadastrar Fornecedor
                </LoadingButton>

                <Button sx={{ mt: 2, mb: 1 }} onClick={() => {
                    navigate('/login')
                }}>
                    Voltar para Login
                </Button>
            </Card>
        </Container>
    )
}

export default CadastrarFornecedor