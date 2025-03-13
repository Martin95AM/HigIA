import React, { useState } from 'react';
import { Clipboard, UserCheck, Send, Shield, Lock } from 'lucide-react';
import type { EmergencyRequest, Patient, PrivatePatientData } from '../types';

const mockEmergencies: EmergencyRequest[] = [
  {
    id: '1',
    patientId: '1',
    timestamp: new Date(),
    location: 'Av. Libertador 1234',
    symptoms: ['Dolor en el pecho'],
    triageLevel: 'red',
    status: 'inProgress',
    estimatedArrival: 8
  }
];

const mockPrivateData: PrivatePatientData = {
  id: '1',
  medications: ['Enalapril 10mg', 'Aspirina 100mg'],
  conditions: ['Hipertensión', 'Arritmia'],
  allergies: ['Penicilina'],
  bloodType: 'A+',
  chronicConditions: ['Hipertensión arterial', 'Diabetes tipo 2']
};

export const AmbulanceView: React.FC = () => {
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyRequest | null>(null);
  const [signature, setSignature] = useState('');
  const [showPatientHistory, setShowPatientHistory] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleSubmitTriage = () => {
    if (!signature) {
      alert('Se requiere firma digital del médico');
      return;
    }
    alert('Informe enviado al hospital');
    setSelectedEmergency(null);
  };

  const handleAccessRequest = () => {
    if (signature) {
      setIsAuthorized(true);
      setShowPatientHistory(true);
    } else {
      alert('Se requiere matrícula médica para acceder al historial');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Portal de Ambulancia</h2>

        <div className="grid gap-6">
          {mockEmergencies.map((emergency) => (
            <div
              key={emergency.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Emergencia #{emergency.id}</h3>
                  <p className="text-gray-600">{emergency.location}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  emergency.triageLevel === 'red' ? 'bg-red-100 text-red-800' :
                  emergency.triageLevel === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {emergency.triageLevel.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p><strong>Síntomas:</strong> {emergency.symptoms.join(', ')}</p>
                <p><strong>Tiempo estimado de llegada:</strong> {emergency.estimatedArrival} minutos</p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedEmergency(emergency)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <Clipboard className="h-5 w-5" />
                  <span>Realizar Triage</span>
                </button>

                <button
                  onClick={() => handleAccessRequest()}
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <Lock className="h-5 w-5" />
                  <span>Ver Historial</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedEmergency && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <h3 className="text-xl font-bold mb-4">Informe de Triage</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Evaluación Inicial</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="Detalles de la evaluación..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Signos Vitales</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Presión Arterial"
                      className="p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Frecuencia Cardíaca"
                      className="p-2 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Firma Digital del Médico</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Número de Matrícula"
                      className="flex-1 p-2 border rounded"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                    />
                    <button
                      onClick={() => setSignature('DR12345')}
                      className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
                    >
                      <UserCheck className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setSelectedEmergency(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitTriage}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Send className="h-5 w-5" />
                  <span>Enviar al Hospital</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {showPatientHistory && isAuthorized && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Historial Médico Confidencial</h3>
                <div className="flex items-center text-green-600">
                  <Shield className="h-5 w-5 mr-1" />
                  <span className="text-sm">Datos Verificados</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Condiciones Crónicas</h4>
                  <div className="bg-gray-50 p-3 rounded">
                    {mockPrivateData.chronicConditions.map((condition, index) => (
                      <div key={index} className="mb-1 text-gray-700">{condition}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Medicamentos Actuales</h4>
                  <div className="bg-gray-50 p-3 rounded">
                    {mockPrivateData.medications.map((medication, index) => (
                      <div key={index} className="mb-1 text-gray-700">{medication}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Alergias</h4>
                  <div className="bg-gray-50 p-3 rounded">
                    {mockPrivateData.allergies.map((allergy, index) => (
                      <div key={index} className="mb-1 text-gray-700">{allergy}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Grupo Sanguíneo</h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-gray-700">{mockPrivateData.bloodType}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowPatientHistory(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};