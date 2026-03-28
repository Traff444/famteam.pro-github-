import { useState, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assetUrl } from '@/lib/asset-url';

const PRODUCTS = [
  { num: '01', label: 'AI Receptionist', desc: 'Обрабатывает входящие и доводит до заявки', path: '/roles/receptionist' },
  { num: '02', label: 'AI Growth Manager', desc: 'Увеличивает конверсию из трафика в заявки', path: '/roles/growth' },
  { num: '03', label: 'AI Creator', desc: 'Создаёт контент, который приводит клиентов', path: '/roles/creator' },
];

const NAV_ITEMS = [
  { id: 'about', label: 'ЧТО ЭТО' },
  { id: 'products', label: 'ПРОДУКТЫ' },
  { id: 'system', label: 'КАК ЭТО РАБОТАЕТ' },
  { id: 'cta', label: 'КОНТАКТЫ' },
] as const;

const OPEN_DELAY = 150;
const CLOSE_DELAY = 250;

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [productsVisible, setProductsVisible] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const clearTimers = () => {
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };

  const handleEnter = () => {
    clearTimers();
    if (productsOpen) return; // already open
    openTimer.current = setTimeout(() => {
      setProductsOpen(true);
      // Trigger visible on next frame for CSS transition
      requestAnimationFrame(() => setProductsVisible(true));
    }, OPEN_DELAY);
  };

  const handleLeave = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => {
      setProductsVisible(false);
      // Wait for fade-out animation before unmounting
      setTimeout(() => setProductsOpen(false), 180);
    }, CLOSE_DELAY);
  };

  const scrollToSection = useCallback((id: string) => {
    setMobileOpen(false);
    setProductsOpen(false);
    setProductsVisible(false);
    clearTimers();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, [location.pathname, navigate]);

  const handleItemClick = () => {
    clearTimers();
    setProductsVisible(false);
    setProductsOpen(false);
  };

  return (
    <header className="sys-header">
      <div className="sys-header__main">
        <Link to="/" className="sys-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img className="sys-logo__img" src={assetUrl("/images/logo.webp")} alt="FamTeam" />
          <div className="sys-logo__rule" />
          <span className="sys-logo__name">FAMTEAM</span>
        </Link>

        <nav className="sys-nav">
          {NAV_ITEMS.map(({ id, label }) =>
            id === 'products' ? (
              <div
                key={id}
                className="sys-nav__dropdown"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <button
                  type="button"
                  className={`sys-nav__tab${productsOpen ? ' sys-nav__tab--active' : ''}`}
                  onClick={() => scrollToSection('products')}
                >
                  {label}
                </button>
                {productsOpen && (
                  <div className={`sys-nav__menu${productsVisible ? ' sys-nav__menu--visible' : ''}`}>
                    {PRODUCTS.map(p => (
                      <Link
                        key={p.path}
                        to={p.path}
                        className="sys-nav__menu-item"
                        onClick={handleItemClick}
                      >
                        <span className="sys-nav__menu-num">{p.num}</span>
                        <div className="sys-nav__menu-body">
                          <span className="sys-nav__menu-label">{p.label}</span>
                          <span className="sys-nav__menu-desc">{p.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={id}
                type="button"
                className="sys-nav__tab"
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            )
          )}
        </nav>

        <button
          className={`sys-mobile-toggle${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(p => !p)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`sys-mobile-nav${mobileOpen ? ' sys-mobile-nav--open' : ''}`}>
        {NAV_ITEMS.map(({ id, label }) =>
          id === 'products' ? (
            <div key={id} className="sys-mobile-nav__group">
              <button
                type="button"
                className="sys-mobile-nav__item"
                onClick={() => scrollToSection('products')}
              >
                {label}
              </button>
              <div className="sys-mobile-nav__sub">
                {PRODUCTS.map(p => (
                  <Link
                    key={p.path}
                    to={p.path}
                    className="sys-mobile-nav__sub-item"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="sys-mobile-nav__sub-num">{p.num}</span>
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <button
              key={id}
              type="button"
              className="sys-mobile-nav__item"
              onClick={() => scrollToSection(id)}
            >
              {label}
            </button>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
