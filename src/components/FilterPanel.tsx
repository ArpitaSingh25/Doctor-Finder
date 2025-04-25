import React from 'react';
import { ApplicationDoctor } from '@/types/doctor';

interface FilterPanelProps {
  doctors: ApplicationDoctor[];
  selectedConsultType: string;
  selectedSpecialties: string[];
  sortOption: string;
  onConsultTypeChange: (type: string) => void;
  onSpecialtyChange: (specialty: string) => void;
  onSortChange: (option: string) => void;
}

const FilterPanel = ({
  doctors,
  selectedConsultType,
  selectedSpecialties,
  sortOption,
  onConsultTypeChange,
  onSpecialtyChange,
  onSortChange
}: FilterPanelProps) => {
  const allSpecialties = Array.from(
    new Set(doctors.flatMap(doctor => doctor.specialties))
  ).sort();

  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Consultation Type</h3>
        <div className="space-y-2">
          {["Video Consult", "In Clinic"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="consultationType"
                value={type}
                checked={selectedConsultType === type}
                onChange={(e) => onConsultTypeChange(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Specialties</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allSpecialties.map((specialty) => (
            <label key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
                className="form-checkbox text-blue-600"
              />
              <span className="text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Sort By</h3>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="fees">Fees (Low to High)</option>
          <option value="experience">Experience (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
