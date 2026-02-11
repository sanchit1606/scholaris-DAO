# Scholaris DAO
## Illuminate Campus Activities with Blockchain

**Technical Documentation**

---

**Team Init2WinIt**

**Team Members:**
- Sanchitsai Nipanikar (Team Leader)
- Shrey Chougule

**Department of Computer Engineering**  
**VIT Pune**

**Campus Blockchain Hackathon**  
**February 12, 2026**  
**Platform: Algorand**

---

## Table of Contents

1. Problem Statement
2. Identified Campus Problems
3. Proposed Solutions Overview
4. Primary Solution: Scholaris DAO - Placement Module
5. Technical Architecture
6. Technology Stack
7. Implementation Approach
8. Expected Outcomes
9. Future Scope

---

## 1. Problem Statement

Campus systems such as voting, attendance tracking, feedback collection, certification, and group coordination often suffer from:

- Lack of trust in centralized authorities
- Manual verification processes leading to inefficiencies
- Data tampering and manipulation risks
- Privacy concerns for students and faculty
- Information asymmetry in placement and career preparation

The challenge is to build beginner-friendly blockchain applications on Algorand that improve trust, verification, and coordination for campus activities. Solutions should demonstrate how blockchain can enable fair participation, verifiable records, privacy-preserving systems, and simple automation without relying on centralized control.

---

## 2. Identified Campus Problems

### 2.1 Placement Information Gap

- TPO systems (like VIERP) contain extensive placement data but are difficult to navigate
- Job descriptions (JDs) get lost in email threads
- Seniors graduate and take valuable interview insights with them
- No structured knowledge about company-specific requirements (skills, DS&A patterns, programming languages)
- Juniors waste time reinventing preparation strategies every year

### 2.2 Campus Governance & Voting

- Club elections and student body voting lack transparency
- Fear of manipulation in vote counting
- No privacy for voters (potential retaliation)
- Difficulty in verifying one-person-one-vote principle

### 2.3 Feedback & Grievance Collection

- Students fear retaliation when giving honest course/professor feedback
- Centralized systems can tamper with or delete feedback
- Lack of anonymity in grievance systems
- No way to verify authenticity of feedback vs. spam

### 2.4 Attendance & Participation

- Manual attendance is time-consuming and prone to proxy marking
- Low engagement in non-mandatory classes
- No gamification or incentive structure

### 2.5 Academic Integrity

- Plagiarism detection relies on centralized databases
- No timestamped proof of original work
- Cannot verify "who created it first" in disputes

---

## 3. Proposed Solutions Overview

We propose multiple blockchain-powered solutions that leverage Algorand's unique features to address campus challenges. Our primary focus is the Placement Intelligence Module of Scholaris DAO, with supporting solutions demonstrating the versatility of our approach.

### 3.1 Permissioned Campus Voting System

**Goal:** Secure, auditable elections with one-person-one-vote and private ballots

**Technical Approach:**
- **On-Chain:** Stateful smart contract (PyTEAL) registers eligible voter addresses
- **Privacy:** Commit-reveal scheme—voters submit hash(vote + nonce), later reveal actual vote
- **Sybil Prevention:** Permissioned list or one-time voting token (ASA) that burns upon voting
- **State Management:** Global state for vote tallies, local state for opt-in/hasVoted flag

**Why Algorand:** Fast finality (4 seconds), low fees enable multiple voting rounds

### 3.2 Attendance Mining (Gamified Learning)

**Goal:** Increase class attendance through token incentives

**Technical Approach:**
- Student scans QR code → mints AttendanceToken (0.001 ALGO fee)
- Collect 80% of semester tokens → unlock exam preparation NFT
- Top 10% attendance → priority course registration next semester
- Analytics Dashboard: Professors see real-time engagement metrics

**Why Algorand:** Low fees (0.001 ALGO) make minting 150+ tokens/semester economically feasible

### 3.3 Anonymous Course Feedback

**Goal:** Honest course feedback without fear of retaliation

**Technical Approach:**
- **Commit Phase:** Students submit hash(rating + nonce) on-chain
- **Reveal Phase:** After semester ends, submit plaintext rating + nonce
- **Verification:** Smart contract validates hash matches reveal
- **AI Aggregation:** Analyzes sentiment only after critical mass (50+ responses)

