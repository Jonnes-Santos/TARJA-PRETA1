const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Configuração do Supabase
const supabaseUrl = 'https://aflykitujfyqmlcuedbw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmbHlraXR1amZ5cW1sY3VlZGJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NTQzMTYsImV4cCI6MjA1NzUzMDMxNn0.TLYpwV2Wx8AhTQSMPLGH9DVRum-xF3L_es5DkB48s1k';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// Rota para listar notícias
app.get('/noticias', async (req, res) => {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .order('data_publicacao', { ascending: false });

  if (error) return res.status(500).json({ error });
  res.json(data);
});

// Rota para buscar uma notícia pelo ID
app.get('/noticias/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});