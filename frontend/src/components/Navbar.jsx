import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => { logoutUser(); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid #E0E0E0',
      position: 'sticky', top: 0, zIndex: 1000,
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: '72px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: '#14A800', color: 'white',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: '800', fontSize: '1.4rem',
            padding: '4px 12px', borderRadius: '8px',
            letterSpacing: '-0.5px',
          }}>
            Free<span style={{ color: '#B2F0E8' }}>Lance</span>
          </div>
        </Link>

        {/* Center Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/projects" style={{
            color: isActive('/projects') ? '#14A800' : '#5E6D55',
            textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500',
            borderBottom: isActive('/projects') ? '2px solid #14A800' : '2px solid transparent',
            paddingBottom: '4px', transition: 'all 0.2s',
          }}>Trouver des missions</Link>

          {user && (
            <Link to="/dashboard" style={{
              color: isActive('/dashboard') ? '#14A800' : '#5E6D55',
              textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500',
              borderBottom: isActive('/dashboard') ? '2px solid #14A800' : '2px solid transparent',
              paddingBottom: '4px',
            }}>Mon espace</Link>
          )}

          {user?.role === 'client' && (
            <Link to="/create-project" style={{
              color: isActive('/create-project') ? '#14A800' : '#5E6D55',
              textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500',
              borderBottom: isActive('/create-project') ? '2px solid #14A800' : '2px solid transparent',
              paddingBottom: '4px',
            }}>Poster une mission</Link>
          )}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#F7F7F5', border: '1px solid #E0E0E0',
                borderRadius: '50px', padding: '6px 14px',
              }}>
                <div style={{
                  width: '32px', height: '32px',
                  background: '#14A800', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: '700', fontSize: '14px',
                }}>
                  {user.nom?.charAt(0).toUpperCase()}
                </div>
                <span style={{ color: '#1A1A1A', fontSize: '0.9rem', fontWeight: '500' }}>{user.nom}</span>
                <span style={{
                  background: user.role === 'client' ? '#E8F5E9' : '#E3F2FD',
                  color: user.role === 'client' ? '#14A800' : '#1565C0',
                  fontSize: '0.72rem', padding: '2px 8px',
                  borderRadius: '20px', fontWeight: '600',
                }}>{user.role}</span>
              </div>
              <button onClick={handleLogout} style={{
                background: 'transparent', border: '1px solid #E0E0E0',
                color: '#5E6D55', padding: '8px 16px', borderRadius: '8px',
                cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500',
              }}>Déconnexion</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link to="/login" style={{
                color: '#14A800', textDecoration: 'none',
                padding: '8px 20px', borderRadius: '30px',
                fontSize: '0.9rem', fontWeight: '600',
                border: '1px solid #14A800', transition: 'all 0.2s',
              }}>Connexion</Link>
              <Link to="/register" style={{
                background: '#14A800', color: 'white',
                textDecoration: 'none', padding: '8px 20px',
                borderRadius: '30px', fontSize: '0.9rem', fontWeight: '600',
                boxShadow: '0 2px 8px rgba(20,168,0,0.3)',
              }}>Inscription</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}