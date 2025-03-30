import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import ItemTotalTransaction from '../../components/ItemTotalTransaction';
import ItemTransaction from '../../components/ItemTransaction';
import Diagram from '../../components/Diagram';
import { LuTrendingUpDown } from "react-icons/lu";
import Modal from '../../components/Modal';
import { TransactionContext } from '../../context/TransactionContext';
import toast, { Toaster } from 'react-hot-toast';
import { dateFormat } from '../../utils/dateFormat';
import AuthContext from '../../context/AuthContext';
import Logo from '../../assets/images/logo.svg'




const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { transactions, getTransaction, deleteTransaction, totalIncome, totalExpense, totalBalance, loading } = useContext(TransactionContext);
  const {user} = useContext(AuthContext);

  const deleteItemTransaction = (id) => {
      deleteTransaction(id);
  }

  if (loading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <img className='animate-ping' src={Logo} />
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-5 my-5'>
      <Header />
      <div className='flex justify-between gap-0 flex-wrap mt-3 md:flex-nowrap  md:gap-5 md:mt-0'>
        <ItemTotalTransaction color='bg-blue-800' title='Ümumi balans:' amount={totalBalance()} />
        <ItemTotalTransaction color='bg-red-800' title='Ümumi xərc:' amount={totalExpense()} />
        <ItemTotalTransaction color='bg-green-800' title='Ümumi mədaxil:' amount={totalIncome()} />
      </div>
      <div className='flex gap-2 flex-wrap mt-3 md:flex-nowrap md:mt-0 md:gap-5'>
        <div className='bg-white shadow-2xl p-3 rounded-lg w-full'>
          <Diagram totalIncome={totalIncome()} totalExpense={totalExpense()} totalBalance={totalBalance()} />
        </div>
        <div className='bg-white shadow-2xl p-3 rounded-lg w-full'>
          <div>
            <h4 className='text-lg font-bold capitalize mb-2 sm:text-2xl sm:mb-4'>ödənişlər</h4>
          </div>
          <div className='h-[370px] overflow-y-auto custom-scrollbar'>
            {
              transactions.length > 0 ? (
                transactions.map(el => (
                  <ItemTransaction key={el._id} title={el.title} amount={el.amount} date={dateFormat(el.date)} income={el.type === 'income' ? true : false} deleteBtn={() => deleteItemTransaction(el._id)} />
                ))
              ) : (
                <div className='flex justify-center items-center h-[90%]'>
                  <div>

                    {/* <h4>Добавьте первую оплату</h4> */}
                    <button className='btn-primary flex items-center gap-5 justify-center uppercase' onClick={() => setIsModalOpen(true)}>
                      <LuTrendingUpDown />
                      ödəniş əlavə edin
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div className='max-w-xs mx-auto mt-5 fixed -left-20 lg:-left-24  top-[43%] rotate-270'>
        <button className='btn-primary flex items-center gap-5 justify-center uppercase text-sm' onClick={() => setIsModalOpen(true)}>
          <LuTrendingUpDown />
          ödəniş əlavə edin
        </button>
      </div>
      {
        isModalOpen && (
          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        )
      }
      <Toaster />
    </div>
  )
}

export default Home