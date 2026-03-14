import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const statusConfig = {
    ouvert: { bg: '#E8F5E9', color: '#14A800', label: '● Ouvert' },
    en_cours: { bg: '#FFF8E1', color: '#F59E0B', label: '● En cours' },
    terminé: { bg: '#F5F5F5', color: '#9E9E9E', label: '● Terminé' },
  };
  const status = statusConfig[project.statut] || statusConfig.ouvert;

  const timeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 60000);
    if (diff < 60) return `il y a ${diff} min`;
    if (diff < 1440) return `il y a ${Math.floor(diff / 60)}h`;
    return `il y a ${Math.floor(diff / 1440)}j`;
  };

  return (
    <div style={{
      background: '#fff', border: '1px solid #E0E0E0',
      borderRadius: '12px', padding: '1.5rem',
      transition: 'all 0.2s', cursor: 'pointer',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#14A800';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(20,168,0,0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#E0E0E0';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{
          background: status.bg, color: status.color,
          fontSize: '0.75rem', padding: '3px 10px',
          borderRadius: '20px', fontWeight: '600',
        }}>{status.label}</span>
        <span style={{ color: '#9E9E9E', fontSize: '0.8rem' }}>{timeAgo(project.createdAt)}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1.05rem', fontWeight: '700',
        color: '#1A1A1A', marginBottom: '0.5rem', lineHeight: '1.4',
      }}>{project.titre}</h3>

      {/* Description */}
      <p style={{
        color: '#5E6D55', fontSize: '0.875rem', lineHeight: '1.6',
        marginBottom: '1.25rem',
        display: '-webkit-box', WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{project.description}</p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {['Développement', 'Web', 'Design'].map(tag => (
          <span key={tag} style={{
            background: '#F7F7F5', color: '#5E6D55',
            fontSize: '0.75rem', padding: '4px 10px',
            borderRadius: '6px', fontWeight: '500',
          }}>{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: '1rem', borderTop: '1px solid #F0F0F0',
      }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div>
            <div style={{ color: '#9E9E9E', fontSize: '0.75rem' }}>Budget</div>
            <div style={{ color: '#14A800', fontWeight: '700', fontSize: '1rem' }}>
              {project.budget} $
            </div>
          </div>
          <div>
            <div style={{ color: '#9E9E9E', fontSize: '0.75rem' }}>Candidats</div>
            <div style={{ color: '#1A1A1A', fontWeight: '700', fontSize: '1rem' }}>
              {project.candidatures?.length || 0}
            </div>
          </div>
        </div>

        <Link to={`/projects/${project._id}`} style={{
          background: '#14A800', color: 'white',
          textDecoration: 'none', padding: '8px 20px',
          borderRadius: '30px', fontSize: '0.85rem', fontWeight: '600',
          transition: 'all 0.2s',
        }}>
          Voir détails
        </Link>
      </div>
    </div>
  );
}