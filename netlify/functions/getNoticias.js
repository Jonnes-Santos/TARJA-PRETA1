// netlify/functions/getNoticias.js
const { createClient } = require("@supabase/supabase-js");

// Configurações do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  try {
    // Busca as notícias na tabela "noticias" do Supabase, ordenadas pela data de publicação (do mais recente para o mais antigo)
    const { data, error } = await supabase
      .from("noticias")
      .select("*")
      .order("data_publicacao", { ascending: false }); // Ordenação adicionada aqui

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Erro ao buscar notícias no Supabase" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno no servidor" }),
    };
  }
};