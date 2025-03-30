import React, { useContext, useState } from 'react'
import Input from './Input'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import Select from './Select';
import { TransactionContext } from '../context/TransactionContext';
import AuthContext from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const Modal = ({ isModalOpen, setIsModalOpen }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('Выберите дату');
    const [amount, setAmount] = useState('');

    const [error, setError] = useState('');

    const {user, toke} = useContext(AuthContext);
    const {addTransaction} = useContext(TransactionContext);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !type || !date || !amount) {
            setError('Bütün sahələr vacibdir!');
            return;
        }

        try {
            await addTransaction(user._id, title, type, date, amount);
            setError(''); 
            setIsModalOpen(false);
        } catch (error) {
        }
    }

    return (
        <div className='fixed inset-0 bg-gray-200/80  flex justify-center items-center'>
            <div className='w-full max-w-lg bg-white p-4 m-2 rounded-lg shadow-lg relative'>
                <button onClick={() => setIsModalOpen(false)} className='cursor-pointer text-slate-500 absolute top-3 right-3 transition duration-300 hover:text-slate-800'>
                    <IoIosCloseCircleOutline size={30} />
                </button>
                <h4 className='text-2xl font-bold mb-4'>Ödəniş əlavə edin</h4>
                <form onSubmit={handleSubmit}>
                    <Input
                        type='text'
                        label='Ad'
                        placeholder='Araz'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    <Select
                        label='Ödəniş növü'
                        placeholder='Mədaxil ya Xərc'
                        value={type}
                        onChange={({ target }) => setType(target.value)}
                    />
                    <Input
                        type='date'
                        label='Tarix'
                        value={date}
                        onChange={({ target }) => setDate(target.value)}
                    />
                    <Input
                        type='number'
                        label='Məbləğ'
                        placeholder='203'
                        value={amount}
                        onChange={({ target }) => setAmount(target.value)}
                    />
                    {error && <p className='text-red-500 text-sm pb-2.5'>{error}</p>}
                    <button className='btn-primary mt-3'>Əlavə ed</button>
                </form>
            </div>
        </div>
    )
}

export default Modal