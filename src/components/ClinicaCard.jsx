// src/components/ClinicaCard.jsx
import React, { useState } from "react";

const ClinicaCard = ({ clinica }) => {
  const [mostrarChats, setMostrarChats] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-4 border">
      <h2 className="text-xl font-semibold">{clinica.nome}</h2>
      <p className="text-gray-600">📞 {clinica.telefone}</p>
      <p className="text-gray-600">📊 {clinica.mensagens_usadas} / {clinica.limite_mensal} mensagens</p>

      <button
        onClick={() => setMostrarChats(!mostrarChats)}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {mostrarChats ? "Ocultar Conversas" : "Ver Conversas"}
      </button>

      {mostrarChats && (
        <div className="mt-4 bg-gray-50 p-2 rounded">
          {Object.entries(clinica.chats || {}).map(([paciente, chat]) => (
            <div key={paciente} className="mb-4 border-b pb-2">
              <h4 className="text-sm font-semibold text-gray-700">👤 {paciente}</h4>
              {chat.contexto.map((msg, idx) => (
                <p key={idx} className={`text-sm ${msg.role === "user" ? "text-gray-800" : "text-blue-700"}`}>
                  <strong>{msg.role === "user" ? "Paciente:" : "Bot:"}</strong> {msg.content}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicaCard;
