
import { Doctor, adaptDoctorData, ApplicationDoctor } from "@/types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export const fetchDoctors = async (): Promise<ApplicationDoctor[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    const data: Doctor[] = await response.json();
    // Transform the data to match our application format
    return data.map(adaptDoctorData);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};
