// netlify/functions/getNews.js
const { createClient } = require("@supabase/supabase-js");

// Configurações do Supabase
const supabaseUrl = process.env.SUPABASE_URL; // URL do seu projeto no Supabase
const supabaseKey = process.env.SUPABASE_KEY; // Chave pública do Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  try {
    // Busca as notícias na tabela "noticias" do Supabase
    const { data, error } = await supabase
      .from("noticias") // Nome da tabela no Supabase
      .select("*"); // Seleciona todas as colunas

    // Se houver erro na consulta, retorna uma mensagem de erro
    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Erro ao buscar notícias no Supabase" }),
      };
    }

    // Retorna as notícias em formato JSON
    return {
      statusCode: 200,
      body: JSON.stringify(data), // Dados das notícias
    };
  } catch (error) {
    // Se ocorrer um erro inesperado, retorna uma mensagem de erro
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno no servidor" }),
    };
  }
};