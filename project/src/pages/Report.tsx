import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Upload, Camera, Info, CheckCircle } from 'lucide-react';
import { useReports } from '../contexts/ReportContext';
import LocationMap from '../components/maps/LocationMap';

interface ReportFormData {
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  photoUrl?: string;
}

const Report: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ReportFormData>({
    description: '',
    location: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'New Delhi, India'
    }
  });
  const [nearbyShelters, setNearbyShelters] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { createReport, getNearbyShelters } = useReports();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, we would get user's current location
    // For demo, using a default location in New Delhi
    const mockUserLocation = async () => {
      try {
        const shelters = await getNearbyShelters(28.6139, 77.2090);
        setNearbyShelters(shelters);
      } catch (error) {
        console.error('Error fetching nearby shelters:', error);
      }
    };
    
    mockUserLocation();
  }, [getNearbyShelters]);

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setFormData({
      ...formData,
      location: {
        lat,
        lng,
        address
      }
    });
    
    // Get shelters near the selected location
    getNearbyShelters(lat, lng)
      .then(shelters => setNearbyShelters(shelters))
      .catch(error => console.error('Error fetching nearby shelters:', error));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, we would upload the file to storage
    // For demo, using placeholder images
    const placeholderImages = [
      'https://images.pexels.com/photos/2121618/pexels-photo-2121618.jpeg',
      'https://images.pexels.com/photos/69097/pexels-photo-69097.jpeg',
      'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg'
    ];
    
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    
    setFormData({
      ...formData,
      photoUrl: randomImage
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const report = await createReport(formData);
      setSuccess(true);
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 md:p-8">
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Report Submitted Successfully!</h2>
              <p className="mt-2 text-gray-600">
                Thank you for your compassion. Nearby shelters have been notified about the person in need.
              </p>
              <p className="mt-4 text-green-600 font-medium">
                Redirecting to your dashboard...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <MapPin className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-2 text-3xl font-bold text-gray-900">Report Someone in Need</h2>
          <p className="mt-2 text-gray-600">
            Help connect them with nearby shelters and support
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-full">
            <div className="flex items-center justify-between relative">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <div className="w-10 text-center">Location</div>
              <div className="w-10 text-center">Details</div>
              <div className="w-10 text-center">Confirm</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Location */}
            {step === 1 && (
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Location</h3>
                <p className="text-gray-600 mb-6">
                  Please indicate where you found the person in need
                </p>
                
                <div className="mb-6">
                  <LocationMap 
                    location={formData.location}
                    height="300px"
                    interactive={true}
                    onLocationSelect={handleLocationSelect}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.location.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        address: e.target.value
                      }
                    })}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3 border"
                    placeholder="Enter the location address"
                    required
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        We found {nearbyShelters.length} shelters near this location that can provide assistance.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Details */}
            {step === 2 && (
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Details</h3>
                <p className="text-gray-600 mb-6">
                  Please provide additional information about the person in need
                </p>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({
                      ...formData,
                      description: e.target.value
                    })}
                    rows={4}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3 border"
                    placeholder="Describe the person and their situation (age, gender, any visible needs, etc.)"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Photo (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {formData.photoUrl ? (
                        <div>
                          <img 
                            src={formData.photoUrl} 
                            alt="Uploaded" 
                            className="mx-auto h-32 w-auto object-cover rounded-md"
                          />
                          <p className="text-xs text-gray-500 mt-2">Photo uploaded successfully</p>
                        </div>
                      ) : (
                        <>
                          <Camera className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload a photo</span>
                              <input 
                                id="file-upload" 
                                name="file-upload" 
                                type="file" 
                                className="sr-only"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Confirm */}
            {step === 3 && (
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm & Submit</h3>
                <p className="text-gray-600 mb-6">
                  Please review the information before submitting your report
                </p>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Location</div>
                      <div className="mt-1 text-gray-900">{formData.location.address}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-500">Description</div>
                      <div className="mt-1 text-gray-900">{formData.description}</div>
                    </div>
                    
                    {formData.photoUrl && (
                      <div className="col-span-full">
                        <div className="text-sm font-medium text-gray-500">Photo</div>
                        <div className="mt-1">
                          <img 
                            src={formData.photoUrl} 
                            alt="Report" 
                            className="h-40 w-auto object-cover rounded-md"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        By submitting this report, you are helping connect someone in need with vital resources. Thank you for your compassion.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <input
                    id="confirm"
                    name="confirm"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="confirm" className="ml-2 block text-sm text-gray-900">
                    I confirm that this report is accurate to the best of my knowledge
                  </label>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Report;