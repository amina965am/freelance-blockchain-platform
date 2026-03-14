import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  const stats = [
    { value: '12 000+', label: 'Freelances actifs' },
    { value: '8 000+', label: 'Missions postées' },
    { value: '99%', label: 'Paiements sécurisés' },
    { value: '50+', label: 'Pays couverts' },
  ];

  const categories = [
    { icon: '💻', label: 'Développement Web', count: '1 200+' },
    { icon: '🎨', label: 'Design & Créatif', count: '800+' },
    { icon: '📱', label: 'Mobile', count: '600+' },
    { icon: '📊', label: 'Marketing', count: '900+' },
    { icon: '✍️', label: 'Rédaction', count: '700+' },
    { icon: '⛓️', label: 'Blockchain', count: '400+' },
    { icon: '🤖', label: 'Intelligence Artificielle', count: '500+' },
    { icon: '🔒', label: 'Cybersécurité', count: '300+' },
  ];

  const howItWorks = [
    { step: '1', icon: '📋', title: 'Postez votre mission', desc: 'Décrivez votre projet et fixez votre budget en quelques minutes.' },
    { step: '2', icon: '👥', title: 'Recevez des offres', desc: 'Des freelances qualifiés vous envoient leurs candidatures rapidement.' },
    { step: '3', icon: '🤝', title: 'Choisissez et payez', desc: 'Sélectionnez le meilleur profil et payez via smart contract sécurisé.' },
    { step: '4', icon: '⭐', title: 'Évaluez le travail', desc: 'Validez la livraison et laissez une note pour la communauté.' },
  ];

  return (
    <div style={{ background: '#F7F7F5', fontFamily: "'Inter', sans-serif" }}>

      {/* Hero */}
      <section style={{
        background: '#fff',
        padding: '5rem 2rem 4rem',
        borderBottom: '1px solid #E0E0E0',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#E8F5E9', color: '#14A800',
              borderRadius: '30px', padding: '6px 16px',
              fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem',
            }}>
              ⛓️ Plateforme Décentralisée
            </div>

            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: '800', lineHeight: '1.2',
              color: '#1A1A1A', marginBottom: '1.25rem',
            }}>
              Trouvez le talent
              <span style={{ color: '#14A800' }}> parfait </span>
              pour votre projet
            </h1>

            <p style={{
              color: '#5E6D55', fontSize: '1.05rem',
              lineHeight: '1.7', marginBottom: '2rem', maxWidth: '480px',
            }}>
              La première plateforme freelance décentralisée. Paiements sécurisés par
              smart contract, sans intermédiaire, sans commission cachée.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/projects" style={{
                background: '#14A800', color: 'white',
                textDecoration: 'none', padding: '14px 28px',
                borderRadius: '30px', fontSize: '1rem', fontWeight: '600',
                boxShadow: '0 4px 15px rgba(20,168,0,0.3)',
              }}>Trouver une mission</Link>
              <Link to={user ? '/create-project' : '/register'} style={{
                background: 'transparent', color: '#14A800',
                textDecoration: 'none', padding: '14px 28px',
                borderRadius: '30px', fontSize: '1rem', fontWeight: '600',
                border: '2px solid #14A800',
              }}>Poster une mission</Link>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
              {['✅ Gratuit', '🔐 Sécurisé', '⚡ Rapide'].map(item => (
                <span key={item} style={{ color: '#5E6D55', fontSize: '0.875rem', fontWeight: '500' }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Right side illustration */}
          <div style={{
            background: 'linear-gradient(135deg, #E8F5E9, #F1F8E9)',
            borderRadius: '20px', padding: '2.5rem',
            border: '1px solid #C8E6C9',
          }}>
            <div style={{ marginBottom: '1rem', background: '#fff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <div style={{ width: '36px', height: '36px', background: '#14A800', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>A</div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Amina E.</div>
                  <div style={{ color: '#9E9E9E', fontSize: '0.75rem' }}>Développeuse Full Stack</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#14A800', fontWeight: '700' }}>⭐ 4.9</div>
              </div>
              <div style={{ color: '#5E6D55', fontSize: '0.8rem' }}>Disponible pour missions React, Node.js, Blockchain</div>
            </div>

            <div style={{ background: '#fff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Créer un site e-commerce</span>
                <span style={{ color: '#14A800', fontWeight: '700' }}>500 $</span>
              </div>
              <div style={{ color: '#5E6D55', fontSize: '0.8rem', marginBottom: '0.75rem' }}>3 candidatures reçues</div>
              <div style={{ background: '#E8F5E9', borderRadius: '6px', height: '6px' }}>
                <div style={{ background: '#14A800', width: '60%', height: '100%', borderRadius: '6px' }} />
              </div>
            </div>

            <div style={{
              background: '#14A800', color: 'white',
              borderRadius: '12px', padding: '1rem',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ fontSize: '1.5rem' }}>🔐</span>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Paiement sécurisé</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Smart Contract Ethereum</div>
              </div>
              <div style={{ marginLeft: 'auto', fontWeight: '800', fontSize: '1.1rem' }}>500 $</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: '#fff', borderBottom: '1px solid #E0E0E0', padding: '2.5rem 2rem' }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem', textAlign: 'center',
        }}>
          {stats.map(stat => (
            <div key={stat.label}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '2rem', fontWeight: '800', color: '#14A800',
              }}>{stat.value}</div>
              <div style={{ color: '#5E6D55', fontSize: '0.9rem', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '1.8rem', fontWeight: '800',
            color: '#1A1A1A', marginBottom: '0.5rem',
          }}>Explorer par catégorie</h2>
          <p style={{ color: '#5E6D55', marginBottom: '2.5rem' }}>
            Des milliers de freelances dans tous les domaines
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {categories.map(cat => (
              <Link to="/projects" key={cat.label} style={{
                textDecoration: 'none',
                background: '#fff', border: '1px solid #E0E0E0',
                borderRadius: '12px', padding: '1.5rem',
                transition: 'all 0.2s', display: 'block',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#14A800';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(20,168,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E0E0E0';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{cat.icon}</div>
                <div style={{ color: '#1A1A1A', fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px' }}>{cat.label}</div>
                <div style={{ color: '#14A800', fontSize: '0.8rem', fontWeight: '500' }}>{cat.count} freelances</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: '#fff', padding: '5rem 2rem', borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '1.8rem', fontWeight: '800',
            color: '#1A1A1A', marginBottom: '0.5rem', textAlign: 'center',
          }}>Comment ça marche ?</h2>
          <p style={{ color: '#5E6D55', textAlign: 'center', marginBottom: '3rem' }}>
            Simple, rapide et 100% sécurisé
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {howItWorks.map((item) => (
              <div key={item.step} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px', height: '60px',
                  background: '#E8F5E9', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem', fontSize: '1.75rem',
                }}>{item.icon}</div>
                <div style={{
                  background: '#14A800', color: 'white',
                  width: '24px', height: '24px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 0.75rem', fontSize: '0.75rem', fontWeight: '700',
                }}>{item.step}</div>
                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: '700', color: '#1A1A1A',
                  marginBottom: '0.5rem', fontSize: '1rem',
                }}>{item.title}</h3>
                <p style={{ color: '#5E6D55', fontSize: '0.875rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem', background: '#F7F7F5' }}>
        <div style={{
          maxWidth: '700px', margin: '0 auto', textAlign: 'center',
          background: '#14A800', borderRadius: '20px', padding: '4rem 2rem',
        }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '2rem', fontWeight: '800',
            color: '#fff', marginBottom: '1rem',
          }}>Prêt à commencer ?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', fontSize: '1rem' }}>
            Rejoignez des milliers de freelances et clients sur FreeLanceChain
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              background: '#fff', color: '#14A800',
              textDecoration: 'none', padding: '14px 32px',
              borderRadius: '30px', fontSize: '1rem', fontWeight: '700',
            }}>Créer un compte gratuit</Link>
            <Link to="/projects" style={{
              background: 'transparent', color: '#fff',
              textDecoration: 'none', padding: '14px 32px',
              borderRadius: '30px', fontSize: '1rem', fontWeight: '600',
              border: '2px solid rgba(255,255,255,0.6)',
            }}>Voir les missions</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#fff', borderTop: '1px solid #E0E0E0',
        padding: '2rem', textAlign: 'center',
        color: '#9E9E9E', fontSize: '0.875rem',
      }}>
        © 2026 FreeLanceChain — Plateforme Freelance Décentralisée ⛓️
      </footer>
    </div>
  );
}