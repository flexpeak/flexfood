import { AppBar, Button, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()
  const [drawer, setDrawer] = useState(false)

  const handleSair = () => {
    localStorage.removeItem('user-token')
    navigate('/login')
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
          <Button color="inherit" onClick={handleSair}>Sair</Button>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={ (e) => setDrawer(false) }>
        asdasd
      </Drawer>
    </>
  )
}

export default Dashboard