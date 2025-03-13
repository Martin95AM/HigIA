import React, { useState } from 'react';
import { Phone, Clock, AlertTriangle, FileText, Shield } from 'lucide-react';
import type { Patient, PrivatePatientData } from '../types';

const mockPatients: Patient[] = [
  { id: '1', name: 'Juan Pérez', symptoms: ['Dolor en el pecho'], triageLevel: 'red', position: 1, waitTime: 0 },
  { id: '2', name: 'María García', symptoms: ['Fractura'], triageLevel: 'yellow', position: 2, waitTime: 15 },
  { id: '3', name: 'Carlos López', symptoms: ['Dolor de cabeza'], triageLevel: 'green', position: 3, waitTime: 30 },
];

const mockPrivateData: PrivatePatientData = {
  id: '1',
  medications: ['Enalapril 10mg', 'Aspirina 100mg'],
  conditions: ['Hipertensión', 'Arritmia'],
  allergies: ['Penicilina'],
  bloodType: 'A+',
  chronicConditions: ['Hipertensión arterial', 'Diabetes tipo 2']
};

export const PatientView: React.FC = () => {
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [symptoms, setSymptoms] = useState('');

  const handleEmergencyCall = () => {
    if (symptoms.toLowerCase().includes('dolor en el pecho')) {
      alert('¡EMERGENCIA CRÍTICA! Una ambulancia está en camino. Tiempo estimado: 8 minutos');
    }
    setShowEmergencyForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Portal del Paciente</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setShowEmergencyForm(true)}
            className="flex items-center justify-center space-x-2 bg-red-600 text-white py-4 px-6 rounded-lg hover:bg-red-700"
          >
            <Phone className="h-6 w-6" />
            <span className="text-lg font-semibold">Llamar Ambulancia</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700">
            <Clock className="h-6 w-6" />
            <span className="text-lg font-semibold">Solicitar Turno</span>
          </button>

          <button
            onClick={() => setShowMedicalHistory(true)}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700"
          >
            <FileText className="h-6 w-6" />
            <span className="text-lg font-semibold">Historia Clínica</span>
          </button>
        </div>

        {showEmergencyForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Describir Síntomas</h3>
              <textarea
                className="w-full p-2 border rounded mb-4"
                rows={4}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describa sus síntomas..."
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowEmergencyForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEmergencyCall}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}

        {showMedicalHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Historia Clínica</h3>
                <div className="flex items-center text-green-600">
                  <Shield className="h-5 w-5 mr-1" />
                  <span className="text-sm">Datos Encriptados</span>
                </div>
              </div>

              <div className="space-y-6">
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
                  onClick={() => setShowMedicalHistory(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Cola de Espera Actual</h3>
          <div className="space-y-3">
            {mockPatients.map((patient) => (
              <div
                key={patient.id}
                className={`p-4 rounded-lg flex items-center justify-between ${
                  patient.triageLevel === 'red' ? 'bg-red-100' :
                  patient.triageLevel === 'yellow' ? 'bg-yellow-100' : 'bg-green-100'
                }`}
              >
                <div>
                  <span className="font-semibold">Posición {patient.position}</span>
                  <div className="text-sm text-gray-600">
                    Tiempo estimado: {patient.waitTime} minutos
                  </div>
                </div>
                {patient.triageLevel === 'red' && (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};