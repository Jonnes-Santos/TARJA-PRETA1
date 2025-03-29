import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Noticia = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar notícia pelo ID com tratamento de erros
  useEffect(() => {
    setLoading(true);
    axios.get(`/.netlify/functions/getNoticiaById?id=${id}`)
      .then(response => {
        if (response.data) {
          setNoticia(response.data);
        } else {
          setError('Notícia não encontrada');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar notícia:', error);
        setError('Erro ao carregar notícia. Tente novamente mais tarde.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <a href="/" className="text-blue-500 hover:underline">Voltar para a página inicial</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Cabeçalho */}
      <header className="bg-black text-white py-8 shadow-lg">
        <div className="container mx-auto text-center max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-mono">TARJA PRETA</h1>
          <p className="mt-2 text-base md:text-lg text-gray-400">As últimas notícias do universo GUETO</p>
        </div>
      </header>

      {/* Conteúdo da Notícia */}
      <section className="container mx-auto my-12 px-4 max-w-7xl">
        <div className="bg-gray-900 p-6 md:p-8 rounded-lg shadow-2xl">
          {noticia.imagem_url && (
            <img
              src={noticia.imagem_url}
              alt={noticia.titulo}
              className="w-full h-auto md:h-96 object-cover rounded-lg mb-6 md:mb-8"
              loading="lazy"
            />
          )}

          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">{noticia.titulo}</h2>

          <div className="text-gray-300 text-base md:text-lg leading-relaxed space-y-4 md:space-y-6">
            {noticia.conteudo.split('\n').map((paragraph, index) => (
              <p key={index} className="text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="text-xs md:text-sm text-gray-500 mt-6 md:mt-8 text-center">
            Publicado em: {new Date(noticia.data_publicacao).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-white text-black py-8 mt-12">
        <div className="container mx-auto text-center max-w-7xl px-4">
          <p className="text-base md:text-lg">© 2025 TARJA PRETA. Todos os direitos reservados. Por @john1santoz</p>
          <nav className="mt-4">
            <ul className="flex flex-wrap justify-center gap-4">
              <li>
                <a href="/politica-de-privacidade" className="hover:text-blue-500 text-sm md:text-base">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/termos-de-uso" className="hover:text-blue-500 text-sm md:text-base">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="/contato" className="hover:text-blue-500 text-sm md:text-base">
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

export default Noticia;