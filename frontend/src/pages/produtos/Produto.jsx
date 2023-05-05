import { ExpandMore, Favorite, MoreVert, Share } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material'
import React from 'react'

const Produto = ({ produto }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={ produto.nome }
                subheader={ "R$ " + produto.valor }
            />
            <CardMedia
                component="img"
                height="194"
                image={ process.env.REACT_APP_HOST_API + produto.foto }
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    { produto.descricao }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                Quantidade em estoque: { produto.quantidade_estoque }
            </CardActions>
        </Card>
    )
}

export default Produto