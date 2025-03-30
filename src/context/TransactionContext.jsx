import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import AuthContext from './AuthContext';


export const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
    const token = localStorage.getItem('token');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext)


    const getTransaction = async (userId) => {
        try {
            const res = await axios.get('/api/transactions/get', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            setTransactions(res.data);

        } catch (error) {
            toast.success(error.response?.data?.message || 'EEError', {
                position: 'bottom-right'
            });
        } finally {
            setLoading(false);
        }
    }

    const addTransaction = async (userId, title, type, date, amount) => {
        try {
            const res = await axios.post('/api/transactions/add', { userId, title, type, date, amount }, {
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
        }
    }


    const deleteTransaction = async (id) => {
        try {
            const res = await axios.delete(`/api/transactions/delete/${id}`, {
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
        }
    }

    const totalIncome = () => {
        const value = transactions?.reduce((sum, el) => {
            if (el.type === 'income') {
                return sum + el.amount;
            }
            return sum;
        }, 0);
        return value;
    }

    const totalExpense = () => {
        const value = transactions?.reduce((sum, el) => {
            if (el.type === 'expense') {
                return sum + el.amount;
            }
            return sum;
        }, 0);
        return value;
    }

    const totalBalance = () => totalIncome() - totalExpense();

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