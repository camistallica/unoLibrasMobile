// src/pages/Login.tsx
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { auth, db, googleProvider } from '../firebase'; // Importa o googleProvider
import { doc, setDoc } from 'firebase/firestore'; // Importa o setDoc
import bearLoginIcon from '../assets/Bear-login.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const history = useHistory();

  // Função para login com E-mail e Senha
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push('/home');
    } catch (err) {
      setError('E-mail ou senha inválidos.');
      console.error(err);
    }
  };

  // Nova função para login com Google
  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Verifica se é um novo utilizador
      const additionalUserInfo = getAdditionalUserInfo(result);
      if (additionalUserInfo?.isNewUser) {
        // Se for novo, cria um documento para ele no Firestore
        await setDoc(doc(db, 'usuarios', user.uid), {
          nome: user.displayName,
          email: user.email,
          pontos: 0,
          licoesConcluidas: [],
        });
      }
      history.push('/home');
    } catch (err) {
      setError('Falha ao autenticar com o Google. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <div style={{ textAlign: 'center' }}>
          <img id="login-bear" src={bearLoginIcon} alt="Mascote UnoLibras" />
          <h2 className="text-3xl font-bold mb-8">Entrar na sua conta</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="submit-button">Entrar</button>
        </form>

        <div className="divider">ou</div>

        <button type="button" className="google-login-button" onClick={handleGoogleSignIn}>
          <svg viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.87-2.13 15.84-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.11 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>
          <span>Entrar com o Google</span>
        </button>

        <p className="form-link">
          Não tem uma conta?{' '}
          <Link to="/signup">Crie uma aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;