// src/components/NovaClinicaForm.jsx
import React, { useState } from "react";
import axios from "axios";

const NovaClinicaForm = ({ onClinicaAdicionada }) => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [prompt, setPrompt] = useState("");
  const [limiteMensal, setLimiteMensal] = useState(1000);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !nome || !telefone || !prompt) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/clinicas", {
        id,
        nome,
        telefone,
        prompt,
        limite_mensal: Number(limiteMensal),
      });

      setMensagem("✅ Clínica adicionada com sucesso!");
      setId("");
      setNome("");
      setTelefone("");
      setPrompt("");
      setLimiteMensal(1000);

      // ✅ Notifica o Dashboard para atualizar a lista
      if (onClinicaAdicionada) onClinicaAdicionada();
    } catch (error) {
      setMensagem("❌ Erro ao adicionar clínica: " + (error.response?.data?.detail || error.message));
    }
  };
  
  return (
    <div className="p-6 bg-white shadow rounded max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">➕ Cadastrar Nova Clínica</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">ID da Clínica (sem espaços)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Nome da Clínica</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Telefone (somente números, com DDI)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Prompt personalizado</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows="3"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Limite de mensagens mensal</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={limiteMensal}
            onChange={(e) => setLimiteMensal(e.target.value)}
            min="0"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Clínica
        </button>

        {mensagem && <p className="mt-4 text-sm">{mensagem}</p>}
      </form>
    </div>
  );
};

export default NovaClinicaForm;
