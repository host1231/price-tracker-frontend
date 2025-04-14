import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import AuthContext from './AuthContext';
import api from '../utils/api';

export const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext)


    const getTransaction = async () => {
        try {
            const res = await api.get('/api/transactions/get', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
    
            setTransactions(res.data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Xəta', {
                position: 'bottom-right'
            });
        }
    };
    

    const addTransaction = async (userId, title, type, date, amount) => {
        try {
            setLoading(true);
            const res = await api.post('/api/transactions/add', { userId, title, type, date, amount }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await getTransaction();

            toast.success('Ödəniş əlavə edildi', {
                position: 'bottom-right'
            });
        } catch (error) {
            toast.error('Ödəniş əlavə edilmədi', {
                position: 'bottom-right'
            });
        } finally {
            setLoading(false);
        }
    }


    const deleteTransaction = async (id) => {
        try {
            setLoading(true);
            const res = await api.delete(`/api/transactions/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await getTransaction();
            toast.success('Ödəniş uğurla silindi', {
                position: 'bottom-right'
            });
        } catch (error) {
            toast.error('Ödəniş silinməyib', {
                position: 'bottom-right'
            });
        } finally {
            setLoading(false);
        }
    }

    const totalIncome = () => {
        const value = transactions?.reduce((sum, el) => {
            if (el.type === 'income') {
                return sum + el.amount;
            }
            return sum;
        }, 0);
        return value.toFixed(2);
    }

    const totalExpense = () => {
        const value = transactions?.reduce((sum, el) => {
            if (el.type === 'expense') {
                return sum + el.amount;
            }
            return sum;
        }, 0);
        return value.toFixed(2);
    }

    const totalBalance = () => (totalIncome() - totalExpense()).toFixed(2);

    useEffect(() => {
        if (user?._id) {
            getTransaction();
        }
    }, [user?._id]);

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, totalIncome, totalExpense, totalBalance, loading }}>
            {children}
        </TransactionContext.Provider>
    )
}

export default TransactionProvider;