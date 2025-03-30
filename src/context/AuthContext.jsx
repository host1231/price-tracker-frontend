import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const AuthContext = createContext();

axios.defaults.baseURL = 'https://price-tracker-backend-xi.vercel.app';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            axios.get('api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => setUser(res.data))
                .catch(() => {
                    setToken('');
                    localStorage.removeItem('token');
                })
        }
    }, [token]);

    const register = async (name, email, password) => {
        try {
            const res = await axios.post('/api/auth/register', { name, email, password });
            toast.success(res.data.message, {
                position: 'bottom-right'
            });
            return { success: true }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error', {
                position: 'bottom-right'
            });
            return { success: false }
        }
    }

    const login = async (email, password) => {
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            const { token, userId } = res.data;

            setToken(token);
            localStorage.setItem('token', token);

            const userRes = await axios.get('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(userRes.data);

            toast.success('Uğurlu giriş', {
                position: 'bottom-right'
            });

            return {success: true}
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error', {
                position: 'bottom-right'
            });
            return {success: false}
        }
    }

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        toast.success('Uğurlu çıxış', {
            position: 'bottom-right'
        });
    }

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;