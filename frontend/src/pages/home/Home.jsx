import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('user-token')

    if (token) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [])
  
  return (
    <></>
  )
}

export default Home