export interface Doctor {
    id: string;
    name: string;
    name_initials: string;
    photo: string;
    doctor_introduction: string;
    specialities: Array<{name: string}>;
    fees: string;
    experience: string;
    languages: string[];
    clinic: {
      name: string;
      address: {
        locality: string;
        city: string;
        address_line1: string;
        location: string;
        logo_url: string;
      }
    };
    video_consult: boolean;
    in_clinic: boolean;
  }
  
  // Helper function to adapt API doctor data to our application format
  export const adaptDoctorData = (apiDoctor: Doctor): ApplicationDoctor => {
    // Determine the consultation type based on the API data
    let consultationType: "Video Consult" | "In Clinic" = "In Clinic"; // Default
    if (apiDoctor.video_consult) {
      consultationType = "Video Consult";
    } else if (apiDoctor.in_clinic) {
      consultationType = "In Clinic";
    }
  
    return {
      id: parseInt(apiDoctor.id) || Math.floor(Math.random() * 10000),
      name: apiDoctor.name,
      consultationType: consultationType,
      specialties: apiDoctor.specialities.map(spec => spec.name),
      fees: parseInt(apiDoctor.fees.replace(/[^\d]/g, '')) || 0,
      experienceYears: parseInt(apiDoctor.experience.match(/\d+/)?.[0] || '0'),
      image: apiDoctor.photo
    };
  };
  
  // Our application's doctor type
  export interface ApplicationDoctor {
    id: number;
    name: string;
    consultationType: "Video Consult" | "In Clinic";
    specialties: string[];
    fees: number;
    experienceYears: number;
    image: string;
  }
  