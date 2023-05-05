import { Home } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ItemDaLista = ({texto, icone, link}) => {
    const navigate = useNavigate()
    
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => { navigate(link) }}>
                <ListItemIcon>
                    { icone }
                </ListItemIcon>
                <ListItemText primary={ texto } />
            </ListItemButton>
        </ListItem>
    )
}

export default ItemDaLista