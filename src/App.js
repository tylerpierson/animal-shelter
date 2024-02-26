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

  const createAnimal = async (animalData, token) => {
    if(!token){
      return
    }
    try {
      const response = await fetch('/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(animalData)
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  } 

  const getAllAnimals = async () => {
    try {
      const response = await fetch('/api/animals')
      const data = response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const getIndividualAnimal = async (id) => {
    try {
      const response = await fetch(`/api/animals/${id}`)
      const data = response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const updateAnimal = async (newAnimalData, id, token) => {
    if(!token){
      return
    }
    try {
      const response = await fetch(`/api/animals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newAnimalData)
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const deleteAnimal = async (id, token) => {
    if(!token){
      return
    }
    try {
      const response = await fetch(`/api/animals/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Routes>
        <Route 
          path='/'
          element={<HomePage 
            user={user}
            setUser={setUser}
            token={token}
            setToken={setToken}
            createAnimal={createAnimal}
            getAllAnimals={getAllAnimals}
          />}>
        </Route>
        <Route 
          path='/register'
          element={<AuthPage 
            setUser={setUser}
            setToken={setToken}
            signUp={signUp}
            login={login}
          />}>
        </Route>
        <Route 
          path='/animals'
          element={<ShowPage />}>
        </Route>
      </Routes>
    </>
  )
}