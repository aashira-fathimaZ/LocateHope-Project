import React from 'react';
import { MapPin, Clock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { Report } from '../../contexts/ReportContext';
import LocationMap from '../maps/LocationMap';

interface ReportCardProps {
  report: Report;
  detailed?: boolean;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, detailed = false }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-IN', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'pending':
      default:
        return <HelpCircle className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
      default:
        return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {report.photoUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={report.photoUrl} 
            alt="Report" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {report.description}
            </h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{report.location.address}</span>
            </div>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
            <div className="flex items-center">
              {getStatusIcon(report.status)}
              <span className="ml-1 capitalize">{report.status}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Clock className="w-4 h-4 mr-1" />
          <span>Reported: {formatDate(report.createdAt)}</span>
        </div>
        
        {detailed && (
          <>
            <div className="my-4">
              <LocationMap 
                location={report.location}
                nearbyShelters={report.nearbyShelters}
                height="200px"
              />
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">Nearby Shelters Notified:</h4>
              <ul className="space-y-2">
                {report.nearbyShelters.map(shelter => (
                  <li key={shelter.id} className="text-sm bg-blue-50 p-2 rounded-md">
                    <div className="font-medium text-blue-700">{shelter.name}</div>
                    <div className="text-gray-600 mt-1">{shelter.address}, {shelter.city}</div>
                    <div className="text-gray-600 mt-1">
                      {shelter.phone} | {shelter.distance && `${shelter.distance.toFixed(1)} km away`}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportCard;