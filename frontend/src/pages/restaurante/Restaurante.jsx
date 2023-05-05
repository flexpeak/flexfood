import React, { useState } from 'react'
import Navegacao from '../../components/Navegacao'
import { Box, TextField } from '@mui/material'
import FileUpload from 'react-mui-fileuploader'
import { LoadingButton } from '@mui/lab'
import api from '../../services/api'

const Restaurante = () => {
    const [nome, setNome] = useState('')
    const [logo, setLogo] = useState('')
    const [loading, setLoading] = useState(false)

    const fileChange = (files) => {
        setLogo(files[0])
    }

    const handleSubmit = () => {
        setLoading(true)

        api.post('/restaurantes', {
            nome: nome,
            logo: logo
        }, {
            headers: {
                'authorization': localStorage.getItem('user-token')
            }
        }).then(({data}) => {
            console.log(data)
        }).catch(({error}) => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>
            <Navegacao />
            <Box sx={{ my: 3, mx: 3, width: '50%' }}>
                <TextField label="Nome" variant="outlined" fullWidth sx={{ mb: 2}} onChange={(e) => { setNome(e.target.value) }} value={ nome }/>
                <FileUpload
                    title="Logo do seu restaurante"
                    header="Arraste para esta área"
                    leftLabel="ou"
                    buttonLabel="Clique aqui"
                    rightLabel="para selecionar"
                    showPlaceholderImage={false}
                    onFilesChange={fileChange}
                />
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

export default Restaurante