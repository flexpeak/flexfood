import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Restaurante = ({ restaurante }) => {
    const navigate = useNavigate();

    return (
        <Card sx={{ width: 345, mr: 3, mb: 1, mt: 1 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={ process.env.REACT_APP_HOST_API + restaurante.logo }
                    alt=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { restaurante.nome }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        { restaurante.usuario.nome }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => navigate('/restaurante-produtos/' + restaurante.id)}>
                    Produtos
                </Button>
            </CardActions>
        </Card>
    )
}

export default Restaurante