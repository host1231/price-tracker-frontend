import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout'
import Input from '../../components/Input';
import { validateEmail } from '../../utils/helper';
import AuthContext from '../../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Logo from '../../assets/images/logo.svg';
import Preloader from '../../components/Preloader';


const SignUp = () => {
  const { register, userLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setError('Adınız ən azı 3 simvoldan ibarət olmalıdır!');
      return;
    }

    if (!validateEmail(email)) {
      setError('Düzgün e-poçtu daxil edin!');
      return;
    }

    if (password.length < 8) {
      setError('Parol ən azı 8 simvoldan ibarət olmalıdır!');
      return;
    }

    setError('');
    const res = await register(name, email, password);

    if (res.success) {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setName('');
      setEmail('');
      setPassword('');
    }
  }

  if (userLoading) {
    return <Preloader />
  }

  return (
    <AuthLayout side={true}>
      <div className='w-full max-w-lg m-10'>
        <img src={Logo} className='mx-auto mb-8 max-w-[180px] w-full' />
        <p className='text-sm font-medium text-right'>Artıq hesabınız var? <Link className='text-blue-500 hover:underline' to='/login'> Giriş səhifəsinə qayıt</Link></p>
        <h2 className='text-2xl text-center m-8 font-bold'>Qeydiyyatdan keç</h2>
        <form className='register-form' onSubmit={handleSubmit}>
          <Input
            type='text'
            label='Ad'
            name='name'
            placeholder='Adınızı daxil edin'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Input
            type='text'
            label='E-poçt'
            name='email'
            placeholder='E-poçtunuzu daxil edin'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            type='password'
            label='Şifrə'
            name='password'
            placeholder='Şifrənizi daxil edin'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          {error && <p className='text-red-500 text-sm pb-2.5'>{error}</p>}
          <button className='btn-primary mt-3'>Hesab yarat</button>
        </form>
      </div>
      <Toaster />
    </AuthLayout>
  )
}

export default SignUp