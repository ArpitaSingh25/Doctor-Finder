import React from 'react';
import { ApplicationDoctor } from '@/types/doctor';

interface DoctorCardProps {
  doctor: ApplicationDoctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      data-testid="doctor-card"
    >
      <div className="flex items-start space-x-4">
        <img
          src={doctor.image || "https://via.placeholder.com/150"}
          alt={doctor.name}
          className="w-20 h-20 rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
          }}
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900" data-testid="doctor-name">{doctor.name}</h3>
          <div className="mt-1 space-y-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-600">Consultation:</span>
              <span className={`ml-2 px-2 py-0.5 text-sm rounded ${
                doctor.consultationType === 'Video Consult' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {doctor.consultationType}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {doctor.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
                  data-testid="doctor-specialty"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-blue-600 font-semibold" data-testid="doctor-fee">
                ${doctor.fees}/visit
              </span>
              <span className="text-gray-600 text-sm" data-testid="doctor-experience">
                {doctor.experienceYears} years exp.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
