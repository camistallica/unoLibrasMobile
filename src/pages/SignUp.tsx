// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, User, AuthError } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import bearIcon from '../assets/Bear-singup.png';

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user: User = userCredential.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: name,
        email: email,
        pontos: 0,
        licoesConcluidas: [],
      });
      history.push('/home');
    } catch (err) {
      const authError = err as AuthError;
      if (authError.code === 'auth/weak-password') {
        setError('Senha muito fraca. Por favor, use pelo menos 6 caracteres.');
      } else if (authError.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso por outra conta.');
      } else if (authError.code === 'auth/invalid-email') {
        setError('O formato do e-mail é inválido.');
      } else {
        setError('Ocorreu um erro ao criar a conta. Tente novamente.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <img id="signup-bear" src={bearIcon} alt="UnoLibras Logo" />
        <h2 className="text-3xl font-bold mb-8 text-center">Criar sua conta</h2>

        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="submit-button">Criar conta</button>
        </form>

        <p className="form-link">
          Já tem uma conta?{' '}
          <Link to="/login">Entre aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;