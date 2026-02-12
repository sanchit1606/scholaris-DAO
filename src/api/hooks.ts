import { useQuery } from '@tanstack/react-query';

const API_BASE = '/api';

// Mock data generators for demo
const mockCompanies = [
  { id: '1', name: 'NVIDIA', roles: ['ML Engineer','GPU SW Engineer'], avgCtc: '60 LPA', jdCount: 10, difficulty: 'Hard', logo: '🖥️' },
  { id: '2', name: 'MSCI', roles: ['Quant','Data Engineer'], avgCtc: '28 LPA', jdCount: 6, difficulty: 'Medium', logo: '📊' },
  { id: '3', name: 'Barclays', roles: ['SWE','Analyst'], avgCtc: '24 LPA', jdCount: 8, difficulty: 'Medium', logo: '🏦' },
  { id: '4', name: 'Morgan Stanley', roles: ['Quant','SWE'], avgCtc: '30 LPA', jdCount: 9, difficulty: 'Hard', logo: '💼' },
  { id: '5', name: 'JP Morgan', roles: ['Analyst','SWE'], avgCtc: '32 LPA', jdCount: 11, difficulty: 'Hard', logo: '🏛️' },
  { id: '6', name: 'Citi', roles: ['SWE','Analyst'], avgCtc: '26 LPA', jdCount: 7, difficulty: 'Medium', logo: '🏦' },
  { id: '7', name: 'Infosys', roles: ['SDE','Backend'], avgCtc: '12 LPA', jdCount: 20, difficulty: 'Medium', logo: '💻' },
  { id: '8', name: 'PhonePe', roles: ['SDE','Product'], avgCtc: '18 LPA', jdCount: 14, difficulty: 'Medium', logo: '📱' },
  { id: '9', name: 'BlackRock', roles: ['Quant','Data Scientist'], avgCtc: '38 LPA', jdCount: 5, difficulty: 'Hard', logo: '🏢' },
  { id: '10', name: 'Red Hat', roles: ['SRE','Backend'], avgCtc: '22 LPA', jdCount: 6, difficulty: 'Medium', logo: '🎩' },
  { id: '11', name: 'Deloitte', roles: ['Consultant','Analyst'], avgCtc: '16 LPA', jdCount: 12, difficulty: 'Medium', logo: '📋' },
  { id: '12', name: 'Siemens', roles: ['Embedded','Systems'], avgCtc: '20 LPA', jdCount: 8, difficulty: 'Medium', logo: '⚙️' },
];

const mockJDs = [
  { id: '1', company: 'Google', role: 'SDE-2', year: 2025, skills: ['Go', 'Distributed Systems', 'K8s'], ctc: '45 LPA', cgpaCutoff: 8.0, views: 234, votes: 45, verified: true, dsaPatterns: ['Graphs', 'DP'] },
  { id: '2', company: 'Amazon', role: 'SDE-1', year: 2025, skills: ['Java', 'AWS', 'System Design'], ctc: '32 LPA', cgpaCutoff: 7.0, views: 189, votes: 38, verified: true, dsaPatterns: ['Arrays', 'Trees'] },
  { id: '3', company: 'Microsoft', role: 'PM', year: 2024, skills: ['SQL', 'Product Thinking', 'A/B Testing'], ctc: '38 LPA', cgpaCutoff: 7.5, views: 156, votes: 29, verified: false, dsaPatterns: ['None'] },
  { id: '4', company: 'Flipkart', role: 'Backend', year: 2025, skills: ['Java', 'Spring', 'MySQL'], ctc: '22 LPA', cgpaCutoff: 7.0, views: 98, votes: 15, verified: true, dsaPatterns: ['HashMaps', 'Stacks'] },
];

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

let mockCommunity: CommunityPost[] = [
  {
    id: 'c1',
    company: 'IBM',
    role: 'SDE Intern',
    round: 'Online Assessment',
    content: 'OA had matrix multiplication optimization Q, 2 MCQs and 1 coding.',
    author: 'Sanchit',
    year: 'Final Year',
    upvotes: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: 'c2',
    company: 'MSCI',
    role: 'MTS / Quant-like',
    round: 'Technical & Interviews',
    content:
      `2 coding questions
1st: LeetCode - medium
2nd: medium/hard (Striver pattern)
3rd: SQL (HackerRank)

1st INTERVIEW
- DSA: hashmap, trees, linked list (middle element)
- Pointers
- OOPs (good)
- Projects discussion

2nd INTERVIEW
- Deep dive into projects: explain architecture and tradeoffs
- OOPs concepts used in projects

HR ROUND
- Family background
- Plans about masters
- Group work vs individual contributions

(Shared by friend who cleared MSCI)`,
    author: 'Amit',
    year: 'Final Year',
    upvotes: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // ~26 hours ago
  },
];

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
