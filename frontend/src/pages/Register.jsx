import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ nom: '', email: '', motDePasse: '', role: 'client' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await register(form);
      loginUser(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#F7F7F5',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'inline-block', background: '#14A800', color: 'white',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: '800', fontSize: '1.4rem',
              padding: '4px 16px', borderRadius: '8px', marginBottom: '1rem',
            }}>FreeLance</div>
          </Link>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '1.6rem', fontWeight: '800', color: '#1A1A1A', marginBottom: '0.5rem',
          }}>Créer un compte gratuit</h1>
          <p style={{ color: '#5E6D55', fontSize: '0.9rem' }}>Rejoignez FreeLanceChain aujourd'hui</p>
        </div>

        <div style={{
          background: '#fff', border: '1px solid #E0E0E0',
          borderRadius: '16px', padding: '2rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          {/* Role selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#1A1A1A', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px' }}>
              Je suis...
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { value: 'client', icon: '💼', label: 'Client', desc: 'Je cherche des freelances' },
                { value: 'freelance', icon: '👨‍💻', label: 'Freelance', desc: 'Je propose mes services' },
              ].map(role => (
                <div key={role.value} onClick={() => setForm({ ...form, role: role.value })} style={{
                  background: form.role === role.value ? '#E8F5E9' : '#F7F7F5',
                  border: `2px solid ${form.role === role.value ? '#14A800' : '#E0E0E0'}`,
                  borderRadius: '10px', padding: '1rem',
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{role.icon}</div>
                  <div style={{ color: '#1A1A1A', fontWeight: '600', fontSize: '0.9rem' }}>{role.label}</div>
                  <div style={{ color: '#5E6D55', fontSize: '0.75rem', marginTop: '2px' }}>{role.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div style={{
              background: '#FFF3F3', border: '1px solid #FFCDD2',
              borderRadius: '8px', padding: '12px', marginBottom: '1.5rem',
              color: '#C62828', fontSize: '0.875rem', textAlign: 'center',
            }}>❌ {error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { label: 'Nom complet', key: 'nom', type: 'text', placeholder: 'Rachida Benali' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'votre@email.com' },
              { label: 'Mot de passe', key: 'motDePasse', type: 'password', placeholder: '8 caractères minimum' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: '#1A1A1A', fontSize: '0.875rem', fontWeight: '600', marginBottom: '6px' }}>
                  {field.label}
                </label>
                <input
                  type={field.type} placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  required
                  style={{
                    width: '100%', background: '#F7F7F5',
                    border: '1px solid #E0E0E0', borderRadius: '8px',
                    padding: '12px 14px', color: '#1A1A1A',
                    fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = '#14A800'}
                  onBlur={e => e.target.style.borderColor = '#E0E0E0'}
                />
              </div>
            ))}

            <button type="submit" disabled={loading} style={{
              width: '100%',
              background: loading ? '#9E9E9E' : '#14A800',
              color: 'white', border: 'none',
              padding: '13px', borderRadius: '30px',
              fontSize: '1rem', fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
              boxShadow: '0 4px 12px rgba(20,168,0,0.3)',
            }}>
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#5E6D55', fontSize: '0.875rem' }}>
            Déjà un compte ?{' '}
            <Link to="/login" style={{ color: '#14A800', fontWeight: '600', textDecoration: 'none' }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}