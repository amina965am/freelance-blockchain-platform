import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMissionById, postuler, choisirFreelance, noterFreelance } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ message: '', prix: '' });
  const [note, setNote] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { fetchProject(); }, [id]);

  const fetchProject = async () => {
    try {
      const res = await getMissionById(id);
      setProject(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handlePostuler = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError('');
    try {
      await postuler(id, { message: form.message, prix: Number(form.prix) });
      setSuccess('✅ Candidature envoyée !');
      setForm({ message: '', prix: '' });
      fetchProject();
    } catch (err) { setError(err.response?.data?.message || 'Erreur'); }
    finally { setSubmitting(false); }
  };

  const handleChoisir = async (freelanceId) => {
    try {
      await choisirFreelance(id, { freelanceId });
      setSuccess('✅ Freelance sélectionné !');
      fetchProject();
    } catch (err) { setError(err.response?.data?.message || 'Erreur'); }
  };

  const handleNoter = async () => {
    try {
      await noterFreelance(id, { note });
      setSuccess('✅ Note enregistrée !');
      fetchProject();
    } catch (err) { setError(err.response?.data?.message || 'Erreur'); }
  };

  const isClient = user?.id === project?.client?._id || user?.id === project?.client;
  const hasApplied = project?.candidatures?.some(c => c.freelance?._id === user?.id || c.freelance === user?.id);

  if (loading) return (
    <div style={{ background: '#F7F7F5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: '#5E6D55' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏳</div>
        <p>Chargement...</p>
      </div>
    </div>
  );

  const statusConfig = {
    ouvert: { color: '#14A800', bg: '#E8F5E9', label: '● Ouvert' },
    en_cours: { color: '#F59E0B', bg: '#FFF8E1', label: '● En cours' },
    terminé: { color: '#9E9E9E', bg: '#F5F5F5', label: '● Terminé' },
  };
  const status = statusConfig[project?.statut];

  return (
    <div style={{ background: '#F7F7F5', minHeight: '100vh', fontFamily: "'Inter', sans-serif", padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        <button onClick={() => navigate('/projects')} style={{
          background: 'transparent', border: '1px solid #E0E0E0',
          color: '#5E6D55', padding: '8px 16px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '0.875rem', marginBottom: '1.5rem',
          fontWeight: '500',
        }}>← Retour aux missions</button>

        {success && (
          <div style={{ background: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: '8px', padding: '12px', marginBottom: '1rem', color: '#14A800', fontSize: '0.875rem' }}>
            {success}
          </div>
        )}
        {error && (
          <div style={{ background: '#FFF3F3', border: '1px solid #FFCDD2', borderRadius: '8px', padding: '12px', marginBottom: '1rem', color: '#C62828', fontSize: '0.875rem' }}>
            ❌ {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>

          {/* Main */}
          <div>
            <div style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: '12px', padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ background: status?.bg, color: status?.color, padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                  {status?.label}
                </span>
                <span style={{ color: '#9E9E9E', fontSize: '0.85rem' }}>
                  {new Date(project?.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>

              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.5rem', fontWeight: '800', color: '#1A1A1A', marginBottom: '1rem', lineHeight: '1.3' }}>
                {project?.titre}
              </h1>

              <p style={{ color: '#5E6D55', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {project?.description}
              </p>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid #F0F0F0' }}>
                <div>
                  <div style={{ color: '#9E9E9E', fontSize: '0.75rem', marginBottom: '4px' }}>Budget</div>
                  <div style={{ color: '#14A800', fontWeight: '800', fontSize: '1.3rem' }}>{project?.budget} $</div>
                </div>
                <div>
                  <div style={{ color: '#9E9E9E', fontSize: '0.75rem', marginBottom: '4px' }}>Candidatures</div>
                  <div style={{ color: '#1A1A1A', fontWeight: '700', fontSize: '1.3rem' }}>{project?.candidatures?.length || 0}</div>
                </div>
                <div>
                  <div style={{ color: '#9E9E9E', fontSize: '0.75rem', marginBottom: '4px' }}>Client</div>
                  <div style={{ color: '#1A1A1A', fontWeight: '600' }}>{project?.client?.nom || 'Anonyme'}</div>
                </div>
              </div>
            </div>

            {/* Candidatures pour client */}
            {isClient && project?.candidatures?.length > 0 && (
              <div style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.1rem', fontWeight: '700', color: '#1A1A1A', marginBottom: '1rem' }}>
                  Candidatures ({project.candidatures.length})
                </h2>
                {project.candidatures.map((c, i) => (
                  <div key={i} style={{
                    border: `1px solid ${c.statut === 'acceptée' ? '#C8E6C9' : '#E0E0E0'}`,
                    background: c.statut === 'acceptée' ? '#F1F8E9' : '#fff',
                    borderRadius: '10px', padding: '1.25rem', marginBottom: '0.75rem',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '38px', height: '38px', background: '#14A800', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>
                          {c.freelance?.nom?.charAt(0) || '?'}
                        </div>
                        <div>
                          <div style={{ color: '#1A1A1A', fontWeight: '600' }}>{c.freelance?.nom}</div>
                          <div style={{ color: '#9E9E9E', fontSize: '0.8rem' }}>{c.freelance?.email}</div>
                        </div>
                      </div>
                      <div style={{ color: '#14A800', fontWeight: '700', fontSize: '1.1rem' }}>{c.prix} $</div>
                    </div>
                    <p style={{ color: '#5E6D55', fontSize: '0.875rem', marginBottom: '0.75rem', lineHeight: '1.6' }}>{c.message}</p>
                    {project.statut === 'ouvert' && (
                      <button onClick={() => handleChoisir(c.freelance?._id)} style={{
                        background: '#14A800', color: 'white', border: 'none',
                        padding: '8px 20px', borderRadius: '30px',
                        cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem',
                      }}>✅ Choisir ce freelance</button>
                    )}
                    {c.statut === 'acceptée' && (
                      <span style={{ background: '#E8F5E9', color: '#14A800', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                        ✅ Sélectionné
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Notation */}
            {isClient && project?.statut === 'en_cours' && (
              <div style={{ background: '#fff', border: '1px solid #FFF9C4', borderRadius: '12px', padding: '1.5rem' }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.1rem', fontWeight: '700', color: '#1A1A1A', marginBottom: '1rem' }}>
                  ⭐ Noter le freelance
                </h2>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => setNote(n)} style={{
                      fontSize: '1.75rem', background: 'none', border: 'none',
                      cursor: 'pointer', opacity: n <= note ? 1 : 0.3,
                    }}>⭐</button>
                  ))}
                  <span style={{ color: '#1A1A1A', fontWeight: '700', alignSelf: 'center', marginLeft: '0.5rem' }}>{note}/5</span>
                </div>
                <button onClick={handleNoter} style={{
                  background: '#F59E0B', color: 'white', border: 'none',
                  padding: '10px 24px', borderRadius: '30px',
                  cursor: 'pointer', fontWeight: '600',
                }}>Valider & Terminer la mission</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {user && user.role === 'freelance' && project?.statut === 'ouvert' && !hasApplied && (
              <div style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: '12px', padding: '1.5rem', position: 'sticky', top: '90px' }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1rem', fontWeight: '700', color: '#1A1A1A', marginBottom: '1.25rem' }}>
                  Postuler à cette mission
                </h3>
                <form onSubmit={handlePostuler}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', color: '#1A1A1A', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Votre prix ($)</label>
                    <input type="number" placeholder="ex: 450"
                      value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })} required
                      style={{ width: '100%', background: '#F7F7F5', border: '1px solid #E0E0E0', borderRadius: '8px', padding: '10px 12px', color: '#1A1A1A', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', color: '#1A1A1A', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Message</label>
                    <textarea placeholder="Décrivez votre approche..."
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={4}
                      style={{ width: '100%', background: '#F7F7F5', border: '1px solid #E0E0E0', borderRadius: '8px', padding: '10px 12px', color: '#1A1A1A', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <button type="submit" disabled={submitting} style={{
                    width: '100%', background: submitting ? '#9E9E9E' : '#14A800',
                    color: 'white', border: 'none', padding: '12px',
                    borderRadius: '30px', cursor: submitting ? 'not-allowed' : 'pointer',
                    fontWeight: '600', boxShadow: '0 4px 12px rgba(20,168,0,0.3)',
                  }}>
                    {submitting ? '⏳ Envoi...' : 'Envoyer ma candidature'}
                  </button>
                </form>
              </div>
            )}

            {hasApplied && (
              <div style={{ background: '#E8F5E9', border: '1px solid #C8E6C9', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                <p style={{ color: '#14A800', fontWeight: '600' }}>Candidature envoyée !</p>
                <p style={{ color: '#5E6D55', fontSize: '0.85rem', marginTop: '0.5rem' }}>En attente de la réponse du client</p>
              </div>
            )}

            {!user && (
              <div style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔐</div>
                <p style={{ color: '#5E6D55', fontSize: '0.875rem', marginBottom: '1rem' }}>Connectez-vous pour postuler</p>
                <a href="/login" style={{ background: '#14A800', color: 'white', textDecoration: 'none', padding: '10px 24px', borderRadius: '30px', fontWeight: '600', display: 'inline-block' }}>
                  Se connecter
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}