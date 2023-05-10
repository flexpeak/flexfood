import React, { useEffect, useState } from 'react'
import Navegacao from '../../components/Navegacao'
import { Alert, Box, Snackbar, TextField } from '@mui/material'
import FileUpload from 'react-mui-fileuploader'
import { LoadingButton } from '@mui/lab'
import api from '../../services/api'
import { useNavigate, useParams } from 'react-router-dom'

const ProdutosForm = () => {
    const [nome, setNome] = useState('')
    const [foto, setFoto] = useState('')
    const [valor, setValor] = useState('')
    const [descricao, setDescricao] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [sucesso, setSucesso] = useState(false)
    const [error, setError] = useState('')
    const [fotoAtual, setFotoAtual] = useState('')
    const navigate = useNavigate()

    const fileChange = (files) => {
        setFoto(files[0])
    }

    useEffect(() => {
        if (id) {
            api.get('/produtos/' + id).then(({data}) => {
                setNome(data.nome)
                setFotoAtual(process.env.REACT_APP_HOST_API + data.foto)
                setValor(data.valor)
                setDescricao(data.descricao)
                setQuantidade(data.quantidade_estoque)
            })
        }
    }, [])

    const handleSubmit = () => {
        setLoading(true)

        const formData = new FormData()
        formData.append('nome', nome)
        formData.append('foto', foto)
        formData.append('valor', valor)
        formData.append('descricao', descricao)
        formData.append('quantidade_estoque', quantidade)

        if (id) {
            api.put('/produtos/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(({ data }) => {
                setSucesso(true)
                setTimeout(() => {
                    navigate('/produtos')
                }, 2000)
            }).catch((error) => {
                setError(error.response.data.error)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            api.post('/produtos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(({ data }) => {
                setSucesso(true)
                setTimeout(() => {
                    navigate('/produtos')
                }, 2000)
            }).catch((error) => {
                setError(error.response.data.error)
            }).finally(() => {
                setLoading(false)
            })
        }

    }

    return (
        <>
            <Navegacao />
            <Box sx={{ my: 3, mx: 3, width: '50%' }}>
                <Snackbar open={sucesso} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Produto salvo com sucesso!
                    </Alert>
                </Snackbar>

                <Snackbar open={error.length > 0} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>

                <TextField label="Nome" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={(e) => { setNome(e.target.value) }} value={nome} />
                <TextField label="Valor" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={(e) => { setValor(e.target.value) }} value={valor} />
                <FileUpload
                    title="Foto do seu produto"
                    header="Arraste para esta área"
                    leftLabel="ou"
                    buttonLabel="Clique aqui"
                    rightLabel="para selecionar"
                    showPlaceholderImage={false}
                    onFilesChange={fileChange}
                />
                {fotoAtual && (<img src={fotoAtual} style={{ width: '100%'}} />)}
                <TextField label="Descrição" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={(e) => { setDescricao(e.target.value) }} value={descricao} />
                <TextField label="Quantidade Em Estoque" variant="outlined" fullWidth sx={{ mb: 2 }} onChange={(e) => { setQuantidade(e.target.value) }} value={quantidade} />
                <LoadingButton
                    color='primary'
                    variant='contained'
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handleSubmit}
                    loading={loading}
                >Salvar</LoadingButton>
            </Box>
        </>
    )
}

export default ProdutosForm