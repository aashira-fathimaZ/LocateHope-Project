import React, { useState } from 'react';
import { Award, Filter, Gift, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRewards } from '../contexts/RewardContext';
import RewardCard from '../components/rewards/RewardCard';

const Rewards: React.FC = () => {
  const { currentUser } = useAuth();
  const { availableRewards, userRewards, redeemReward } = useRewards();
  const [filter, setFilter] = useState<'all' | 'Discount' | 'GiftCard' | 'Voucher'>('all');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const userPoints = currentUser?.pointsEarned || 0;

  const filteredRewards = availableRewards.filter(reward => {
    if (filter === 'all') return true;
    return reward.category === filter;
  });

  const handleRedeemReward = async (rewardId: string) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    
    try {
      const reward = availableRewards.find(r => r.id === rewardId);
      
      if (!reward) {
        setErrorMessage('Reward not found');
        return;
      }
      
      if (userPoints < reward.pointsCost) {
        setErrorMessage('Not enough points to redeem this reward');
        return;
      }
      
      const success = await redeemReward(rewardId);
      
      if (success) {
        setSuccessMessage(`Successfully redeemed: ${reward.title}`);
      } else {
        setErrorMessage('Failed to redeem reward. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Points and Redemptions Info */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 sm:p-10">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Your Rewards</h2>
                <p className="mt-2 text-orange-100">Redeem your points for exclusive offers from our partners</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="inline-flex items-center px-4 py-2 rounded-md bg-white shadow-sm">
                  <Award className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="text-xl font-bold text-orange-500">{userPoints}</span>
                  <span className="ml-1 text-gray-700">points available</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status Messages */}
          {successMessage && (
            <div className="m-6 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Gift className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {errorMessage && (
            <div className="m-6 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* How it works */}
          <div className="px-6 py-6 sm:p-8 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">How It Works</h3>
            <ul className="mt-4 space-y-4 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-medium">1</div>
                </div>
                <p className="ml-3">Submit reports about people in need to earn points</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-medium">2</div>
                </div>
                <p className="ml-3">Each verified report earns you 50 points</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-medium">3</div>
                </div>
                <p className="ml-3">Redeem your points for discounts, gift cards, and vouchers</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-medium">4</div>
                </div>
                <p className="ml-3">Rewards are provided by our partner businesses who support our mission</p>
              </li>
            </ul>
          </div>
          
          {/* My Redeemed Rewards */}
          <div className="px-6 py-6 sm:p-8">
            <h3 className="text-lg font-medium text-gray-900">My Redeemed Rewards</h3>
            
            {userRewards.length === 0 ? (
              <div className="mt-4 text-sm text-gray-600">
                <p>You haven't redeemed any rewards yet. Browse the available rewards below.</p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {userRewards.map(reward => (
                  <div key={reward.id} className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{reward.title}</h4>
                      <p className="text-sm text-gray-500">{reward.sponsor}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Valid until {new Date(reward.expiryDate).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Available Rewards */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Available Rewards</h3>
            
            {/* Category Filter */}
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="Discount">Discounts</option>
                <option value="GiftCard">Gift Cards</option>
                <option value="Voucher">Vouchers</option>
              </select>
            </div>
          </div>
          
          <div className="p-6">
            {filteredRewards.length === 0 ? (
              <div className="text-center py-12">
                <Award className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No rewards found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filter === 'all' 
                    ? "There are no available rewards at the moment."
                    : `There are no ${filter} rewards available.`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRewards.map(reward => (
                  <RewardCard 
                    key={reward.id} 
                    reward={reward} 
                    onRedeem={handleRedeemReward}
                    userPoints={userPoints}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;