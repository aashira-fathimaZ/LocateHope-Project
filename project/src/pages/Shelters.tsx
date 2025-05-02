import React from 'react';
import { Home, Phone, Mail, MapPin, Users, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Shelter {
  id: string;
  name: string;
  image: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  capacity: number;
  currentOccupancy: number;
  services: string[];
  successStories: number;
  volunteersNeeded: boolean;
}

const mockShelters: Shelter[] = [
  {
    id: '1',
    name: 'Aashray Shelter Home',
    image: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg',
    address: '45 Gandhi Road',
    city: 'New Delhi',
    state: 'Delhi',
    phone: '011-23456789',
    email: 'contact@aashray.org',
    capacity: 100,
    currentOccupancy: 75,
    services: ['Food', 'Medical Care', 'Counseling', 'Job Training'],
    successStories: 45,
    volunteersNeeded: true
  },
  {
    id: '2',
    name: 'Sahara Care Center',
    image: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg',
    address: '23 Nehru Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    phone: '022-34567890',
    email: 'info@saharacare.org',
    capacity: 150,
    currentOccupancy: 120,
    services: ['Food', 'Medical Care', 'Education', 'Skill Development'],
    successStories: 78,
    volunteersNeeded: true
  },
  {
    id: '3',
    name: 'Disha Foundation',
    image: 'https://images.pexels.com/photos/2080960/pexels-photo-2080960.jpeg',
    address: '78 MG Road',
    city: 'Bangalore',
    state: 'Karnataka',
    phone: '080-45678901',
    email: 'help@dishafoundation.org',
    capacity: 80,
    currentOccupancy: 60,
    services: ['Food', 'Shelter', 'Education', 'Mental Health Support'],
    successStories: 32,
    volunteersNeeded: false
  }
];

const Shelters: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Home className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Partner Shelters
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Working together to provide safe havens and support for those in need
          </p>
        </div>

        {/* Shelters Grid */}
        <div className="grid grid-cols-1 gap-8 mt-12">
          {mockShelters.map(shelter => (
            <div key={shelter.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="h-64 lg:h-full overflow-hidden">
                  <img 
                    src={shelter.image} 
                    alt={shelter.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 lg:col-span-2">
                  <div className="lg:flex lg:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{shelter.name}</h3>
                      <div className="mt-2 flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="ml-2">{shelter.address}, {shelter.city}, {shelter.state}</span>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      {shelter.volunteersNeeded && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                          Volunteers Needed
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <span className="ml-2 text-gray-600">{shelter.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <span className="ml-2 text-gray-600">{shelter.email}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Capacity</h4>
                      <div className="mt-2">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-gray-400" />
                          <span className="ml-2 text-gray-600">
                            {shelter.currentOccupancy}/{shelter.capacity} occupied
                          </span>
                        </div>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${(shelter.currentOccupancy/shelter.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500">Services Provided</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {shelter.services.map((service, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-gray-600">
                      <Heart className="h-5 w-5 text-red-500 inline" />
                      <span className="ml-2">{shelter.successStories} success stories</span>
                    </div>
                    <Link
                      to="/donate"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Support This Shelter
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Register Shelter Section */}
        <div className="mt-16 bg-teal-600 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Register Your Shelter
              </h2>
              <p className="mt-4 text-lg text-teal-100 max-w-3xl mx-auto">
                Join our network of shelters and help us create a larger impact. Together, we can reach more people in need.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="bg-white/10 rounded-lg p-6">
                  <Users className="h-8 w-8 text-white mx-auto" />
                  <h3 className="mt-4 text-xl font-semibold text-white">Reach More People</h3>
                  <p className="mt-2 text-teal-100">
                    Connect with people who need your services through our platform
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <Heart className="h-8 w-8 text-white mx-auto" />
                  <h3 className="mt-4 text-xl font-semibold text-white">Get Support</h3>
                  <p className="mt-2 text-teal-100">
                    Access resources, donations, and volunteers through our network
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <CheckCircle className="h-8 w-8 text-white mx-auto" />
                  <h3 className="mt-4 text-xl font-semibold text-white">Make Impact</h3>
                  <p className="mt-2 text-teal-100">
                    Be part of a larger mission to help those in need
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="mailto:shelters@locatehope.in"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-teal-600 bg-white hover:bg-teal-50"
                >
                  Register Your Shelter <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shelters;