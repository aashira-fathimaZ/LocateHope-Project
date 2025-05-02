import React, { useState } from 'react';
import { Heart, CheckCircle, CreditCard, Calendar, AlertCircle } from 'lucide-react';

const Donate: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isMonthly, setIsMonthly] = useState<boolean>(false);

  const handleAmountSelect = (selectedAmount: string) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
  };

  const getDonationAmount = () => {
    if (amount === 'custom') {
      return customAmount ? parseInt(customAmount) : 0;
    }
    return amount ? parseInt(amount) : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSuccessful(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (isSuccessful) {
    return (
      <div className="bg-gray-50 min-h-screen pt-16 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Thank You for Your Donation!</h2>
            <p className="mt-4 text-lg text-gray-600">
              Your generous donation of <span className="font-bold">₹{getDonationAmount().toLocaleString('en-IN')}</span> {isMonthly ? 'monthly' : ''} will help us connect more people in need with shelters and resources.
            </p>
            <p className="mt-2 text-gray-600">
              A receipt has been sent to your email address.
            </p>
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900">Where Your Donation Goes</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="font-medium text-blue-800">70%</div>
                  <div className="text-sm text-blue-600">Direct support to shelters</div>
                </div>
                <div className="bg-teal-50 p-4 rounded-md">
                  <div className="font-medium text-teal-800">20%</div>
                  <div className="text-sm text-teal-600">Platform maintenance</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-md">
                  <div className="font-medium text-orange-800">10%</div>
                  <div className="text-sm text-orange-600">Awareness programs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heart className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Support Our Mission
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Your donation helps us connect more people in need with shelters and resources across India
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main donation form */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900">Make a Donation</h2>
                
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {/* Donation Amount */}
                  <div>
                    <label className="text-base font-medium text-gray-900">Donation Amount</label>
                    <p className="text-sm text-gray-500">How much would you like to donate?</p>
                    
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {['500', '1000', '2000', '5000', '10000', 'custom'].map((value) => (
                        <div key={value}>
                          <button
                            type="button"
                            className={`w-full py-3 px-4 rounded-md border ${
                              amount === value 
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                            onClick={() => handleAmountSelect(value)}
                          >
                            {value === 'custom' ? 'Custom' : `₹${parseInt(value).toLocaleString('en-IN')}`}
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {amount === 'custom' && (
                      <div className="mt-3">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">₹</span>
                          </div>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            className="pl-7 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3 border"
                            placeholder="Enter amount"
                            min="100"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Donation Frequency */}
                  <div>
                    <label className="text-base font-medium text-gray-900">Donation Frequency</label>
                    <p className="text-sm text-gray-500">Would you like to make this a recurring donation?</p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="one-time"
                          name="donation-frequency"
                          type="radio"
                          checked={!isMonthly}
                          onChange={() => setIsMonthly(false)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="one-time" className="ml-3 block text-sm font-medium text-gray-700">
                          One-time donation
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="monthly"
                          name="donation-frequency"
                          type="radio"
                          checked={isMonthly}
                          onChange={() => setIsMonthly(true)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="monthly" className="ml-3 block text-sm font-medium text-gray-700">
                          Monthly donation
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Personal Information */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                    
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Information */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Payment Information</h3>
                    
                    <div className="mt-4 space-y-6">
                      <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CreditCard className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="card-number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="pl-10 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3 border"
                            placeholder="**** **** **** ****"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              id="expiry-date"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              className="pl-10 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 py-2 px-3 border"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                            placeholder="***"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit */}
                  <div className="pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={!amount || (amount === 'custom' && !customAmount) || isSubmitting}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                    >
                      {isSubmitting ? 'Processing...' : `Donate ${amount === 'custom' ? `₹${parseInt(customAmount || '0').toLocaleString('en-IN')}` : `₹${parseInt(amount || '0').toLocaleString('en-IN')}`} ${isMonthly ? 'Monthly' : ''}`}
                    </button>
                    
                    <p className="mt-4 text-sm text-gray-500 text-center">
                      Your donation is secure and encrypted. You can cancel recurring donations at any time.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-8 sm:p-10">
                <h3 className="text-lg font-medium text-gray-900">Where Your Donation Goes</h3>
                
                <div className="mt-6 space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">70%</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Direct Support</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        70% of your donation goes directly to our partner shelters to provide food, medicine, clothing, and other necessities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                        <span className="text-teal-600 font-medium">20%</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Platform Maintenance</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        20% helps maintain and improve our technology platform to ensure we can connect people in need with resources efficiently.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-orange-600 font-medium">10%</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">Awareness Programs</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        10% funds community awareness and education programs about homelessness and how to help.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-8 sm:p-10 bg-gray-50 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Other Ways to Help</h3>
                
                <ul className="mt-6 space-y-4">
                  <li className="flex">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-gray-600">Volunteer at partner shelters</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-gray-600">Donate essential supplies</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-gray-600">Spread awareness on social media</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-gray-600">Become a corporate sponsor</span>
                  </li>
                  <li className="flex">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-gray-600">Report people in need through our app</span>
                  </li>
                </ul>
                
                <div className="mt-6 bg-blue-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        For corporate sponsorships or in-kind donations, please contact us at <a href="mailto:partnerships@locatehope.in" className="font-medium underline">partnerships@locatehope.in</a>
                      </p>
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

export default Donate;