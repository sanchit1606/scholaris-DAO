<h1 align="center">Scholaris DAO</h1>
<p align="center"><em>Illuminate Campus Activities with Blockchain</em></p>

<p align="center">
  <img src="./effecrt.gif" alt="decorative effect" width="250" />
</p>

**Technical Documentation**

---

**Team Init2WinIt**

**Team Members:**

- **Sanchitsai Nipanikar** (Team Leader)Department of Computer Engineering, Final Yr VIT Pune
- **Shrey Chougule**
  Department of Computer Engineering, Final Yr
  VIT Pune

**Campus Blockchain Hackathon**
**February 12, 2026**
**Platform: Algorand**

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Identified Campus Problems](#2-identified-campus-problems)
3. [Proposed Solutions Overview](#3-proposed-solutions-overview)
4. [Primary Solution: Scholaris DAO - Placement Module](#4-primary-solution-scholaris-dao---placement-help-module)
5. [Technical Architecture](#5-technical-architecture)
6. [Technology Stack](#6-technology-stack)
7. [Expected Outcomes](#7-expected-outcomes)
8. [Future Scope](#8-future-scope)
9. [User Flow Diagram](#9-user-flow-diagram)
10. [Conclusion](#10-conclusion)

---

## 1. Problem Statement

Campus systems such as voting, attendance tracking, feedback collection, certification, and group coordination often suffer from:

- Lack of trust in centralized authorities
- Manual verification processes leading to inefficiencies
- Data tampering and manipulation risks
- Privacy concerns for students and faculty
- Information asymmetry in placement and career preparation

The challenge is to build beginner-friendly blockchain application on Algorand that improve trust, verification, and coordination for campus activities. Solutions should demonstrate how blockchain can enable fair participation, verifiable records, privacy-preserving systems, and simple automation without relying on centralized control.

---

## 2. Identified Campus Problems

### 2.1 Placement Information Gap

- TPO systems (like VIERP) contain extensive placement data but are difficult to navigate
- Job descriptions (JDs) gets lost in email threads
- Seniors graduate and take valuable interview insights with them
- No structured knowledge about company-specific requirements (skills, DSA patterns, programming languages)
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

### 2.4 Low Academic Engagement

- Low attendance in non-mandatory lectures due to lack of motivation
- No incentive structure to reward consistent academic participation
- Students skip events, quizzes, and club activities without consequences
- Manual attendance is time-consuming and prone to proxy marking
- No gamification to drive engagement across campus activities

---

## 3. Proposed Solutions Overview

We propose multiple blockchain-powered solutions that leverage Algorand's unique features to address campus challenges. Our primary focus is the Placement Intelligence Module of Scholaris DAO, with supporting solutions demonstrating the versatility of our approach.

### 3.1 Permissioned Campus Voting System

**Goal:** Secure, auditable elections with one-person-one-vote and private ballots

**Technical Approach:**

- **On-Chain:** Stateful smart contract (PyTEAL) registers eligible voter addresses
- **Privacy:** Commit-reveal scheme — voters submit hash(vote + nonce), later reveal actual vote
- **Sybil Prevention:** Permissioned list or one-time voting token (ASA) that burns upon voting
- **State Management:** Global state for vote tallies, local state for opt-in/hasVoted flag

**Why Algorand:** Fast finality (4 seconds), low fees enable multiple voting rounds

### 3.2 Engagement Rewards System (Token-Incentivized Campus Participation)

**Goal:** Increase academic engagement in campus through token incentives

#### Core Token Utility Model

- **Token Acquisition:**Students earn tokens via attendance (QR scans), quizzes, competitions, or other engagement activities (e.g., submitting feedback, attending different club events etc).

  The token rewards are prioritized in order:Firstly, most points allocated to semester attendance (lectures), then giving feedbacks (e.g., course or event reviews), then participating & winning quizzes, attending technical events on college campus, and similar engagements.This creates a "mining" loop where consistent involvement builds token balances.
- **Token Spending Mechanics:**
  Use ASAs on Algorand for transfers. Students opt-in to the token, and redemptions could trigger atomic transfers (e.g., burn tokens for NFTs or send to event organizers).
  *(Will add a dashboard in the React frontend for tracking balances and spending history)*

#### Potential Uses for Tokens

1. **Event and Activity Registrations** (replaces real-money registration fees):

   - Hackathon or workshop entry: Spend tokens instead of paying via UPI/cash.
   - Club events: Use tokens for tickets to tech talks, seminars, hackathons, cultural fests, etc. Clubs could set dynamic pricing via DAO votes.
   - Campus competitions: Entry fees for quizzes, debates, or innovation challenges.
2. **Educational Resources and Upskilling:**

   - Buying courses / content: Redeem tokens for access to online modules, certifications, or curated study materials.
   - Tokens can be used to waive off library late overdue penalties on books.

#### Implementation Considerations

- **Smart Contract Integration:** Add functions in PyTEAL for token redemption (e.g., `redeem_tokens(event_id, amount)` that burns/spends tokens and updates local state for perks).
- **Why Algorand Fits:** Low fees (0.001 ALGO) make frequent small spends viable; ASAs enable easy minting/burning without high gas costs.
- **Risks and Mitigations:** Prevent abuse (e.g., token farming) with anti-Sybil measures like one-wallet-per-student via campus ID linkage. Track metrics like token velocity (circulation rate) in your analytics dashboard.
- **Expansion Potential:** In future scope, partner with off-campus entities (e.g., local startups accepting tokens for internships) to increase real-world value.

### 3.3 Anonymous Course Feedback

**Goal:** Honest course feedback without fear of retaliation

**Technical Approach:**

- **Commit Phase:** Students submit hash(rating + nonce) on-chain
- **Reveal Phase:** After semester ends, submit plaintext rating + nonce
- **Verification:** Smart contract validates hash matches reveal
- **AI Aggregation:** Analyzes sentiment only after critical mass (50+ responses)

---

## 4. Primary Solution: Scholaris DAO - Placement Help Module

### Decentralized Placement Intelligence Platform

### 4.1 The Core Problem

**Current State:**

- TPO systems (VIERP) are data graveyards with poor UX
- 500+ JDs buried in difficult-to-navigate interfaces
- Seniors possess valuable insights but knowledge disappears post-graduation
- No structured way to answer: "What DS&A patterns does Citi Sachs ask?"
- Juniors waste 100+ hours researching what seniors already know

**Impact:**

- Lower placement rates due to inefficient preparation
- Repeated effort every year (knowledge not preserved)
- Missed opportunities (students don't know which companies match their skills)
- Unfair advantage for students with senior connections

### 4.2 Solution Architecture

#### Part 1: Data Layer (IPFS + Algorand)

**JD Upload & Storage Flow:**

1. User uploads JD (PDF/text/image) through web interface
2. File stored on IPFS (InterPlanetary File System)
3. IPFS hash + metadata stored in Algorand smart contract
4. AI extracts structured data (skills, requirements, CTC, etc)
5. Uploader earns ScholTokens (ASA) as reward

**Smart Contract Global State Structure:**

Each JD record contains: `jd_id`, `ipfs_hash`, `company`, `role`, `year`, `uploader_address`, `verification_votes`, `quality_score`, `view_count`, `timestamp`

#### Part 2: AI Intelligence Layer (Off-Chain)

**Component 1: Skill Extraction Engine**

- Uses NLP to extract required skills, experience level, role category, CGPA cutoffs, and eligible branches from JD text.
- For campus TPO company details and JDs uploaded by students, the AI module further extracts specifics such as company name, role, location, categorized skills (e.g., Programming languages, Frameworks & Libraries, Databases, Cloud & DevOps, Version Control), and minimum qualification criteria for Online Assessment (OA), including 10th/12th marks and CGPA thresholds.

**Component 2: Pattern Recognition System**

Analyzes historical interview experiences to identify recurring DSA patterns, difficulty distribution, and temporal trends in company requirements.

After a company's campus drive is completed, OA-shortlisted students can post OA patterns and programming problem statements in a community forum. Before posting, users select options like Company Name, Role, and Tag (e.g., OA Cleared, Technical Interview Cleared, Selected for Company). They then describe their OA problem statements, interview experiences, questions asked, HR round Q&A, etc. Like Reddit, other users can upvote posts, with the most upvoted appearing at the top in descending order. This data is fed into AI models to detect patterns, such as company-specific focuses (e.g., Y company emphasizing Sliding Window approach, string manipulation etc). Users who post their interview experience are rewarded with ScholTokens to incentivize contributions.

#### Part 3: Blockchain Features (Algorand-Specific)

**Feature 1: Contribution Reward System (ASAs)**

**ScholToken Economy:**

- Upload JD: **10 tokens**
- Upload interview experience: **15 tokens**
- Verify others' uploads: **2 tokens**
- Popular content (50+ views): **20 bonus tokens**
- Downvoted as spam: **-15 tokens** (quality control)

**Feature 2: Decentralized Curation (DAO Governance)**

- Community voting on JD quality (1-5 stars)
- Weighted votes: Placed students = 2x weight
- Stake tokens to propose JD removal
- Automatic archival of JDs older than 2 years (unless community votes to keep)

#### Part 4: Advanced Features

**Feature 1: Smart Filter System**

Students can filter companies by:

- **Role:** Backend Developer, Full Stack, Data Scientist, AI/ML Engineer etc
- **Skills Required:** Java (Banking applications), Python (AI/ML), React (Frontend) etc
- **DS&A Pattern:** Arrays/HashMaps, Trees/Graphs, Dynamic Programming etc
- **CTC Range:** 10-20 LPA, 20-40 LPA, 40+ LPA
- **CGPA Cutoff:** No cutoff, 7.0+, 8.0+, 9.0+

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

| Component               | Technology                                                           |
| ----------------------- | -------------------------------------------------------------------- |
| Platform                | Algorand                                                             |
| Smart Contract Language | PyTEAL (Python-based)                                                |
| Framework               | Beaker                                                               |
| Development Tools       | AlgoKit, Algorand Sandbox                                            |
| SDKs                    | algosdk (JavaScript v2.7+), py-algorand-sdk (Python v2.6+)           |
| Features Used           | Stateful Smart Contracts, ASAs, Atomic Transfers, Local/Global State |
| Network - Development   | Algorand LocalNet                                                    |
| Network - Production    | Algorand TestNet → MainNet                                          |

### 6.2 Decentralized Storage

| Component        | Technology                                          |
| ---------------- | --------------------------------------------------- |
| Storage          | IPFS (InterPlanetary File System)                   |
| Purpose          | Store JD PDFs, images, interview experiences        |
| Client Libraries | ipfs-http-client (JavaScript), py-ipfs-api (Python) |
| Pinning Service  | Pinata or Web3.Storage (content persistence)        |

### 6.3 AI/ML Pipeline

| Component                | Technology                                 |
| ------------------------ | ------------------------------------------ |
| NLP Framework            | spaCy v3.7+ or Hugging Face Transformers   |
| Named Entity Recognition | en_core_web_sm (spaCy)                     |
| Skill Extraction         | Custom BERT fine-tuned model               |
| Recommendation Engine    | Scikit-learn (TF-IDF, Cosine Similarity)   |
| LLM Integration          | OpenAI GPT-4 API (roadmap generation, Q&A) |
| OCR                      | Tesseract OCR                              |

### 6.4 Backend

| Component      | Technology                                                                  |
| -------------- | --------------------------------------------------------------------------- |
| API Server     | Python with FastAPI                                                         |
| Authentication | Wallet-based (Algorand address signature) + JWT tokens                      |
| Rate Limiting  | Redis-based                                                                 |
| API Structure  | RESTful API with /auth, /jds, /companies, /user, /recommendations endpoints |
| Testing        | pytest (Python), pytest-asyncio for async endpoints                         |

### 6.5 Frontend

| Component            | Technology                                                        |
| -------------------- | ----------------------------------------------------------------- |
| Framework            | React v18+ with TypeScript                                        |
| UI Library           | Tailwind CSS + shadcn/ui components                               |
| State Management     | Zustand (global state), React Query (server state)                |
| Wallet Integration   | @perawallet/connect, @agorise/use-wallet                          |
| Routing              | React Router v6                                                   |
| Charts/Visualization | Recharts, D3.js                                                   |
| Features             | Responsive design, PWA capabilities, Dark mode, Real-time updates |

### 6.6 Database

| Component        | Technology                                                              |
| ---------------- | ----------------------------------------------------------------------- |
| Primary Database | PostgreSQL v15+ (managed via Supabase or AWS RDS)                       |
| Caching Layer    | Redis (company insights, AI-generated roadmaps)                         |
| Key Tables       | Users, JDs, Verifications, InterviewExperiences, ScholTokenTransactions |

### 6.7 Infrastructure & DevOps

- **Frontend Hosting:** Vercel or Netlify (CDN, auto-scaling)
- **Backend Hosting:** Railway, Render, or AWS EC2
- **CI/CD:** GitHub Actions (automated testing, deployment)
- **Monitoring:** Sentry (error tracking), Algorand Indexer (blockchain monitoring)
- **Containerization:** Docker, Docker Compose

---

## 7. Expected Outcomes

### 7.1 Immediate Impact (MVP)

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

### 7.2 Long-Term Vision

**Cross-College Network:**

- Expand to engineering colleges
- Shared ScholToken economy

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

### 7.3 Measurable Success Metrics

- Number of JDs uploaded and verified
- Student engagement rate (daily active users)
- Placement success rate improvement (before vs. after)
- Time saved per student in preparation
- ScholToken circulation and economy health
- Cross-college adoption rate
- Recruiter partnerships established

---

## 8. Future Scope

### 8.1 Feature Enhancements

**Advanced AI Features:**

- Resume analyzer (match resume to JD requirements)
- Weakness identifier (suggest improvement areas)

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

### 8.2 Scalability Considerations

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

## 9. User Flow Diagram

![Scholaris DAO - User Flow Diagram](./user-flow.excalidraw.svg)

---

## 10. Conclusion

Scholaris DAO addresses critical gaps in campus coordination by combining blockchain's immutability for trust and verification, AI's intelligence for personalization and insights, and token economics for incentivizing participation.

This solution transforms campus operations from isolated, opaque processes into collaborative, transparent, and efficient systems. By leveraging Algorand's unique features (low fees, fast finality, native ASAs), we create a sustainable ecosystem that benefits students, faculty, and institutions alike.

Team Init2WinIt is committed to building a production-ready MVP that demonstrates the power of decentralized coordination in education. Our solution is not just technically sound but addresses real problems faced by thousands of students every year.

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
Email: sanchitsai.nipanikar22@vit.edu
GitHub: https://github.com/sanchit1606
LinkedIn: https://www.linkedin.com/in/sanchit1606

**Shrey Chougule**
Department of Computer Engineering, VIT Pune
Email: [Shrey's Email]
GitHub: https://github.com/Shreychougule
LinkedIn: [Shrey's LinkedIn]

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Team Init2WinIt**
**MLSC Hackspirathon 2026**
