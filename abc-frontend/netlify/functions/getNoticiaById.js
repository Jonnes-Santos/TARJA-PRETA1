// netlify/functions/getNoticiaById.js
const { createClient } = require("@supabase/supabase-js");

// Configurações do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  try {
    const { id } = event.queryStringParameters; // Extrai o ID da URL

    // Busca a notícia pelo ID
    const { data, error } = await supabase
      .from("noticias")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Erro ao buscar notícia no Supabase" }),
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