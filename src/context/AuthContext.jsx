import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            api.get('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => setUser(res.data))
                .catch(() => {
                    logout();
                });
        }
    }, [token]);

    const register = async (name, email, password) => {
        try {
            setLoading(true);
            const res = await api.post('/api/auth/register', { name, email, password });
            toast.success(res.data.message, { position: 'bottom-right' });
            return { success: true };
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error', { position: 'bottom-right' });
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            const res = await api.post('/api/auth/login', { email, password });
            const { token, userId } = res.data;

            localStorage.setItem('token', token);
            setToken(token);
            setUser({ _id: userId });
            
            toast.success('Uğurlu giriş', { position: 'bottom-right' });
            return { success: true };
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error', { position: 'bottom-right' });
            return { success: false };
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        toast.success('Uğurlu çıxış', { position: 'bottom-right' });
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
