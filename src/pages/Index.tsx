
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDoctors } from '@/api/doctorService';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import DoctorCard from '@/components/DoctorCard';
import type { ApplicationDoctor } from '@/types/doctor';

const Index = () => {
  const [filteredDoctors, setFilteredDoctors] = useState<ApplicationDoctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsultType, setSelectedConsultType] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('fees');

  const { data: doctors = [], isLoading, error } = useQuery({
    queryKey: ['doctors'],
    queryFn: fetchDoctors,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleConsultTypeChange = (type: string) => {
    setSelectedConsultType(type === selectedConsultType ? '' : type);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  useEffect(() => {
    if (doctors) {
      let result = [...doctors];

      // Apply search filter
      if (searchQuery) {
        result = result.filter(doctor =>
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply consultation type filter
      if (selectedConsultType) {
        result = result.filter(
          doctor => doctor.consultationType === selectedConsultType
        );
      }

      // Apply specialties filter
      if (selectedSpecialties.length > 0) {
        result = result.filter(doctor =>
          doctor.specialties.some(specialty => selectedSpecialties.includes(specialty))
        );
      }

      // Apply sorting
      result.sort((a, b) => {
        if (sortOption === 'fees') {
          return a.fees - b.fees;
        }
        return b.experienceYears - a.experienceYears;
      });

      setFilteredDoctors(result);
    }
  }, [searchQuery, selectedConsultType, selectedSpecialties, sortOption, doctors]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error loading doctors. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <SearchBar doctors={doctors} onSearch={handleSearch} />
      
      <div className="flex gap-8 max-w-7xl mx-auto">
        <aside className="hidden md:block">
          <FilterPanel
            doctors={doctors}
            selectedConsultType={selectedConsultType}
            selectedSpecialties={selectedSpecialties}
            sortOption={sortOption}
            onConsultTypeChange={handleConsultTypeChange}
            onSpecialtyChange={handleSpecialtyChange}
            onSortChange={handleSortChange}
          />
        </aside>
        
        <main className="flex-1">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-500">
                No doctors found matching your criteria.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
