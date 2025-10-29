// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react'; // Importe useState e useEffect
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import { deleteUser, updateProfile } from 'firebase/auth'; // Importe updateProfile
import { useAuth } from '../components/AuthProvider';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  // --- ESTADOS PARA O FORMULÁRIO DE UPDATE ---
  // Inicializa o estado com os dados atuais do usuário, ou string vazia
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');
  const [loading, setLoading] = useState(false); // Para feedback no botão

  // --- READ (LEITURA) ---
  // Sincroniza o estado do formulário se o currentUser carregar depois
  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setPhotoURL(currentUser.photoURL || '');
    }
  }, [currentUser]); // Executa sempre que o currentUser mudar

  
  // --- UPDATE (ATUALIZAR) ---
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página
    if (!currentUser) return;

    setLoading(true);
    try {
      // Função do Firebase para atualizar o perfil
      await updateProfile(currentUser, {
        displayName: displayName,
        photoURL: photoURL
      });
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE (EXCLUIR) ---
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
        
        {/* --- READ (LEITURA) --- */}
        <div className="profile-header">
          <img
            src={photoURL || '/src/assets/usuario.png'} // Usa o estado para refletir a mudança
            alt="Avatar"
            className="profile-avatar"
          />
          {/* Usa o estado para refletir a mudança */}
          <h2 className="profile-name">{displayName || 'Usuário sem nome'}</h2>
        </div>

        {/* --- CREATE / UPDATE (FORMULÁRIO) --- */}
        {/* Usando classes do seu CSS global (form-card, form-group, etc) */}
        <form onSubmit={handleProfileUpdate} className="form-card" style={{ maxWidth: '100%', padding: '1.5rem', boxShadow: 'none', backgroundColor: '#fff' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#374151' }}>Editar Perfil</h3>
          <div className="form-group">
            <label htmlFor="displayName">Nome</label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Seu nome de exibição"
              style={{ color: '#FFFFFF' }} // Garante que o texto seja legível
            />
          </div>
          <div className="form-group">
            <label htmlFor="photoURL">URL da Foto</label>
            <input
              id="photoURL"
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="http://exemplo.com/sua-foto.png"
              style={{ color: '#FFFFFF' }} // Garante que o texto seja legível
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>


        {/* --- READ (E-mail) e DELETE (Conta) --- */}
        <div className="profile-info-card" style={{ marginTop: '2rem' }}>
          <p className="profile-info-email">
            <span>E-mail:</span> {currentUser?.email}
            <small style={{ display: 'block', color: '#6b7280', marginTop: '4px' }}>(O e-mail não pode ser alterado por aqui)</small>
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