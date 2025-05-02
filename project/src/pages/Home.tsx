import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Award, Heart, Users, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative">
        {/* Image or background */}
        <div className="relative h-[70vh] overflow-hidden">
          <img 
            src="https://media.istockphoto.com/id/492703086/photo/poor-indian-children-asking-for-food-india.jpg?s=612x612&w=0&k=20&c=4jiY_NHsZtPNFxsOD1NEIPSAGO3o1k_nPAaSERrtPHk=" 
            alt="People helping the homeless" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-3xl animate-fade-in-down">
              Connecting Those in Need with Safe Shelters Across India
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white max-w-2xl animate-fade-in-up">
              Report, help, and make a difference in someone's life today
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
              <Link
                to="/report"
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Report Someone in Need
              </Link>
              <Link
                to="/donate"
                className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md flex items-center justify-center hover:bg-teal-700 transition-colors"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate to Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Join our mission to connect those experiencing homelessness with the resources they need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <MapPin className="h-7 w-7 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Report</h3>
            <p className="text-gray-600 text-center">
              Spot someone in need? Report their location and details through our simple form. Your information helps us locate and assist them quickly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Users className="h-7 w-7 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Connect</h3>
            <p className="text-gray-600 text-center">
              We notify nearby shelters and support services about the person in need. Your report helps create the vital connection that can change a life.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Award className="h-7 w-7 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Earn Rewards</h3>
            <p className="text-gray-600 text-center">
              For your compassion, receive points for each verified report. Redeem them for discounts and gift cards from our partner businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto">
              Together, we're making a difference across India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold">1,100+</div>
              <div className="mt-2">People Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">500+</div>
              <div className="mt-2">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">30+</div>
              <div className="mt-2">Partner Shelters</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">15+</div>
              <div className="mt-2">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Real stories of impact from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic mb-4">
              "Thanks to a report on LocateHope, our shelter was able to quickly reach out to an elderly man who had been living on the streets for weeks. He now has a safe place to stay and is receiving the medical care he needed."
            </p>
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-blue-500 font-semibold">SP</span>
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-800">Surya Prakash</h4>
                <p className="text-gray-500 text-sm">Shelter Coordinator, Hyderabad</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic mb-4">
              "I spotted a family living under a bridge on my way to work. After reporting it on LocateHope, I was amazed at how quickly they received help. Within days, they had been connected with housing support and the children were enrolled in school."
            </p>
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-teal-500 font-semibold">GV</span>
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-800">Gopika Veerachamy</h4>
                <p className="text-gray-500 text-sm">LocateHope User, Chennai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Join Our Mission Today</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Be part of the movement to create a more compassionate society. Every report, every donation, and every share makes a difference.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-orange-500 font-medium rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-white text-white font-medium rounded-md flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;