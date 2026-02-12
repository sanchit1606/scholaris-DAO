import { useQuery } from '@tanstack/react-query';

const API_BASE = '/api';

// Mock data generators for demo (REDACTED)
// Company and JD mocks removed for privacy. Replace via your private test fixtures if needed.
const mockCompanies: any[] = [];

const mockJDs: any[] = [];

const mockLeaderboard = [
  { rank: 1, address: 'ALGO...X3K9', name: 'Priya S.', tokens: 4520, uploads: 34, reputation: 98 },
  { rank: 2, address: 'ALGO...M2P1', name: 'Arjun K.', tokens: 3890, uploads: 28, reputation: 95 },
  { rank: 3, address: 'ALGO...R7T4', name: 'Sneha M.', tokens: 3210, uploads: 22, reputation: 92 },
  { rank: 4, address: 'ALGO...L5N8', name: 'Rahul D.', tokens: 2780, uploads: 19, reputation: 88 },
  { rank: 5, address: 'ALGO...W9Q2', name: 'Aisha R.', tokens: 2340, uploads: 16, reputation: 85 },
];

const mockElections = [
  { id: '1', title: 'Student Council President 2025', status: 'active', candidates: ['Alice W.', 'Bob K.', 'Charlie M.'], totalVotes: 342, endDate: '2025-03-15' },
  { id: '2', title: 'Tech Club Secretary', status: 'active', candidates: ['Dana R.', 'Evan S.'], totalVotes: 128, endDate: '2025-02-28' },
  { id: '3', title: 'Sports Captain Election', status: 'completed', candidates: ['Fay L.', 'George T.'], totalVotes: 456, endDate: '2025-01-30' },
];

const mockBooks = [
  { id: '1', title: 'Introduction to Algorithms (CLRS)', author: 'Cormen et al.', available: true, borrowers: 3, coverEmoji: '📘' },
  { id: '2', title: 'Design Patterns', author: 'Gang of Four', available: true, borrowers: 1, coverEmoji: '📗' },
  { id: '3', title: 'Clean Code', author: 'Robert C. Martin', available: false, borrowers: 5, coverEmoji: '📕' },
  { id: '4', title: 'System Design Interview', author: 'Alex Xu', available: true, borrowers: 8, coverEmoji: '📙' },
  { id: '5', title: 'Cracking the Coding Interview', author: 'Gayle McDowell', available: true, borrowers: 12, coverEmoji: '📓' },
];

export const useCompanies = () =>
  useQuery({ queryKey: ['companies'], queryFn: async () => mockCompanies, staleTime: 60000 });

export const useJDs = () =>
  useQuery({ queryKey: ['jds'], queryFn: async () => mockJDs, staleTime: 30000 });

export const useLeaderboard = () =>
  useQuery({ queryKey: ['leaderboard'], queryFn: async () => mockLeaderboard, staleTime: 30000 });

export const useElections = () =>
  useQuery({ queryKey: ['elections'], queryFn: async () => mockElections, staleTime: 15000 });

export const useBooks = () =>
  useQuery({ queryKey: ['books'], queryFn: async () => mockBooks, staleTime: 30000 });

export { mockCompanies, mockJDs, mockLeaderboard, mockElections, mockBooks };

/* Community posts (in-memory mock) */
export type CommunityPost = {
  id: string;
  company: string;
  role: string;
  round: string;
  content: string;
  author?: string;
  upvotes: number;
  createdAt: string;
};

let mockCommunity: CommunityPost[] = [];

export const useCommunity = () =>
  useQuery({ queryKey: ['community'], queryFn: async () => mockCommunity.slice().sort((a,b)=>b.upvotes - a.upvotes), staleTime: 10000 });

export const addCommunityPost = async (post: Omit<CommunityPost, 'id' | 'upvotes' | 'createdAt'>) => {
  const newPost: CommunityPost = {
    id: `c${Math.floor(Math.random()*1000000)}`,
    upvotes: 0,
    createdAt: new Date().toISOString(),
    ...post,
  };
  mockCommunity.push(newPost);
  return newPost;
};

export const upvoteCommunityPost = async (id: string) => {
  const p = mockCommunity.find((m) => m.id === id);
  if (p) p.upvotes += 1;
  return p;
};

export const downvoteCommunityPost = async (id: string) => {
  const p = mockCommunity.find((m) => m.id === id);
  if (p && p.upvotes > 0) p.upvotes -= 1;
  return p;
};
