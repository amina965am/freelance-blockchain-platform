import { useState, useEffect } from 'react';
import { getMissions } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const res = await getMissions();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = projects.filter(p =>
    p.titre.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#F7F7F5', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E0E0E0', padding: '2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.6rem', fontWeight: '800', color: '#1A1A1A', marginBottom: '0.25rem',
              }}>Missions disponibles</h1>
              <p style={{ color: '#5E6D55', fontSize: '0.9rem' }}>{projects.length} missions ouvertes</p>
            </div>
            {user?.role === 'client' && (
              <Link to="/create-project" style={{
                background: '#14A800', color: 'white', textDecoration: 'none',
                padding: '10px 24px', borderRadius: '30px',
                fontWeight: '600', fontSize: '0.9rem',
                boxShadow: '0 4px 12px rgba(20,168,0,0.3)',
              }}>+ Poster une mission</Link>
            )}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '500px' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9E9E9E' }}>🔍</span>
            <input
              type="text" placeholder="Rechercher une mission..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', background: '#F7F7F5',
                border: '1px solid #E0E0E0', borderRadius: '30px',
                padding: '11px 16px 11px 42px',
                color: '#1A1A1A', fontSize: '0.9rem', outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = '#14A800'}
              onBlur={e => e.target.style.borderColor = '#E0E0E0'}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#5E6D55' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏳</div>
            <p>Chargement des missions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem',
            background: '#fff', border: '1px solid #E0E0E0', borderRadius: '16px',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h3 style={{ color: '#1A1A1A', fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: '0.5rem' }}>
              Aucune mission trouvée
            </h3>
            <p style={{ color: '#5E6D55', marginBottom: '1.5rem' }}>
              {search ? "Essayez d'autres mots-clés" : 'Aucune mission disponible pour le moment'}
            </p>
            {user?.role === 'client' && (
              <Link to="/create-project" style={{
                background: '#14A800', color: 'white', textDecoration: 'none',
                padding: '10px 24px', borderRadius: '30px', fontWeight: '600',
              }}>Poster une mission</Link>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {filtered.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}