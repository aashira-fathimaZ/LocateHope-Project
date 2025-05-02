import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Award, ChevronRight, Filter, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useReports } from '../contexts/ReportContext';
import ReportCard from '../components/reports/ReportCard';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { userReports } = useReports();
  const [filter, setFilter] = useState<'all' | 'pending' | 'processing' | 'resolved'>('all');

  const filteredReports = userReports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Welcome Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 sm:p-10">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Welcome, {currentUser?.name}!</h2>
                <p className="mt-2 text-blue-100">Thank you for helping connect those in need with vital resources.</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <div className="text-white text-sm">
                  <span className="font-medium">Your Impact:</span>
                </div>
                <div className="flex items-center space-x-6 mt-2">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-white">{userReports.length}</span>
                    <span className="block text-sm text-blue-100">Reports</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-white">{currentUser?.pointsEarned || 0}</span>
                    <span className="block text-sm text-blue-100">Points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white px-6 py-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Report Someone</h3>
                  <p className="mt-1 text-sm text-blue-600">Help connect people in need with nearby shelters</p>
                  <Link 
                    to="/report" 
                    className="mt-2 inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-600"
                  >
                    Submit a report <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-teal-50 rounded-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                  <Award className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-teal-800">Your Rewards</h3>
                  <p className="mt-1 text-sm text-teal-600">Redeem your points for exclusive offers</p>
                  <Link 
                    to="/rewards" 
                    className="mt-2 inline-flex items-center text-sm font-medium text-teal-500 hover:text-teal-600"
                  >
                    View rewards <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-orange-800">Activity History</h3>
                  <p className="mt-1 text-sm text-orange-600">Track your reports and their status</p>
                  <button 
                    className="mt-2 inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600"
                  >
                    See below <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reports Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Your Reports</h3>
            
            {/* Status Filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
          
          {filteredReports.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <MapPin className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all' 
                  ? "You haven't submitted any reports yet."
                  : `You don't have any ${filter} reports.`}
              </p>
              <div className="mt-6">
                <Link
                  to="/report"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit a Report
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map(report => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;