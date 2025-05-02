import React from 'react';
import { Calendar, Award } from 'lucide-react';
import { Reward } from '../../contexts/RewardContext';

interface RewardCardProps {
  reward: Reward;
  onRedeem?: (rewardId: string) => void;
  userPoints?: number;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onRedeem, userPoints = 0 }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Discount':
        return 'bg-blue-100 text-blue-800';
      case 'GiftCard':
        return 'bg-purple-100 text-purple-800';
      case 'Voucher':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canRedeem = userPoints >= reward.pointsCost;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="h-40 overflow-hidden bg-gray-200 relative">
        <img 
          src={reward.logoUrl} 
          alt={reward.sponsor} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(reward.category)}`}>
            {reward.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {reward.title}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">
          {reward.description}
        </p>
        
        <div className="flex items-center text-gray-500 text-sm mb-1">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Valid till: {formatDate(reward.expiryDate)}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Award className="w-4 h-4 mr-1" />
          <span>Sponsored by: {reward.sponsor}</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="font-bold text-blue-600">
            {reward.pointsCost} points
          </div>
          
          {onRedeem && (
            <button
              onClick={() => onRedeem(reward.id)}
              disabled={!canRedeem}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                canRedeem 
                  ? 'bg-orange-500 text-white hover:bg-orange-600 transition-colors' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {canRedeem ? 'Redeem' : 'Not Enough Points'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardCard;