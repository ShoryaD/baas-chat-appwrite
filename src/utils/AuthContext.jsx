import { createContext, useContext, useState, useEffect } from "react";
import { account } from '../appwrite/config'
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getUserOnLoad()
    }, []);

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.info(error)
        }
        setLoading(false)
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()

        try {
            const response = await account.createEmailPasswordSession(credentials.email, credentials.password)
            
            const accountDetails = await account.get()
            setUser(accountDetails)

            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }

    const handleUserLogout = async () => {
        account.deleteSession('current')
        setUser(null)
    }

    const handleRegister = async (e, credentials) => {
        e.preventDefault();
    
        if (credentials.password1 !== credentials.password2) {
            alert('Passwords do not match!');
            return;
        }
    
        const isValidPassword = (password) => {
            return (
                password.length >= 8 &&
                password.length <= 265 &&
                /[A-Z]/.test(password) &&       
                /[a-z]/.test(password) &&       
                /[0-9]/.test(password) &&      
                /[^A-Za-z0-9]/.test(password) 
            );
        };
    
        if (!isValidPassword(credentials.password1)) {
            alert('Password must be 8-265 characters long and include one uppercase, lowercase, number, and special character.');
            return;
        }
    
        try {
            const response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
            );
    
            navigate('/login');
        } catch (error) {
            if (error.message.includes("password")) {
                alert("Password must be between 8 and 265 characters and not a commonly used password.");
            } else {
                console.error(error);
            }
        }
    };    

    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleRegister
    }

    return <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
}

// custom hook
export const useAuth = () => {return useContext(AuthContext)}

export default AuthContext