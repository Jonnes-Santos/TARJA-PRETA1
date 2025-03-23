import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Importações do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar notícias
  useEffect(() => {
    axios.get('/.netlify/functions/getNoticias')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setNoticias(response.data);
        } else {
          setError("Dados inválidos recebidos da API.");
        }
      })
      .catch(error => {
        console.error("Erro ao buscar notícias:", error);
        setError("Erro ao carregar notícias. Tente novamente mais tarde.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Notícia principal (primeira notícia da lista)
  const noticiaPrincipal = noticias.length > 0 ? noticias[0] : null;

  // Sub-destaques (próximas duas notícias)
  const subDestaques = noticias.slice(1, 3);

  // Demais notícias (a partir da quarta notícia)
  const outrasNoticias = noticias.slice(3, 6);

  // Notícias em Destaque (a partir da sétima notícia)
  const noticiasDestaque = noticias.slice(6, 12);

  // Função para renderizar uma notícia
  const renderNoticia = (noticia, isPrincipal = false, isSubDestaque = false) => (
    <article className={`${isPrincipal || isSubDestaque ? 'noticia-destaque' : 'noticia-comum'} bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105`}>
      <div className={`relative ${isPrincipal || isSubDestaque ? 'h-96' : 'h-64'} overflow-hidden`}>
        <img
          src={noticia.imagem_url}
          alt={noticia.titulo}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {(isPrincipal || isSubDestaque) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        )}
        {(isPrincipal || isSubDestaque) && (
          <div className={`absolute bottom-0 left-0 right-0 ${isPrincipal ? 'p-6' : 'p-4'}`}>
            <h2 className={`${isPrincipal ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'} font-bold mb-2`}>
              <Link to={`/noticia/${noticia.id}`} className="hover:text-blue-500">
                {noticia.titulo}
              </Link>
            </h2>
            <p className="text-sm md:text-base text-gray-300">{noticia.resumo}</p>
          </div>
        )}
      </div>
      {!isPrincipal && !isSubDestaque && (
        <div className="p-4">
          <h2 className="text-lg md:text-xl font-bold mb-2">
            <Link to={`/noticia/${noticia.id}`} className="hover:text-blue-500">
              {noticia.titulo}
            </Link>
          </h2>
          <p className="text-sm md:text-base text-gray-300">{noticia.resumo}</p>
        </div>
      )}
    </article>
  );

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">Carregando...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Cabeçalho */}
      <header className="bg-black text-white py-8 shadow-lg">
        <div className="container mx-auto text-center max-w-9xl px-4">
          <h1 className="text-4xl md:text-7xl font-bold font-mono">TARJA PRETA</h1>
          <p className="mt-2 text-sm md:text-lg text-gray-400">AS ÚLTIMAS NOTÍCIAS DO UNIVERSO GUETO</p>
        </div>
      </header>

      {/* Destaque Principal */}
      <section className="destaque-principal py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {noticiaPrincipal && renderNoticia(noticiaPrincipal, true)}
        </div>
      </section>

      {/* Sub-destaques */}
      <section className="sub-destaques py-12 bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {subDestaques.map(noticia => (
            <React.Fragment key={noticia.id}>
              {renderNoticia(noticia, false, true)}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Seção de Notícias */}
      <section className="noticias py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold mb-8">PRESCRIÇÃO PERIFÉRICA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outrasNoticias.map(noticia => (
              <React.Fragment key={noticia.id}>
                {renderNoticia(noticia)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Notícias em Texto (Carrossel) */}
      <section className="noticias-texto py-12 bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold mb-8">NOTÍCIAS EM DESTAQUE</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {noticiasDestaque.map(noticia => (
              <SwiperSlide key={noticia.id}>
                <div className="bg-gray-900 rounded-lg shadow-2xl p-6 transform transition-transform hover:scale-105">
                  <Link to={`/noticia/${noticia.id}`} className="hover:text-blue-500">
                    <h3 className="text-lg md:text-xl font-bold mb-2">{noticia.titulo}</h3>
                    <p className="text-sm md:text-base text-gray-300">{noticia.resumo}</p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Seção de Vídeos do YouTube (Carrossel) */}
      <section className="videos py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold mb-8">LANÇAMENTOS DO YOUTUBE</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            <SwiperSlide>
              <div className="video-item bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4 p-4">A286 - Lei da Semeadura</h3>
                <iframe
                  src="https://www.youtube.com/embed/rTigTqb3G4g"
                  className="w-full h-64"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="video-item bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4 p-4">A286 Ft Cassino ZL - All in</h3>
                <iframe
                  src="https://www.youtube.com/embed/ondsAhPadls"
                  className="w-full h-64"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="video-item bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4 p-4">Mv Bill - Imorrível [Prod. DJ Caique]</h3>
                <iframe
                  src="https://www.youtube.com/embed/IrLfQQcC8NA"
                  className="w-full h-64"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="video-item bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold mb-4 p-4">Gunplay - Bible On The Dash [Music Video]</h3>
                <iframe
                  src="https://www.youtube.com/embed/pOys4uYn-b0"
                  className="w-full h-64"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Seção de Músicas e Lançamentos do Spotify (Carrossel) */}
      <section className="musicas py-12 bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold mb-8">LANÇAMENTOS DO SPOTIFY</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            <SwiperSlide>
              <div className="musica-item bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
                <a href="https://open.spotify.com/track/..." target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://open.spotify.com/intl-pt/track/6m8AgjfI28ER6odzMxmHtR?si=425748e85baf4dee"
                    alt="Capa do Álbum"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">Nome da Música</h3>
                    <p className="text-sm text-gray-300">Artista</p>
                  </div>
                </a>
              </div>
            </SwiperSlide>
            {/* Adicione mais músicas aqui */}
          </Swiper>
        </div>
      </section>

      {/* Seção de Assinatura */}
      <section className="assinatura py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-2xl font-bold mb-4">Receba as últimas notícias no seu e-mail</h2>
          <form className="form-assinatura flex justify-center">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="p-2 rounded-l-lg bg-gray-700 text-white focus:outline-none"
              required
              aria-label="Insira seu e-mail para assinar"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
              aria-label="Assinar newsletter"
            >
              Assinar
            </button>
          </form>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-white text-black py-8">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-lg">© 2025 TARJA PRETA. Todos os direitos reservados. Por @john1santoz</p>
          <nav className="mt-4">
            <ul className="flex justify-center space-x-4">
              <li>
                <a href="/politica-de-privacidade" className="hover:text-blue-500">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/termos-de-uso" className="hover:text-blue-500">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="/contato" className="hover:text-blue-500">
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Home;