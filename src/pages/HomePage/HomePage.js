import { useState, useEffect } from 'react'
import CreateForm from '../../components/CreateForm/CreateForm' 
import Animals from '../../components/Animals/Animals' 
import styles from './HomePage.module.scss'

export default function HomePage(props){
    const [showCreate, setShowCreate] = useState(false)
    const [animals, setAnimals] = useState([])

    // Animals useEffect
        // Make sure we have the animal data after the user mounts
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const data = await props.getAllAnimals()
                setAnimals(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchAnimals()
    }, [])

    // Checking the token && user in localStorage
    useEffect(() => {
        if(localStorage.token && !props.token){
            props.setToken(localStorage.getItem('token'))
            setShowCreate(true)
        }
        if(localStorage.token && localStorage.user && !props.user){
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    return (
        <>
            <div>
                <h1 className={styles.h1}>Welcome Back!</h1>
                { showCreate ? <CreateForm user={props.user} createAnimal={props.createAnimal} token={props.token} /> : <></> }
                { animals.length ? <Animals animals={animals} /> : 'Sorry, no animals yet!'}
            </div>
        </>
    )
}