import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ShowPage from './pages/ShowPage/ShowPage'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'

export default function App(){
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

  const signUp = async (credentials) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const data = await response.json()
      setUser(data.user)
      setToken(data.token)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const data = await response.json()
      const tokenData = data.token
      localStorage.setItem('token', tokenData)
      const userData = data.user
      localStorage.set('user', JSON.stringify(userData))
      setUser(userData)
    } catch (error) {
      console.error(error)
    }
  }

  const createAnimal = async () => {
    if(!token){
      return
    }
  } 

  const getAllAnimals = async () => {

  }

  const getIndividualAnimal = async () => {

  }

  const updateAnimal = async () => {
    if(!token){
      return
    }
  }

  const deleteAnimal = async () => {
    if(!token){
      return
    }
  }

  return (
    <>
      <Routes>
        <Route 
          path='/'
          element={<HomePage />}>
        </Route>
        <Route 
          path='/register'
          element={<AuthPage />}>
        </Route>
        <Route 
          path='/animals'
          element={<ShowPage />}>
        </Route>
      </Routes>
    </>
  )
}