// src/pages/Profile.tsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import { deleteUser } from 'firebase/auth';
import { useAuth } from '../components/AuthProvider';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleAccountDeletion = async () => {
    if (!currentUser) return;
    const confirmed = window.confirm('Você tem certeza que quer excluir sua conta? Esta ação não pode ser desfeita.');
    if (confirmed) {
      try {
        await deleteUser(currentUser);
        alert('Conta excluída com sucesso.');
        history.push('/signup');
      } catch (error) {
        console.error('Erro ao excluir conta:', error);
        alert('Erro ao excluir conta. Pode ser necessário fazer login novamente para completar esta ação.');
      }
    }
  };

  return (
    <Layout>
      <div className="profile-container">
        <h1 className="page-title" style={{ fontSize: '2.25rem', marginBottom: '2rem' }}>Informações da conta</h1>
        
        <div className="profile-header">
          <img
            src={currentUser?.photoURL || '/src/assets/usuario.png'}
            alt="Avatar"
            className="profile-avatar"
          />
          <h2 className="profile-name">{currentUser?.displayName}</h2>
        </div>

        <div className="profile-info-card">
          <p className="profile-info-email">
            <span>E-mail:</span> {currentUser?.email}
          </p>
          <hr style={{ margin: '1rem 0', border: '0', borderTop: '1px solid #e5e7eb' }} />
          <button onClick={handleAccountDeletion} className="profile-delete-button">
            Excluir conta
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;