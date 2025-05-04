// project/src/pages/Shelters.tsx

import React, { useEffect, useState } from "react";

interface Shelter {
  _id: string;
  name: string;
  image: string;
  address: string;
  city: string;
  state: string;
  capacity: number;
  currentOccupancy: number;
  services: string[];
  successStories: number;
  volunteersNeeded: boolean;
}

export default function Shelters() {
  const [shelters, setShelters] = useState<Shelter[]>([]);

  useEffect(() => {
    fetch("/api/shelters")
      .then((res) => res.json())
      .then(setShelters)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Our Partner Shelters
        </h1>

        {/* Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {shelters.map((s) => (
            <div key={s._id} className="bg-white shadow rounded-lg overflow-hidden">
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {s.name}
                  </h2>
                  {s.volunteersNeeded && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                      Volunteers Needed
                    </span>
                  )}
                </div>

                <p className="mt-2 text-gray-600">
                  {s.address}, {s.city}, {s.state}
                </p>

                {/* Capacity */}
                <div className="mt-4">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Occupancy:</span>
                    {s.currentOccupancy}/{s.capacity}
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${(s.currentOccupancy / s.capacity) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Services */}
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700">Services:</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {s.services.map((svc) => (
                      <span
                        key={svc}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Success Stories & Support */}
                <div className="mt-6 flex justify-between items-center">
                  <span className="flex items-center text-gray-600">
                    {s.successStories} success stories
                  </span>
                  <a
                    href="/donate"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Support Shelter →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
