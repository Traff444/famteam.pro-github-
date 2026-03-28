import { Link } from 'react-router-dom';

const galleryItems = [
  {
    num: 'NO. 001', year: '2024', label: 'AI RECEPTIONIST',
    sub: 'Обрабатывает входящие и доводит до заявки',
    img: '/images/ai-receptionist.webp', path: '/roles/receptionist',
    bgSize: 'contain', bgPos: 'center bottom',
  },
  {
    num: 'NO. 002', year: '2025', label: 'AI GROWTH MANAGER',
    sub: 'Увеличивает конверсию из трафика в заявки',
    img: '/images/ai-growth-manager.webp', path: '/roles/growth',
    bgSize: 'contain', bgPos: 'center bottom',
  },
  {
    num: 'NO. 003', year: '2025', label: 'AI CREATOR',
    sub: 'Создаёт контент, который приводит клиентов',
    img: '/images/ai-creator.webp', path: '/roles/creator',
    bgSize: 'contain', bgPos: 'center bottom',
  },
];

const GallerySection = () => {
  return (
    <div className="snap-page" id="products">
      <div className="poster-container">
        <div className="b-bottom overflow-hidden flex items-center" style={{ minHeight: '80px' }}>
          <h2 className="massive-type" style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)', margin: 0 }}>ПРОДУКТЫ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 flex-1">
          {galleryItems.map((item, i) => (
            <Link
              key={item.num}
              to={item.path}
              className={`gallery-item relative flex flex-col justify-between p-4 overflow-hidden transition-colors hover:bg-secondary ${i < 2 ? 'b-right' : ''}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="gallery-meta relative z-10 flex justify-between font-medium text-xs">
                <span>{item.num}</span>
                <span>{item.year}</span>
              </div>
              <div className="gallery-img-clip">
                <img
                  src={item.img}
                  alt={`${item.label} — ${item.sub}`}
                  className="gallery-img-wrapper"
                  loading="lazy"
                  style={{ objectFit: 'contain', objectPosition: 'center bottom', width: '100%', height: '100%' }}
                />
              </div>
              <div className="gallery-text relative z-10">
                <span className="gallery-label">{item.label}</span>
                <span className="gallery-sub">{item.sub}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
