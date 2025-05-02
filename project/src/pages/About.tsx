import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MapPin, Briefcase, Award, ArrowRight, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-600">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover mix-blend-multiply filter brightness-50"
            src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg"
            alt="People helping each other"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Our Mission</h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Connecting people in need with shelters and resources across India.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="mt-6 text-gray-600 space-y-4">
              <p>
                LocateHope was born from a simple observation: in our bustling cities, thousands of people in need often go unnoticed, while many compassionate individuals want to help but don't know how.
              </p>
              <p>
                Founded in 2025 by a women-tech team called CodeHeirs, LocateHope bridges this gap by leveraging technology to connect those experiencing homelessness with the shelters and resources that can help them.
              </p>
              <p>
                What began as a small project in Chennai has now expanded to multiple cities across India, creating a network of care that brings together concerned citizens, shelters, and supportive businesses in a common mission of compassion.
              </p>
              <p>
                We believe that everyone deserves dignity, safety, and support. By making it easier for people to report and help those in vulnerable situations, we're creating a more compassionate society one connection at a time.
              </p>
            </div>
          </div>
          
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://media.istockphoto.com/id/1318617341/photo/low-angle-view-group-of-volunteers-busy-working-by-arranging-vegetables-and-clothes-on.jpg?s=612x612&w=0&k=20&c=CJsDJ1nIMKr5NPBQufc5eyjsbSV_3XhqgcQusavGXIk=" 
              alt="Volunteers helping" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Impact</h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-gray-600">
            Through the collective effort of our community, we're making a real difference in the lives of those who need it most.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600">1,100+</div>
              <div className="mt-2 text-gray-700">People Connected</div>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-teal-600">30+</div>
              <div className="mt-2 text-gray-700">Partner Shelters</div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-500">15+</div>
              <div className="mt-2 text-gray-700">Cities Covered</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-600">25+</div>
              <div className="mt-2 text-gray-700">Business Partners</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center">How LocateHope Works</h2>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Report</h3>
                <p className="mt-2 text-gray-600">
                  Users spot someone in need and report their location through our app. The information is verified for accuracy and intent.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Connect</h3>
                <p className="mt-2 text-gray-600">
                  Our system identifies nearby shelters and resources, sending them notifications about the person in need and their location.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                <Award className="h-6 w-6" />
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Reward</h3>
                <p className="mt-2 text-gray-600">
                  Users earn points for verified reports, which they can redeem for rewards from our business partners who support the cause.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Our Values</h2>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-md bg-blue-100 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Compassion</h3>
              <p className="mt-2 text-gray-600">
                We believe in treating everyone with dignity and respect, regardless of their circumstances.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-md bg-teal-100 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Accountability</h3>
              <p className="mt-2 text-gray-600">
                We take responsibility for our actions and are committed to transparency in all we do.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-md bg-orange-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Community</h3>
              <p className="mt-2 text-gray-600">
                We believe in the power of collective action to create meaningful change in our society.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-md bg-purple-100 flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Innovation</h3>
              <p className="mt-2 text-gray-600">
                We harness technology to solve social challenges in creative and effective ways.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-blue-600 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Join Our Mission
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Together, we can create a more compassionate society where no one is left behind. Start making a difference today by reporting someone in need or donating to support our cause.
              </p>
              <div className="mt-8 flex space-x-4">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 transition-colors"
                >
                  Sign Up Now
                </Link>
                <Link
                  to="/donate"
                  className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors"
                >
                  Donate <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.pexels.com/photos/6647119/pexels-photo-6647119.jpeg" 
                alt="Helping hand" 
                className="h-64 w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;