import { Alert, Button, Card, Container, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Logo from './logo.png'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { LoadingButton } from '@mui/lab'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    api.post('/login', {
      email: email,
      senha: senha
    }).then(({ data }) => {
      localStorage.setItem('user-token', data.token)
      localStorage.setItem('user-type', data.tipo)
      navigate('/dashboard')
    }).catch((e) => {
      setError(e.response.data.error)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Snackbar open={error.length > 0} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Card sx={{ mt: 5, pt: 5, px: 10, width: '40%', display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
        <Typography variant='h4' align="center">LOGIN</Typography>
        <img src={Logo} alt="" width="200px" style={{ marginTop: '20px' }} />

        <TextField
          label="E-mail"
          sx={{ my: 3 }}
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

        <LoadingButton loading={loading} color="primary" variant="contained" fullWidth onClick={handleClick}>
          Fazer Login
        </LoadingButton>

        <Button sx={{ mt: 2, mb: 1 }} onClick={() => {
          navigate('/cadastrar-cliente')
        }}>
          Cadastrar Cliente
        </Button>

        <Button onClick={() => {
          navigate('/cadastrar-fornecedor')
        }}>
          Cadastrar Fornecedor
        </Button>
      </Card>
    </Container>
  )
}

export default Login