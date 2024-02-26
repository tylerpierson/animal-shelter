import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ShowPage from './pages/ShowPage/ShowPage'
import { Route, Routes } from 'react-router-dom'
import styles from './App.module.scss'

export default function App(){
    // Default state for user is null
    // Default state for token is an empty string
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')

    // Create a signUp fn that connects to the backend
    const signUp = async(credentials) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                // Headers that will be set in PostMan
                headers: {
                    'Content-Type': 'application/json'
                },
                // Turn the body into a readable JavaScript object 
                body: JSON.stringify(credentials)
            })
            // Turn response back into a JavaScript object
            const data = await response.json()
            // From the "data" response received, pull out the user object and set the user state
            setUser(data.user)
            // From the "data" response received, pull out the token object and set the token state
            setToken(data.token)
            // Store the token && user in localStorage
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
        } catch (error) {
            console.error(error)
        }
    }

    // This function will need to be a prop passed to the LoginForm via AuthPage
    const login = async (credentials) => {
        try {
            // https://i.imgur.com/3quZxs4.png
            // Step 1 is complete here once someone fills out the loginForm
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const data = await response.json()
            // Step 3
            const tokenData = data.token
            localStorage.setItem('token', tokenData)
            // The below code is additional to the core features of authentication
            // You need to decide what additional things you would like to accomplish when you
            // set up your stuff
            const userData = data.user
            localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData)
        } catch (error) {
            console.error(error)
        }
    }

    // CreateAnimal
    // We need token authentication in order to verify that someone can make a animal
    // Now that we have the token from the signup/login above, we will pass it into the following functions for authentication
    const createAnimal = async (animalData, token) => {
        // https://i.imgur.com/3quZxs4.png
        // Step 4
        if(!token){
            return
        }
        try {
            const response = await fetch('/api/animals', {
                method: 'POST',
                headers: {
                    // This part is only necessary when sending data, not when retrieving it, i.e. GET requests
                    // Tell it that we're sending JSON data
                    'Content-Type': 'application/json',
                    // Tell it that we have a user token
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

    // ReadAnimal - we don't need authentication
    const getAllAnimals = async () => {
        try {
            const response = await fetch('/api/animals')
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)            
        }
    }

    // Show and individual animal - no need for authentication
    const getIndividualAnimal = async (id) => {
        try {
            const response = await fetch(`/api/animals/${id}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    // UpdateAnimal
    const updateAnimal = async (newAnimalData, id, token) => {
        // https://i.imgur.com/3quZxs4.png
        // Step 4
        if(!token){
            return
        }
        try {
            const response = await fetch(`/api/animals/${id}`, {
                method: 'PUT',
                headers: {
                    // This part is only necessary when sending data, not when retrieving it, i.e. GET requests
                    // Tell it that we're sending JSON data
                    'Content-Type': 'application/json',
                    // Tell it that we have a user token
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

    // DeleteAnimal
    const deleteAnimal = async (id, token) => {
        // https://i.imgur.com/3quZxs4.png
        // Step 4
        if(!token){
            return
        }
        try {
            const response = await fetch(`/api/animals/${id}`, {
                method: 'DELETE',
                headers: {
                    // Don't need content-type because we are not sending any data
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <Routes>
                    {/* What is needed on this page:
                        Get all Animal posts when the component mounts 
                        Create an individual Animal post
                    */}
                    <Route path='/' 
                    element={<HomePage 
                    // Pass user, token, && setToken props down to HomePage
                        user={user} 
                        token={token} 
                        // nameOfTheProp={nameOfTheFunction}
                        setToken={setToken}
                        setUser={setUser}
                        createAnimal={createAnimal}
                        getAllAnimals={getAllAnimals}
                    />}></Route>

                    {/* What is needed on this page:
                        User needs to be able to signUp
                        User needs to be able to Login
                    */}
                    <Route path='/register' 
                    element={<AuthPage 
                    // Pass setUser, setToken && signUp props down to AuthPage
                        setUser={setUser}
                        setToken={setToken}
                        signUp={signUp}
                        login={login}
                    />}></Route>

                    {/* What is needed on this page:
                        Be able to GET an individual animal
                        Be able to UPDATE animal
                        Be able to DELETE animal
                    */}
                    <Route path='/animal' 
                    element={<ShowPage 
                    // Pass user, token, && setToken props down to HomePage
                        user={user} 
                        token={token} 
                        setToken={setToken}
                        getIndividualAnimal={getIndividualAnimal}
                        updateAnimal={updateAnimal}
                        deleteAnimal={deleteAnimal}
                    />}></Route>
                </Routes>
            </div>
        </>
    )
}