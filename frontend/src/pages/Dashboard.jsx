import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMissions } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [myProjects, setMyProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await getMissions();
      const all = res.data;
      setAllProjects(all);
      if (user?.role === 'client') {
        setMyProjects(all.filter(p => p.client?._id === user.id || p.client === user.id));
     } else {
  setMyProjects(all.filter(p =>
    p.candidatures?.some(c => c.freelance?._id === user.id || c.freelance === user.id) ||
    p.freelanceChoisi === user.id ||
    p.freelanceChoisi?._id === user.id
  ));
}
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const stats = user?.role === 'client' ? [
    { label: 'Mes missions', value: myProjects.length, icon: '📋', color: '#14A800' },
    { label: 'En cours', value: myProjects.filter(p => p.statut === 'en_cours').length, icon: '⚡', color: '#F59E0B' },
    { label: 'Terminées', value: myProjects.filter(p => p.statut === 'terminé').length, icon: '✅', color: '#1565C0' },
    { label: 'Candidatures reçues', value: myProjects.reduce((acc, p) => acc + (p.candidatures?.length || 0), 0), icon: '👥', color: '#7B1FA2' },
  ] : [
    { label: 'Mes candidatures', value: myProjects.length, icon: '📨', color: '#14A800' },
    { label: 'En cours', value: myProjects.filter(p => p.statut === 'en_cours').length, icon: '⚡', color: '#F59E0B' },
    { label: 'Missions ouvertes', value: allProjects.length, icon: '🔍', color: '#1565C0' },
    { label: 'Ma note', value: user?.note > 0 ? `${user.note}/5` : 'N/A', icon: '⭐', color: '#F59E0B' },
  ];

  return (
    <div style={{ background: '#F7F7F5', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E0E0E0', padding: '2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1.6rem', fontWeight: '800', color: '#1A1A1A', marginBottom: '0.25rem',
            }}>Bonjour, {user?.nom} 👋</h1>
            <p style={{ color: '#5E6D55', fontSize: '0.9rem' }}>
              {user?.role === 'client' ? '💼 Espace Client' : '👨‍💻 Espace Freelance'}
            </p>
          </div>
          <Link to={user?.role === 'client' ? '/create-project' : '/projects'} style={{
            background: '#14A800', color: 'white', textDecoration: 'none',
            padding: '10px 24px', borderRadius: '30px', fontWeight: '600',
            boxShadow: '0 4px 12px rgba(20,168,0,0.3)',
          }}>
            {user?.role === 'client' ? '+ Nouvelle mission' : '🔍 Trouver des missions'}
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #E0E0E0',
              borderRadius: '12px', padding: '1.5rem',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: stat.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {stat.value}
              </div>
              <div style={{ color: '#5E6D55', fontSize: '0.875rem', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div style={{ background: '#fff', border: '1px solid #E0E0E0', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E0E0E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: '700', color: '#1A1A1A', fontSize: '1.1rem' }}>
              {user?.role === 'client' ? '📋 Mes missions' : '📨 Mes candidatures'}
            </h2>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#5E6D55' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
              <p>Chargement...</p>
            </div>
          ) : myProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
              <h3 style={{ color: '#1A1A1A', marginBottom: '0.5rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Rien ici pour l'instant
              </h3>
              <p style={{ color: '#5E6D55', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                {user?.role === 'client' ? 'Postez votre première mission !' : 'Explorez les missions disponibles !'}
              </p>
              <Link to={user?.role === 'client' ? '/create-project' : '/projects'} style={{
                background: '#14A800', color: 'white', textDecoration: 'none',
                padding: '10px 24px', borderRadius: '30px', fontWeight: '600',
              }}>
                {user?.role === 'client' ? '+ Créer une mission' : '🔍 Voir les missions'}
              </Link>
            </div>
          ) : (
            myProjects.map((project, i) => (
              <Link key={project._id} to={`/projects/${project._id}`} style={{
                textDecoration: 'none', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center',
                padding: '1.25rem 1.5rem', gap: '1rem', flexWrap: 'wrap',
                borderBottom: i < myProjects.length - 1 ? '1px solid #F0F0F0' : 'none',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#F7F7F5'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div>
                  <h3 style={{ color: '#1A1A1A', fontWeight: '600', marginBottom: '4px', fontSize: '0.95rem' }}>
                    {project.titre}
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem', color: '#5E6D55', fontSize: '0.82rem' }}>
                    <span>💰 {project.budget}$</span>
                    <span>👥 {project.candidatures?.length || 0} candidats</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    background: project.statut === 'ouvert' ? '#E8F5E9' : project.statut === 'en_cours' ? '#FFF8E1' : '#F5F5F5',
                    color: project.statut === 'ouvert' ? '#14A800' : project.statut === 'en_cours' ? '#F59E0B' : '#9E9E9E',
                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600',
                  }}>
                    {project.statut === 'ouvert' ? '● Ouvert' : project.statut === 'en_cours' ? '● En cours' : '● Terminé'}
                  </span>
                  <span style={{ color: '#14A800', fontWeight: '600' }}>→</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}