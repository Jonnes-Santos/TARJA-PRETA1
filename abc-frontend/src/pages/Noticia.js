import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Noticia = () => {
  const { id } = useParams(); // Extrai o ID da URL
  const [noticia, setNoticia] = useState(null);

  // Buscar notícia pelo ID
  useEffect(() => {
    axios.get(`http://localhost:3001/noticias/${id}`)
      .then(response => setNoticia(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!noticia) return <div className="text-white text-center mt-8">Carregando...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Cabeçalho */}
      <header className="bg-black text-white py-8 shadow-lg">
        <div className="container mx-auto text-center max-w-7xl px-4">
          <h1 className="text-5xl font-bold font-mono">TARJA PRETA</h1>
          <p className="mt-2 text-lg text-gray-400">As últimas notícias do universo GUETO</p>
        </div>
      </header>

      {/* Conteúdo da Notícia */}
      <section className="container mx-auto my-12 px-4 max-w-7xl">
        <div className="bg-gray-900 p-8 rounded-lg shadow-2xl">
          {noticia.imagem_url && (
            <img
              src={noticia.imagem_url}
              alt={noticia.titulo}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          {/* Título centralizado */}
          <h2 className="text-4xl font-bold mb-6 text-center">{noticia.titulo}</h2>

          {/* Texto formatado */}
          <div className="text-gray-300 text-lg leading-relaxed space-y-6">
            {noticia.conteudo.split('\n').map((paragraph, index) => (
              <p key={index} className="text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Data de publicação */}
          <p className="text-sm text-gray-500 mt-8 text-center">
            Publicado em: {new Date(noticia.data_publicacao).toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-white text-black py-8 mt-12">
        <div className="container mx-auto text-center max-w-7xl px-4">
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

export default Noticia;