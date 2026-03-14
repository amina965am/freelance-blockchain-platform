import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { creerMission } from '../services/api';

export default function CreateProject() {
  const [form, setForm] = useState({ titre: '', description: '', budget: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await creerMission({ ...form, budget: Number(form.budget) });
      navigate('/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#F7F7F5', minHeight: '100vh',
      padding: '2rem', fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '1.6rem', fontWeight: '800', color: '#1A1A1A', marginBottom: '0.25rem',
          }}>Poster une mission</h1>
          <p style={{ color: '#5E6D55', fontSize: '0.9rem' }}>
            Décrivez votre projet et recevez des candidatures de freelances qualifiés
          </p>
        </div>

        {error && (
          <div style={{
            background: '#FFF3F3', border: '1px solid #FFCDD2',
            borderRadius: '8px', padding: '12px', marginBottom: '1.5rem',
            color: '#C62828', fontSize: '0.875rem',
          }}>❌ {error}</div>
        )}

        <div style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: '16px', padding: '2rem' }}>
          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#1A1A1A', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px' }}>
                Titre de la mission *
              </label>
              <input
                type="text" placeholder="ex: Créer un site web e-commerce avec React"
                value={form.titre}
                onChange={e => setForm({ ...form, titre: e.target.value })}
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

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#1A1A1A', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px' }}>
                Description détaillée *
              </label>
              <textarea
                placeholder="Décrivez votre projet en détail : objectifs, fonctionnalités attendues, délais, technologies souhaitées..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required rows={7}
                style={{
                  width: '100%', background: '#F7F7F5',
                  border: '1px solid #E0E0E0', borderRadius: '8px',
                  padding: '12px 14px', color: '#1A1A1A',
                  fontSize: '0.95rem', outline: 'none',
                  resize: 'vertical', boxSizing: 'border-box',
                  fontFamily: "'Inter', sans-serif", lineHeight: '1.6',
                }}
                onFocus={e => e.target.style.borderColor = '#14A800'}
                onBlur={e => e.target.style.borderColor = '#E0E0E0'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: '#1A1A1A', fontWeight: '600', fontSize: '0.875rem', marginBottom: '8px' }}>
                Budget ($) *
              </label>
              <input
                type="number" placeholder="ex: 500" min="1"
                value={form.budget}
                onChange={e => setForm({ ...form, budget: e.target.value })}
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

            {/* Preview */}
            {(form.titre || form.budget) && (
              <div style={{
                background: '#E8F5E9', border: '1px solid #C8E6C9',
                borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem',
              }}>
                <div style={{ color: '#14A800', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  👁️ Aperçu de votre mission
                </div>
                {form.titre && <div style={{ color: '#1A1A1A', fontWeight: '600', marginBottom: '4px' }}>{form.titre}</div>}
                {form.budget && <div style={{ color: '#14A800', fontWeight: '700' }}>Budget : {form.budget} $</div>}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" onClick={() => navigate(-1)} style={{
                flex: 1, background: 'transparent',
                border: '1px solid #E0E0E0', color: '#5E6D55',
                padding: '12px', borderRadius: '30px',
                cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem',
              }}>Annuler</button>
              <button type="submit" disabled={loading} style={{
                flex: 2,
                background: loading ? '#9E9E9E' : '#14A800',
                color: 'white', border: 'none',
                padding: '12px', borderRadius: '30px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600', fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(20,168,0,0.3)',
              }}>
                {loading ? '⏳ Publication...' : '🚀 Publier la mission'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}