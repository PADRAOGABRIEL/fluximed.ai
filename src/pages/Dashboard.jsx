import React, { useEffect, useState } from "react";
import axios from "axios";
import ClinicaCard from "../components/ClinicaCard";
import NovaClinicaForm from "../components/novaClinicaForm";

const Dashboard = () => {
  const [clinicas, setClinicas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const carregarClinicas = async () => {
    try {
      const res = await axios.get("http://localhost:8000/clinicas");
      const dados = res.data.clinicas;
      const lista = Object.entries(dados).map(([id, info]) => ({
        id,
        ...info,
      }));
      setClinicas(lista);
    } catch (error) {
      console.error("Erro ao carregar clínicas:", error);
    }
  };

  useEffect(() => {
    carregarClinicas();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📋 Clínicas Ativas - FluxiMed AI</h1>

      <div className="mb-6">
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {mostrarFormulario ? "Fechar Formulário" : "➕ Adicionar Nova Clínica"}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="mb-8">
          <NovaClinicaForm onClinicaAdicionada={carregarClinicas} />
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicas.map((clinica) => (
          <ClinicaCard key={clinica.id} clinica={clinica} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
