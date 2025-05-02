import React from 'react';
import { Building2, Gift, Award, ArrowRight, CheckCircle, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
  rewardsOffered: number;
  peopleImpacted: number;
  totalDonations: number;
}

const mockSponsors: Sponsor[] = [
  {
    id: '1',
    name: 'Flipkart',
    logo: 'https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png',
    description: 'Supporting communities through e-commerce rewards and essential supplies',
    rewardsOffered: 1500,
    peopleImpacted: 750,
    totalDonations: 250000
  },
  {
    id: '2',
    name: 'Big Bazaar',
    logo: 'https://logowik.com/content/uploads/images/big-bazaar8499.jpg',
    description: 'Providing food and basic necessities to those in need',
    rewardsOffered: 1200,
    peopleImpacted: 600,
    totalDonations: 180000
  },
  {
    id: '3',
    name: 'Nescafe',
    logo: 'https://images.seeklogo.com/logo-png/26/1/nescafe-logo-png_seeklogo-265210.png',
    description: 'Warming hearts with beverages and supporting local communities',
    rewardsOffered: 800,
    peopleImpacted: 400,
    totalDonations: 120000
  }
];

const Sponsors: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Building2 className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Corporate Partners
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the organizations making a difference in our mission to help those in need
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 gap-8 mt-12 lg:grid-cols-3">
          {mockSponsors.map(sponsor => (
            <div key={sponsor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{sponsor.name}</h3>
                <p className="mt-2 text-gray-600">{sponsor.description}</p>
                
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-500">{sponsor.rewardsOffered}</div>
                    <div className="text-sm text-gray-500">Rewards</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-teal-500">{sponsor.peopleImpacted}</div>
                    <div className="text-sm text-gray-500">People Helped</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">₹{(sponsor.totalDonations/1000).toFixed(0)}K</div>
                    <div className="text-sm text-gray-500">Donated</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Sponsor Section */}
        <div className="mt-16 bg-blue-600 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Become a Sponsor
                </h2>
                <p className="mt-4 text-lg text-blue-100">
                  Join our mission to make a difference in the lives of those in need. As a sponsor, you'll:
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-200 mt-1" />
                    <span className="ml-3 text-blue-100">
                      Enhance your brand's social responsibility
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-200 mt-1" />
                    <span className="ml-3 text-blue-100">
                      Reach a socially conscious audience
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-200 mt-1" />
                    <span className="ml-3 text-blue-100">
                      Make a real impact in your community
                    </span>
                  </li>
                </ul>
                <div className="mt-8">
                  <a
                    href="mailto:partnerships@locatehope.in"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50"
                  >
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="lg:ml-8">
                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Sponsorship Benefits</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Gift className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">Reward Program</h4>
                        <p className="text-gray-500">Offer rewards to our active users</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-teal-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">Community Impact</h4>
                        <p className="text-gray-500">Direct involvement in social change</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Award className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">Brand Recognition</h4>
                        <p className="text-gray-500">Featured presence on our platform</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <DollarSign className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">Tax Benefits</h4>
                        <p className="text-gray-500">Eligible for CSR tax benefits</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;