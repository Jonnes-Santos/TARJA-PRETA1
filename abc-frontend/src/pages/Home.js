import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [noticias, setNoticias] = useState([]);

  // Buscar notícias
  useEffect(() => {
    axios.get('http://localhost:3001/noticias')
      .then(response => setNoticias(response.data))
      .catch(error => console.error(error));
  }, []);

  // Notícia principal (primeira notícia da lista)
  const noticiaPrincipal = noticias.length > 0 ? noticias[0] : null;

  // Sub-destaques (próximas duas notícias)
  const subDestaques = noticias.slice(1, 3);

  // Demais notícias (a partir da quarta notícia)
  const outrasNoticias = noticias.slice(3);

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
          {noticiaPrincipal && (
            <article className="noticia-destaque bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative h-100 overflow-hidden">
                <img
                  src={noticiaPrincipal.imagem_url}
                  alt={noticiaPrincipal.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
                    <Link to={`/noticia/${noticiaPrincipal.id}`} className="hover:text-blue-500">
                      {noticiaPrincipal.titulo}
                    </Link>
                  </h2>
                  <p className="text-sm md:text-base text-gray-300">{noticiaPrincipal.resumo}</p>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* Sub-destaques */}
      <section className="sub-destaques py-12 bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {subDestaques.map(noticia => (
            <article key={noticia.id} className="sub-noticia bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={noticia.imagem_url}
                  alt={noticia.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    <Link to={`/noticia/${noticia.id}`} className="hover:text-blue-500">
                      {noticia.titulo}
                    </Link>
                  </h3>
                  <p className="text-sm md:text-base text-gray-300">{noticia.resumo}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Seção de Notícias */}
      <section className="noticias py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold mb-8">PRESCRIÇÃO PERIFÉRICA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outrasNoticias.map(noticia => (
              <article key={noticia.id} className="noticia bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={noticia.imagem_url}
                    alt={noticia.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    <Link to={`/noticia/${noticia.id}`} className="hover:text-blue-500">
                      {noticia.titulo}
                    </Link>
                  </h3>
                  <p className="text-sm md:text-base text-gray-300">{noticia.resumo}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Vídeos */}
      <section className="videos py-12 bg-gray-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold mb-8">LANÇAMENTOS DO YOUTUBE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="video-item bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold mb-4 p-4">A286 - Lei da Semeadura</h3>
              <iframe
                src="https://youtu.be/rTigTqb3G4g?si=uzMrwqFh7KWKbpI3"
                className="w-full h-64"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-item bg-gray-900 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold mb-4 p-4">A286 Ft Cassino ZL - All in</h3>
              <iframe
                src="https://youtu.be/ondsAhPadls?si=TQ_Ji5vz-ItHRe7o"
                className="w-full h-64"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
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
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
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
              <li><a href="#" className="hover:text-blue-500">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-blue-500">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-blue-500">Contato</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Home;