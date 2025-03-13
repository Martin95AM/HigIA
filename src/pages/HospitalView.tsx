import React, { useState } from 'react';
import { FileText, AlertCircle, Clock, Lock, Shield } from 'lucide-react';
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

export const HospitalView: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [medicalLicense, setMedicalLicense] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAccessRequest = () => {
    if (medicalLicense) {
      setIsAuthorized(true);
      setShowMedicalHistory(true);
    } else {
      alert('Se requiere matrícula médica para acceder al historial');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Portal del Hospital</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <AlertCircle className="h-6 w-6 mr-2 text-red-600" />
              Emergencias en Curso
            </h3>
            
            <div className="space-y-4">
              {mockEmergencies.map((emergency) => (
                <div
                  key={emergency.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Emergencia #{emergency.id}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      emergency.triageLevel === 'red' ? 'bg-red-100 text-red-800' :
                      emergency.triageLevel === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {emergency.triageLevel.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Ubicación: {emergency.location}</p>
                    <p>Síntomas: {emergency.symptoms.join(', ')}</p>
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Llegada estimada: {emergency.estimatedArrival} min
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPatientId(emergency.patientId);
                      setShowMedicalHistory(true);
                    }}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Ver Historial</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              Historial Médico Confidencial
            </h3>
            
            {showMedicalHistory && (
              <div className="border rounded-lg p-4">
                {!isAuthorized ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Matrícula Médica</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={medicalLicense}
                        onChange={(e) => setMedicalLicense(e.target.value)}
                        placeholder="Ingrese su número de matrícula"
                      />
                    </div>
                    <button
                      onClick={handleAccessRequest}
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                      Verificar Acceso
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-lg">Datos del Paciente</h4>
                      <div className="flex items-center text-green-600">
                        <Shield className="h-5 w-5 mr-1" />
                        <span className="text-sm">Verificado</span>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Condiciones Crónicas</h5>
                      <div className="bg-gray-50 p-3 rounded">
                        {mockPrivateData.chronicConditions.map((condition, index) => (
                          <div key={index} className="mb-1 text-gray-700">{condition}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Medicamentos Actuales</h5>
                      <div className="bg-gray-50 p-3 rounded">
                        {mockPrivateData.medications.map((medication, index) => (
                          <div key={index} className="mb-1 text-gray-700">{medication}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Alergias</h5>
                      <div className="bg-gray-50 p-3 rounded">
                        {mockPrivateData.allergies.map((allergy, index) => (
                          <div key={index} className="mb-1 text-gray-700">{allergy}</div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Grupo Sanguíneo</h5>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-gray-700">{mockPrivateData.bloodType}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};