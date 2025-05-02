import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

export interface Shelter {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  capacity: number;
  currentOccupancy: number;
  services: string[];
  location: {
    lat: number;
    lng: number;
  };
  distance?: number;
}

export interface Report {
  id: string;
  userId: string;
  userName: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  photoUrl?: string;
  status: 'pending' | 'processing' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
  nearbyShelters: Shelter[];
}

interface ReportContextType {
  reports: Report[];
  shelters: Shelter[];
  userReports: Report[];
  createReport: (reportData: Omit<Report, 'id' | 'userId' | 'userName' | 'status' | 'createdAt' | 'updatedAt' | 'nearbyShelters'>) => Promise<Report>;
  getNearbyShelters: (lat: number, lng: number) => Promise<Shelter[]>;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const useReports = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  return context;
};

// Mock shelter data for India
const mockShelters: Shelter[] = [
  {
    id: '1',
    name: 'Aashray Shelter Home',
    address: '45 Gandhi Road',
    city: 'New Delhi',
    state: 'Delhi',
    phone: '011-23456789',
    email: 'contact@aashray.org',
    capacity: 100,
    currentOccupancy: 75,
    services: ['Food', 'Medical Care', 'Counseling'],
    location: {
      lat: 28.6139,
      lng: 77.2090
    }
  },
  {
    id: '2',
    name: 'Sahara Care Center',
    address: '23 Nehru Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    phone: '022-34567890',
    email: 'info@saharacare.org',
    capacity: 150,
    currentOccupancy: 120,
    services: ['Food', 'Medical Care', 'Job Training'],
    location: {
      lat: 19.0760,
      lng: 72.8777
    }
  },
  {
    id: '3',
    name: 'Disha Foundation',
    address: '78 MG Road',
    city: 'Bangalore',
    state: 'Karnataka',
    phone: '080-45678901',
    email: 'help@dishafoundation.org',
    capacity: 80,
    currentOccupancy: 60,
    services: ['Food', 'Shelter', 'Education'],
    location: {
      lat: 12.9716,
      lng: 77.5946
    }
  },
  {
    id: '4',
    name: 'Ashraya Shelter',
    address: '56 Raja Street',
    city: 'Chennai',
    state: 'Tamil Nadu',
    phone: '044-56789012',
    email: 'support@ashraya.org',
    capacity: 120,
    currentOccupancy: 80,
    services: ['Food', 'Medical Care', 'Education'],
    location: {
      lat: 13.0827,
      lng: 80.2707
    }
  },
  {
    id: '5',
    name: 'Unnati Care Home',
    address: '34 Tagore Lane',
    city: 'Kolkata',
    state: 'West Bengal',
    phone: '033-67890123',
    email: 'help@unnati.org',
    capacity: 90,
    currentOccupancy: 70,
    services: ['Food', 'Medical Care', 'Job Training'],
    location: {
      lat: 22.5726,
      lng: 88.3639
    }
  }
];

// Mock reports
const mockReports: Report[] = [
  {
    id: '1',
    userId: '123456',
    userName: 'Arjun Sharma',
    location: {
      lat: 28.6129,
      lng: 77.2295,
      address: 'Near Connaught Place, New Delhi'
    },
    description: 'Elderly man needs medical attention and shelter',
    photoUrl: 'https://images.pexels.com/photos/2608519/pexels-photo-2608519.jpeg',
    status: 'resolved',
    createdAt: new Date('2023-12-10T10:30:00'),
    updatedAt: new Date('2023-12-10T14:45:00'),
    nearbyShelters: [mockShelters[0]]
  },
  {
    id: '2',
    userId: '123456',
    userName: 'Arjun Sharma',
    location: {
      lat: 28.6271,
      lng: 77.2190,
      address: 'Paharganj area, New Delhi'
    },
    description: 'Family with 2 children living under the bridge',
    photoUrl: 'https://images.pexels.com/photos/1598355/pexels-photo-1598355.jpeg',
    status: 'processing',
    createdAt: new Date('2023-12-15T09:15:00'),
    updatedAt: new Date('2023-12-15T11:20:00'),
    nearbyShelters: [mockShelters[0]]
  },
  {
    id: '3',
    userId: 'demo123',
    userName: 'Demo User',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Near CST Station, Mumbai'
    },
    description: 'Young woman needs safe shelter',
    photoUrl: 'https://images.pexels.com/photos/69097/pexels-photo-69097.jpeg',
    status: 'pending',
    createdAt: new Date('2023-12-18T16:45:00'),
    updatedAt: new Date('2023-12-18T16:45:00'),
    nearbyShelters: [mockShelters[1]]
  }
];

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [shelters] = useState<Shelter[]>(mockShelters);
  const { currentUser } = useAuth();

  const userReports = currentUser 
    ? reports.filter(report => report.userId === currentUser.id)
    : [];

  const createReport = async (reportData: Omit<Report, 'id' | 'userId' | 'userName' | 'status' | 'createdAt' | 'updatedAt' | 'nearbyShelters'>) => {
    if (!currentUser) {
      throw new Error('User must be logged in to create a report');
    }

    // Get nearby shelters
    const nearbyShelters = await getNearbyShelters(reportData.location.lat, reportData.location.lng);
    
    const newReport: Report = {
      id: Math.random().toString(36).substring(2, 9),
      userId: currentUser.id,
      userName: currentUser.name,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      nearbyShelters,
      ...reportData
    };

    setReports(prevReports => [...prevReports, newReport]);

    // In a real app, we would send this to an API and notify shelters
    return newReport;
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  const getNearbyShelters = async (lat: number, lng: number): Promise<Shelter[]> => {
    // In a real app, this would be an API call to find shelters near the coordinates
    
    // Calculate distance to each shelter and find nearest ones
    const sheltersWithDistance = shelters.map(shelter => {
      const distance = calculateDistance(lat, lng, shelter.location.lat, shelter.location.lng);
      return { ...shelter, distance };
    });

    // Sort by distance and return the nearest ones (within 10km)
    return sheltersWithDistance
      .filter(shelter => shelter.distance && shelter.distance < 10)
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))
      .slice(0, 3);
  };

  const value = {
    reports,
    shelters,
    userReports,
    createReport,
    getNearbyShelters
  };

  return (
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  );
};