---

## 4. Primary Solution: Scholaris DAO - Placement Module

### Decentralized Placement Intelligence Platform

### 4.1 The Core Problem

**Current State:**
- TPO systems (VIERP) are data graveyards with poor UX
- 500+ JDs buried in difficult-to-navigate interfaces
- Seniors possess valuable insights but knowledge disappears post-graduation
- No structured way to answer: "What DS&A patterns does Goldman Sachs ask?"
- Juniors waste 100+ hours researching what seniors already know

**Impact:**
- Lower placement rates due to inefficient preparation
- Repeated effort every year (knowledge not preserved)
- Missed opportunities (students don't know which companies match their skills)
- Unfair advantage for students with senior connections

### 4.2 Solution Architecture

#### Part 1: Data Layer (IPFS + Algorand)

**JD Upload & Storage Flow:**

1. Senior uploads JD (PDF/text/image) through web interface
2. File stored on IPFS (InterPlanetary File System)
3. IPFS hash + metadata stored in Algorand smart contract
4. AI extracts structured data (skills, requirements, CTC)
5. Uploader earns ScholTokens (ASA) as reward

**Smart Contract Global State Structure:**

Each JD record contains: `jd_id`, `ipfs_hash`, `company`, `role`, `year`, `uploader_address`, `verification_votes`, `quality_score`, `view_count`, `timestamp`

#### Part 2: AI Intelligence Layer (Off-Chain)

**Component 1: Skill Extraction Engine**

Uses NLP (Natural Language Processing) to extract required skills, experience level, role category, CGPA cutoffs, and eligible branches from JD text.

**Component 2: Pattern Recognition System**

Analyzes historical interview experiences to identify recurring DS&A patterns, difficulty distribution, and temporal trends in company requirements.

**Example Analysis:**

**Company: Goldman Sachs**
- 85% problems involve Arrays/HashMaps
- 70% ask SQL queries
- Preferred Language: Java (95%)
- Average Difficulty: Medium
- Interview Rounds: 3 (Coding → Technical → HR)

**Component 3: Smart Recommendation Engine**

Matches student skills against JD requirements, calculates compatibility scores, identifies skill gaps, and generates personalized preparation roadmaps.

#### Part 3: Blockchain Features (Algorand-Specific)

**Feature 1: Contribution Reward System (ASAs)**

**ScholToken Economy:**
- Upload JD: **10 tokens**
- Upload interview experience: **15 tokens**
- Verify others' uploads: **2 tokens**
- Popular content (50+ views): **20 bonus tokens**
- Downvoted as spam: **-15 tokens** (quality control)

**Feature 2: Immutable Interview Timeline**

Every JD upload is timestamped on-chain, creating a queryable historical record of how company requirements evolve over time.

**Feature 3: Decentralized Curation (DAO Governance)**

- Community voting on JD quality (1-5 stars)
- Weighted votes: Placed students = 2x weight
- Stake tokens to propose JD removal
- Automatic archival of JDs older than 2 years (unless community votes to keep)

#### Part 4: Advanced Features

**Feature 1: Smart Filter System**

Students can filter companies by:
- **Role:** Backend Developer, Full Stack, Data Scientist, AI/ML Engineer
- **Skills Required:** Java (Banking sector), Python (AI/ML), React (Frontend)
- **DS&A Pattern:** Arrays/HashMaps, Trees/Graphs, Dynamic Programming
- **CTC Range:** 10-20 LPA, 20-40 LPA, 40+ LPA
- **CGPA Cutoff:** No cutoff, 7.0+, 8.0+, 9.0+

**Feature 2: Personalized Study Roadmap Generator**

AI analyzes target companies' historical patterns and generates week-by-week preparation plans with specific practice problems and resources.

**Feature 3: Real-Time Difficulty Predictor**

Students submit practice solutions and receive instant AI feedback on time/space complexity, code quality, and comparison against company expectations.

**Feature 4: Mock Interview Matching System**

Peer-to-peer mock interviews with stake mechanism (ensures both participants show up), AI-powered matching by skill level, and reputation-building through successful completions.

---

## 5. Technical Architecture

### 5.1 System Architecture Overview

- **User Interface Layer:** React Frontend - Web & Mobile Responsive
- **Application Backend:** Python FastAPI - API Gateway
- **Blockchain Layer:** Algorand Smart Contracts (PyTEAL)
- **AI/ML Pipeline:** Off-Chain Intelligence (NLP, Recommendations)
- **Storage Layer:** IPFS for files, PostgreSQL for metadata

### 5.2 Data Flow

**JD Upload Flow:**

1. Student uploads PDF through frontend
2. Backend receives file and stores in IPFS
3. AI extracts skills, company info, requirements
4. Metadata + IPFS hash submitted to Algorand smart contract
5. Contract stores on-chain state and mints ScholTokens to uploader
6. Success confirmation returned to frontend

**Company Query Flow:**

1. Student applies filters in frontend
2. Backend queries Algorand for matching JD hashes
3. AI pipeline analyzes patterns and generates insights
4. IPFS content fetched and processed
5. Personalized results returned to frontend

### 5.3 Smart Contract Design

**Global State Variables:**
- `total_jds`: Counter of total JDs uploaded
- `total_verifications`: Counter of verification actions
- `jd_records`: Mapping of jd_id to JD metadata

**Local State Variables (Per User):**
- `tokens_earned`: Total ScholTokens earned
- `jds_uploaded`: Count of JDs uploaded by user
- `reputation_score`: Calculated based on contribution quality

**Key Functions:**
- `upload_jd()`: Store IPFS hash, metadata, mint tokens
- `verify_jd()`: Record verification vote, manage stakes
- `vote_quality()`: Update quality scores with weighted votes
- `claim_bonus()`: Distribute bonus tokens for popular content

---

## 6. Technology Stack

### 6.1 Blockchain Layer

| Component | Technology |
|-----------|-----------|
| Platform | Algorand |
| Smart Contract Language | PyTEAL (Python-based) |
| Framework | Beaker |
| Development Tools | AlgoKit, Algorand Sandbox |
| SDKs | algosdk (JavaScript v2.7+), py-algorand-sdk (Python v2.6+) |
| Features Used | Stateful Smart Contracts, ASAs, Atomic Transfers, Local/Global State |
| Network - Development | Algorand LocalNet |
| Network - Production | Algorand TestNet → MainNet |

### 6.2 Decentralized Storage

| Component | Technology |
|-----------|-----------|
| Storage | IPFS (InterPlanetary File System) |
| Purpose | Store JD PDFs, images, interview experiences |
| Client Libraries | ipfs-http-client (JavaScript), py-ipfs-api (Python) |
| Pinning Service | Pinata or Web3.Storage (content persistence) |

### 6.3 AI/ML Pipeline

| Component | Technology |
|-----------|-----------|
| NLP Framework | spaCy v3.7+ or Hugging Face Transformers |
| Named Entity Recognition | en_core_web_sm (spaCy) |
| Skill Extraction | Custom BERT fine-tuned model |
| Recommendation Engine | Scikit-learn (TF-IDF, Cosine Similarity) |
| LLM Integration | OpenAI GPT-4 API (roadmap generation, Q&A) |
| OCR | Tesseract OCR or Google Cloud Vision API |

### 6.4 Backend

| Component | Technology |
|-----------|-----------|
| API Server | Python with FastAPI |
| Authentication | Wallet-based (Algorand address signature) + JWT tokens |
| Rate Limiting | Redis-based |
| API Structure | RESTful API with /auth, /jds, /companies, /user, /recommendations endpoints |
| Testing | pytest (Python), pytest-asyncio for async endpoints |

### 6.5 Frontend

| Component | Technology |
|-----------|-----------|
| Framework | React v18+ with TypeScript |
| UI Library | Tailwind CSS + shadcn/ui components |
| State Management | Zustand (global state), React Query (server state) |
| Wallet Integration | @perawallet/connect, @agorise/use-wallet |
| Routing | React Router v6 |
| Charts/Visualization | Recharts, D3.js |
| Features | Responsive design, PWA capabilities, Dark mode, Real-time updates |

### 6.6 Database

| Component | Technology |
|-----------|-----------|
| Primary Database | PostgreSQL v15+ (managed via Supabase or AWS RDS) |
| Caching Layer | Redis (company insights, AI-generated roadmaps) |
| Key Tables | Users, JDs, Verifications, InterviewExperiences, ScholTokenTransactions |

### 6.7 Infrastructure & DevOps

- **Frontend Hosting:** Vercel or Netlify (CDN, auto-scaling)
- **Backend Hosting:** Railway, Render, or AWS EC2
- **CI/CD:** GitHub Actions (automated testing, deployment)
- **Monitoring:** Sentry (error tracking), Algorand Indexer (blockchain monitoring)
- **Containerization:** Docker, Docker Compose
- **Email/SMS:** SendGrid (email), Twilio (SMS)
- **Video Calls:** Daily.co API or Agora.io (mock interviews)

---

## 7. Implementation Approach

### 3-Day Hackathon Development Plan

#### Day 1: Foundation (Core Infrastructure)

**Focus:** Core infrastructure and blockchain integration

**Tasks:**
- **Smart Contract Development (PyTEAL):** Define state variables, implement JD upload/verification functions, deploy to Algorand TestNet
- **IPFS Integration:** Set up IPFS node or Pinata, implement upload function, test content persistence
- **Backend Skeleton:** Initialize FastAPI project, set up PostgreSQL database, create basic API endpoints, integrate Algorand SDK
- **Frontend Skeleton:** Initialize React project, set up routing, create wallet connection UI, basic dashboard layout

**Deliverable:** Working JD upload flow (Frontend → Backend → IPFS → Algorand)

#### Day 2: AI Integration (Intelligent Features)

**Focus:** Intelligent features and data processing

**Tasks:**
- **Skill Extraction Pipeline:** Implement PDF text extraction, set up spaCy NLP pipeline, train/fine-tune skill extraction model
- **Pattern Recognition System:** Create historical data aggregation logic, implement clustering algorithms, build company pattern analysis
- **Recommendation Engine:** Implement student-company matching algorithm, build compatibility scoring system, integrate GPT-4 for roadmap generation
- **Frontend - Company Pages:** Design company detail pages, implement filter interface, visualize AI insights (charts, graphs)

**Deliverable:** AI-powered recommendations and insights working end-to-end

#### Day 3: Polish & Demo Preparation

**Focus:** User experience and presentation

**Tasks:**
- **Verification System:** Implement stake-based verification UI, smart contract verification logic, quality score calculation
- **Token Economy:** Leaderboard implementation, token earning/spending UI, transaction history
- **Testing & Bug Fixes:** End-to-end testing, fix critical bugs, performance optimization
- **Demo Preparation:** Seed database with 20-30 real JDs from campus, prepare demo script, create pitch deck

**Deliverable:** Production-ready MVP for live demo

### 7.2 Demo Strategy

**10-Minute Live Demo Flow:**

1. **Problem Introduction (1 min):** Show VIERP screenshot, explain pain point
2. **Solution Overview (2 min):** Open Scholaris DAO dashboard, show personalized recommendations
3. **Core Feature Demo (5 min):** Upload JD, show AI extraction, verify JD, view company insights, apply filters, generate roadmap
4. **Blockchain Value Prop (1.5 min):** Show on-chain verification proof, demonstrate immutability, explain token incentives
5. **Impact & Future (0.5 min):** Highlight scalability and expansion potential

**Backup Plan:** Pre-recorded video and static screenshots if live demo fails

---

## 8. Expected Outcomes

### 8.1 Immediate Impact (MVP)

**Centralized Knowledge Repository:**
- 50+ JDs uploaded in first month
- 100+ interview experiences shared
- All data verifiable and tamper-proof

**Improved Preparation Efficiency:**
- Students save 50+ hours of research time
- Personalized roadmaps increase success rate by 30%
- Better company-student matching

**Incentivized Contribution:**
- Seniors motivated to upload (earn ScholTokens)
- Community-driven quality control
- Self-sustaining knowledge transfer

**Transparency & Trust:**
- On-chain verification eliminates fake JDs
- Immutable timeline tracks company evolution
- Decentralized governance prevents censorship

### 8.2 Long-Term Vision

**Cross-College Network:**
- Expand to 10+ engineering colleges
- Shared ScholToken economy
- Inter-college mock interview matching

**Recruiter Integration:**
- Companies access verified candidate pool
- On-chain skill credentials (verifiable portfolios)
- Direct recruitment through platform

**Monetization:**
- Premium tier ($5/month): AI mock interviews, mentorship
- Company partnerships: Sponsored JD placement
- Data insights for TPOs

**DAO Governance:**
- Token holders vote on platform features
- Community-driven roadmap
- Decentralized moderation

### 8.3 Measurable Success Metrics

- Number of JDs uploaded and verified
- Student engagement rate (daily active users)
- Placement success rate improvement (before vs. after)
- Time saved per student in preparation
- ScholToken circulation and economy health
- Cross-college adoption rate
- Recruiter partnerships established

---

## 9. Future Scope

### 9.1 Feature Enhancements

**Advanced AI Features:**
- Resume analyzer (match resume to JD requirements)
- Interview question predictor (based on company patterns)
- Weakness identifier (suggest improvement areas)
- Salary negotiation assistant (ML-based CTC predictor)

**Blockchain Enhancements:**
- Cross-chain bridge (support Ethereum for wider adoption)
- Zero-knowledge proofs (stronger privacy for sensitive data)
- Arweave migration for permanent storage
- DAO treasury management (community-funded initiatives)

**Social Features:**
- Study groups with on-chain accountability contracts
- Peer mentorship marketplace
- Alumni network integration
- Token-curated discussion forums

### 9.2 Integration Possibilities

- TPO system API integration (auto-import JDs)
- LinkedIn integration (verify on-chain credentials)
- GitHub integration (verify coding projects)
- LeetCode/HackerRank API (sync practice stats)

### 9.3 Scalability Considerations

**Technical Scalability:**
- Shard database for multi-college support
- CDN for IPFS content delivery
- Caching layer for AI-generated insights
- Load balancing for API servers

**Economic Scalability:**
- Token value appreciation as user base grows
- Staking rewards (incentivize long-term holding)
- Burn mechanism (reduce supply, increase scarcity)

---

## 10. Conclusion

Scholaris DAO addresses critical gaps in campus coordination by combining blockchain's immutability for trust and verification, AI's intelligence for personalization and insights, and token economics for incentivizing participation.

This solution transforms campus operations from isolated, opaque processes into collaborative, transparent, and efficient systems. By leveraging Algorand's unique features (low fees, fast finality, native ASAs), we create a sustainable ecosystem that benefits students, faculty, and institutions alike.

Team Init2WinIt is committed to building a production-ready MVP that demonstrates the power of decentralized coordination in education. Our solution is not just technically sound but addresses real problems faced by thousands of students every year.

**Key Strengths:**
- **Real Problem:** Campus systems lack trust, knowledge is lost when seniors graduate
- **Blockchain Value:** Immutable records, transparent verification, decentralized governance
- **AI Enhancement:** Personalized insights, pattern recognition, automated recommendations
- **Token Economics:** Incentivizes contribution, ensures quality, builds reputation
- **Feasible Implementation:** 3-day MVP plan with clear deliverables
- **Scalable Vision:** Multi-module platform, cross-college expansion, sustainable growth

---

## Appendix

### A. References

1. **Algorand Developer Documentation:** https://developer.algorand.org
2. **PyTEAL Documentation:** https://pyteal.readthedocs.io
3. **IPFS Documentation:** https://docs.ipfs.tech
4. **spaCy NLP Documentation:** https://spacy.io
5. **React Documentation:** https://react.dev
6. **FastAPI Documentation:** https://fastapi.tiangolo.com

### B. Team Contact Information

**Sanchitsai Nipanikar (Team Leader)**  
Department of Computer Engineering, VIT Pune  
Email: [Your Email]  
GitHub: [Your GitHub]  
LinkedIn: [Your LinkedIn]

**Shrey Chougule**  
Department of Computer Engineering, VIT Pune  
Email: [Shrey's Email]  
GitHub: [Shrey's GitHub]  
LinkedIn: [Shrey's LinkedIn]

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**"Illuminating Trust in Education"**

**Team Init2WinIt**  
**Campus Blockchain Hackathon 2026**
