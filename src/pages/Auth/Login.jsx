import React, { useContext, useState } from 'react'
import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import AuthLayout from '../../components/AuthLayout';
import AuthContext from '../../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Logo from '../../assets/images/logo.svg';
import Preloader from '../../components/Preloader';


const Login = () => {
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userLoading} = useContext(AuthContext);
  
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Düzgün e-poçtu daxil edin!');
      return;
    }

    if (password.length < 8) {
      setError('Parol ən azı 8 simvoldan ibarət olmalıdır!');
      return;
    }

    setError('');
    const res = await login(email, password);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setEmail('');
      setPassword('');
    }

  }

  if (userLoading) {
    return (
      <Preloader />
    )
  }

 

  return (
    <AuthLayout>
      <div className='w-full max-w-lg m-10'>
        <img src={Logo} className='mx-auto mb-8 max-w-[180px] w-full' />
        <p className='text-sm font-medium text-right'>Hesabınız yoxdur? <Link className='text-blue-500 hover:underline' to='/signUp'> Yeni hesab yarat</Link></p>
        <h2 className='text-2xl text-center m-8 font-bold'>Hesabınıza daxil olun</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <Input 
            type='text'
            label='E-poçt'
            name='email'
            placeholder='E-poçtunuzu daxil edin'
            value={email}
            onChange={({target}) => setEmail(target.value)}
          />
          <Input 
            type='password'
            name='password'
            label='Şifrə'
            placeholder='Şifrənizi daxil edin'
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
          {error && <p className='text-red-500 text-sm pb-2.5'>{error}</p>}
          <button className='btn-primary mt-3'>Giriş</button>
        </form>
      </div>
      <Toaster />
    </AuthLayout>
  )
}

export default Login