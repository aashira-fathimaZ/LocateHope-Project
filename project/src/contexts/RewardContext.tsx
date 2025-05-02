import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

export interface Reward {
  id: string;
  title: string;
  description: string;
  sponsor: string;
  logoUrl: string;
  pointsCost: number;
  expiryDate: Date;
  category: 'Discount' | 'GiftCard' | 'Voucher';
}

interface RewardContextType {
  availableRewards: Reward[];
  userRewards: Reward[];
  redeemReward: (rewardId: string) => Promise<boolean>;
}

const RewardContext = createContext<RewardContextType | undefined>(undefined);

export const useRewards = () => {
  const context = useContext(RewardContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardProvider');
  }
  return context;
};

// Mock reward data
const mockRewards: Reward[] = [
  {
    id: '1',
    title: '10% Off at Flipkart',
    description: 'Get 10% off on your next purchase at Flipkart. Valid on all products.',
    sponsor: 'Flipkart',
    logoUrl: 'https://images.pexels.com/photos/5076527/pexels-photo-5076527.jpeg',
    pointsCost: 100,
    expiryDate: new Date('2024-06-30'),
    category: 'Discount'
  },
  {
    id: '2',
    title: 'Rs. 200 Big Bazaar Gift Card',
    description: 'Redeem your points for a Rs. 200 gift card valid at all Big Bazaar stores.',
    sponsor: 'Big Bazaar',
    logoUrl: 'https://images.pexels.com/photos/6214475/pexels-photo-6214475.jpeg',
    pointsCost: 150,
    expiryDate: new Date('2024-07-15'),
    category: 'GiftCard'
  },
  {
    id: '3',
    title: 'Free Coffee at Cafe Coffee Day',
    description: 'Get a free medium coffee of your choice at any CCD outlet.',
    sponsor: 'Cafe Coffee Day',
    logoUrl: 'https://images.pexels.com/photos/3020283/pexels-photo-3020283.jpeg',
    pointsCost: 75,
    expiryDate: new Date('2024-05-31'),
    category: 'Voucher'
  },
  {
    id: '4',
    title: '15% Off at Myntra',
    description: 'Get 15% off on your purchase of Rs. 1000 or more at Myntra.',
    sponsor: 'Myntra',
    logoUrl: 'https://images.pexels.com/photos/5878770/pexels-photo-5878770.jpeg',
    pointsCost: 125,
    expiryDate: new Date('2024-08-31'),
    category: 'Discount'
  },
  {
    id: '5',
    title: 'Buy 1 Get 1 Movie Ticket at PVR',
    description: 'Buy one movie ticket and get one free at any PVR Cinema.',
    sponsor: 'PVR Cinemas',
    logoUrl: 'https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg',
    pointsCost: 200,
    expiryDate: new Date('2024-06-15'),
    category: 'Voucher'
  }
];

export const RewardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availableRewards] = useState<Reward[]>(mockRewards);
  const [userRewards, setUserRewards] = useState<Reward[]>([]);
  const { currentUser } = useAuth();

  const redeemReward = async (rewardId: string): Promise<boolean> => {
    if (!currentUser) {
      throw new Error('User must be logged in to redeem rewards');
    }

    const reward = availableRewards.find(r => r.id === rewardId);
    if (!reward) {
      return false;
    }

    // In a real app, we would verify user has enough points and update in the database
    setUserRewards(prev => [...prev, reward]);
    return true;
  };

  const value = {
    availableRewards,
    userRewards,
    redeemReward
  };

  return (
    <RewardContext.Provider value={value}>
      {children}
    </RewardContext.Provider>
  );
};