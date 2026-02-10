# AI and Automation in Blockchain for Campus Systems

## Hackathon Submission Document

---

### Team Information

**Team Name:** Team Init2WinIt

**Team Members:**
- **Sanchitsai Nipanikar** (Team Leader)  
  Department of Computer Engineering, VIT Pune
  
- **Shrey Chougule**  
  Department of Computer Engineering, VIT Pune

**Event:** Campus Blockchain Hackathon  
**Date:** February 12, 2026  
**Platform:** Algorand Blockchain

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Identified Campus Problems](#identified-campus-problems)
3. [Proposed Solutions Overview](#proposed-solutions-overview)
4. [Primary Solution: PlacePrep DAO](#primary-solution-placeprep-dao)
5. [Technical Architecture](#technical-architecture)
6. [Technology Stack](#technology-stack)
7. [Implementation Approach](#implementation-approach)
8. [Expected Outcomes](#expected-outcomes)
9. [Future Scope](#future-scope)

---

## Problem Statement

Campus systems such as voting, attendance tracking, feedback collection, certification, and group coordination often suffer from:
- **Lack of trust** in centralized authorities
- **Manual verification** processes leading to inefficiencies
- **Data tampering** and manipulation risks
- **Privacy concerns** for students and faculty
- **Information asymmetry** in placement and career preparation

The challenge is to build beginner-friendly blockchain applications on Algorand that improve trust, verification, and coordination for campus activities. Solutions should demonstrate how blockchain can enable fair participation, verifiable records, privacy-preserving systems, and simple automation without relying on centralized control.

---

## Identified Campus Problems

### 1. **Placement Information Gap**
- TPO systems (like VIERP) contain extensive placement data but are difficult to navigate
- Job descriptions (JDs) get lost in email threads
- Seniors graduate and take valuable interview insights with them
- No structured knowledge about company-specific requirements (skills, DS&A patterns, programming languages)
- Juniors waste time reinventing preparation strategies every year

### 2. **Campus Governance & Voting**
- Club elections and student body voting lack transparency
- Fear of manipulation in vote counting
- No privacy for voters (potential retaliation)
- Difficulty in verifying one-person-one-vote principle

### 3. **Feedback & Grievance Collection**
- Students fear retaliation when giving honest course/professor feedback
- Centralized systems can tamper with or delete feedback
- Lack of anonymity in grievance systems
- No way to verify authenticity of feedback vs. spam

### 4. **Asset Management**
- Library books not returned on time (no accountability)
- Lab equipment damaged without ownership tracking
- No transparent collateral system

### 5. **Attendance & Participation**
- Manual attendance is time-consuming and prone to proxy marking
- Low engagement in non-mandatory classes
- No gamification or incentive structure

### 6. **Academic Integrity**
- Plagiarism detection relies on centralized databases
- No timestamped proof of original work
- Cannot verify "who created it first" in disputes

---

## Proposed Solutions Overview

### Solution 1: Permissioned Campus Voting System

**Goal:** Secure, auditable elections with one-person-one-vote and private ballots

**Technical Approach:**
- **On-Chain:** Stateful smart contract (PyTEAL) registers eligible voter addresses
- **Privacy:** Commit-reveal scheme—voters submit hash(vote + nonce), later reveal actual vote
- **Sybil Prevention:** Permissioned list or one-time voting token (ASA) that burns upon voting
- **State Management:** Global state for vote tallies, local state for opt-in/hasVoted flag

**Why Algorand:** Fast finality (4 seconds), low fees enable multiple voting rounds, built-in commit-reveal support

---

### Solution 2: Library Book Lending with ASA Collateral

**Goal:** Reduce overdue books through blockchain-based deposit system

**Technical Approach:**
- **Collateral Token:** Students receive DepositTokens (ASA) at semester start
- **Smart Contract Logic:** 
  - Borrow book → freeze student's DepositToken
  - Return on time → unfreeze token
  - Late return → clawback mechanism transfers token to library fund
- **AI Integration:** Automated SMS/email reminders before due date
- **Redemption:** Tokens redeemable for printing credits, cafeteria vouchers

**Why Algorand:** Freeze/clawback addresses are native ASA features (unique to Algorand)

---

### Solution 3: Real-Time Cafeteria Payments with Dietary Tracking

**Goal:** Transparent meal plan system with nutritional tracking

**Technical Approach:**
- **Payment Flow:** Meal swipe triggers instant payment + mints receipt NFT
- **Data Storage:** Each receipt NFT contains metadata (calories, allergens, meal components)
- **AI Analytics:** Weekly nutrition reports generated from on-chain data
- **Access Control:** Parents/health center can audit with student permission
- **Refunds:** Instant automated refunds for quality complaints

**Why Algorand:** 4-second finality makes this viable for cafeteria queues (Ethereum would create bottlenecks)

---

### Solution 4: Attendance Mining (Gamified Learning)

**Goal:** Increase class attendance through token incentives

**Technical Approach:**
- **Mechanism:** 
  - Student scans QR code → mints AttendanceToken (0.001 ALGO fee)
  - Collect 80% of semester tokens → unlock exam preparation NFT
  - Top 10% attendance → priority course registration next semester
- **Analytics Dashboard:** Professors see real-time engagement metrics
- **Leaderboard:** Public rankings encourage healthy competition

**Why Algorand:** Low fees (0.001 ALGO) make minting 150+ tokens/semester economically feasible

---

### Solution 5: Anonymous Course Selection Survey

**Goal:** Honest course feedback without fear of retaliation

**Technical Approach:**
- **Commit Phase:** Students submit hash(rating + nonce) on-chain
- **Reveal Phase:** After semester ends, submit plaintext rating + nonce
- **Verification:** Smart contract validates hash matches reveal
- **AI Aggregation:** Analyzes sentiment only after critical mass (50+ responses)
- **Privacy:** Department sees trends without individual identities

**Why Algorand:** Simple commit-reveal (no complex zero-knowledge proofs needed)

---

### Solution 6: Plagiarism Proof with AI Detection

**Goal:** Timestamped proof of original work with AI similarity checking

**Technical Approach:**
- **Submission Flow:** Student submits assignment → hash stored on-chain with timestamp
- **Off-Chain AI:** Checks similarity against database of past submissions
- **Flagging System:** If >80% similarity detected, raise flag for professor review
- **Dispute Resolution:** On-chain timestamp proves "who created it first"
- **Audit Trail:** Smart contract records professor's final decision

**Why Algorand:** Immutable timestamps, low cost for frequent submissions

---

## Primary Solution: PlacePrep DAO

### Decentralized Placement Intelligence Platform

---

## The Core Problem

**Current State:**
- TPO systems (VIERP) are data graveyards with poor UX
- 500+ JDs buried in difficult-to-navigate interfaces
- Seniors possess valuable insights (company patterns, interview experiences) but knowledge disappears post-graduation
- No structured way to answer critical questions:
  - "What DS&A patterns does Goldman Sachs ask?"
  - "Does Barclays prefer Java or Python?"
  - "Which companies ask graph problems vs dynamic programming?"
- Juniors waste 100+ hours researching what seniors already know

**Impact:**
- Lower placement rates due to inefficient preparation
- Repeated effort every year (knowledge not preserved)
- Missed opportunities (students don't know which companies match their skills)
- Unfair advantage for students with senior connections

---

## Solution Architecture

### Part 1: Data Layer (IPFS + Algorand)

**JD Upload & Storage Flow:**

1. **Upload:**
   - Senior uploads JD (PDF/text/image) through web interface
   - File stored on IPFS (InterPlanetary File System)
   - Returns unique content-addressed hash (e.g., `Qm...`)

2. **On-Chain Registration:**
   - IPFS hash + metadata stored in Algorand smart contract
   - Metadata includes:
     - Company name
     - Role/position
     - Year of visit
     - Uploader wallet address
     - Verification status
     - Quality score (crowd-sourced)

3. **AI Extraction:**
   - NLP pipeline automatically extracts:
     - Required skills (Java, Python, React, AWS, etc.)
     - Degree requirements (CGPA cutoff, branch restrictions)
     - Role category (Backend, Full Stack, Data Science, etc.)
     - CTC range
     - Location

4. **Reward Mechanism:**
   - Uploader earns ContributionTokens (ASA)
   - Base reward: 10 tokens per verified upload
   - Bonus: +5 tokens if 5+ students verify authenticity
   - Quality bonus: +20 tokens if JD gets 50+ views

**Smart Contract Global State Structure:**
```
JD_Record {
  jd_id: "JD_001",
  ipfs_hash: "Qm...",
  company: "Google",
  role: "Backend Engineer",
  year: 2024,
  uploader_address: "ALGO_ADDRESS",
  verification_votes: 15,
  quality_score: 4.5/5.0,
  view_count: 230,
  timestamp: 1707523200
}
```

---

### Part 2: AI Intelligence Layer (Off-Chain)

**Component 1: Skill Extraction Engine**

- **Input:** Raw JD text (from PDF/image OCR)
- **Processing:**
  - Named Entity Recognition (NER) for technologies
  - Keyword extraction for skills
  - Dependency parsing for requirements vs. preferences
- **Output:** Structured JSON
  ```
  {
    "required_skills": ["Java", "Spring Boot", "MySQL", "AWS"],
    "preferred_skills": ["Kafka", "Redis", "Docker"],
    "experience_level": "0-2 years",
    "role_category": "Backend Developer",
    "domain": "FinTech",
    "cgpa_cutoff": 7.0,
    "eligible_branches": ["CSE", "IT", "ECE"]
  }
  ```

**Component 2: Pattern Recognition System**

- **Data Source:** Historical interview experiences (uploaded by seniors)
- **Analysis:**
  - Aggregate problems asked by each company
  - Identify recurring DS&A patterns (Arrays, Trees, Graphs, DP)
  - Track difficulty distribution (Easy/Medium/Hard)
  - Detect temporal trends (company shifting focus over years)
  
- **Output Example:**
  ```
  Company: "Goldman Sachs"
  Analysis (Last 50 interviews):
    - 85% problems involve Arrays/HashMaps
    - 70% ask SQL queries (Joins, Indexing)
    - 60% use Two-pointer/Sliding window techniques
    - Difficulty: 90% Medium, 10% Hard
    - Preferred Language: Java (used in 95% of interviews)
    - Avg. Interview Rounds: 3 (Coding → Technical → HR)
  
  Temporal Trend:
    - 2022: Focus on Core Java (OOP, Collections)
    - 2023: Shift to Spring Boot + Microservices
    - 2024: Emphasis on System Design + Distributed Systems
  ```

**Component 3: Smart Recommendation Engine**

- **Input:** Student profile
  ```
  {
    "skills": ["Python", "Django", "PostgreSQL"],
    "cgpa": 8.2,
    "branch": "CSE",
    "target_role": "Backend Developer",
    "preparation_time": "3 months"
  }
  ```

- **Processing:**
  - Match student skills against JD requirements
  - Calculate compatibility scores (0-100%)
  - Identify skill gaps
  - Generate personalized preparation roadmap
  
- **Output:**
  ```
  Top Matches:
  1. Atlassian (95% match)
     - Skills match: Python✓, Django✓, PostgreSQL✓
     - CGPA exceeds cutoff (7.5)
     - Gap: Redis (recommended: 2 weeks to learn)
  
  2. Amazon (75% match)
     - Skills match: Backend experience✓, Databases✓
     - CGPA exceeds cutoff (7.0)
     - Gap: Java (they prefer Java for coding rounds)
     - Recommended: Start Java basics (4 weeks)
  
  Personalized Roadmap:
  Week 1-4: Learn Java fundamentals (for Amazon)
  Week 5-6: Redis basics (for Atlassian)
  Week 7-10: DSA practice (Arrays, Trees, DP)
  Week 11-12: System Design (top companies expect this)
  ```

---

### Part 3: Blockchain Features (Algorand-Specific)

**Feature 1: Contribution Reward System (ASAs)**

**Problem:** Seniors have no incentive to contribute knowledge before graduating

**Solution:**
- **PrepToken (ASA):** Custom token for ecosystem
- **Earning Mechanisms:**
  - Upload JD: 10 tokens
  - Upload interview experience: 15 tokens
  - Verify others' uploads: 2 tokens
  - Popular content (50+ views): 20 bonus tokens
  - Helpful answers in Q&A: 5 tokens

- **Spending Mechanisms:**
  - Unlock premium AI features (mock interviews)
  - Redeem for campus perks (cafeteria vouchers, library late fees waiver)
  - Gift to juniors (knowledge transfer incentive)
  - Leaderboard prominence (top contributors visible to recruiters)

- **Quality Control:**
  - Downvoted as spam: -15 tokens (penalty)
  - Verified as authentic by 5+ students: +5 bonus tokens

**Smart Contract Logic (PyTEAL pseudocode):**
```
function upload_jd(ipfs_hash, metadata):
  verify_student_enrollment()  // Prevent external spam
  store_on_chain(ipfs_hash, metadata)
  mint_tokens(sender, 10)
  emit_event("JD_UPLOADED")

function verify_jd(jd_id, is_authentic):
  require(sender != original_uploader)  // Can't verify own content
  stake_tokens(sender, 2)  // Prevent frivolous votes
  
  record_vote(jd_id, sender, is_authentic)
  
  if vote_count(jd_id) >= 5:
    if authentic_votes >= 4:
      bonus_tokens(original_uploader, 5)
      return_stake(all_reviewers, 2)
    else:
      slash_uploader_stake(original_uploader, 10)
      reward_honest_reviewers()
```

---

**Feature 2: Immutable Interview Timeline**

**Problem:** No way to track how company requirements evolve over time

**Solution:**
- Every JD upload timestamped on-chain
- Interview experiences linked to specific recruitment year
- Queryable historical data: "Show me Microsoft's pattern evolution 2022-2024"

**Use Case:**
```
Query: "Amazon DS&A pattern changes"

Response:
2022: 
  - 60% Arrays, 40% Trees
  - Focus: Optimization problems
  - Avg difficulty: Medium

2023: 
  - 50% Graphs, 30% DP, 20% Arrays
  - Focus: Scalability, distributed systems
  - Avg difficulty: Medium-Hard

2024: 
  - 55% System Design, 45% DSA
  - Focus: Architecture, trade-offs
  - Avg difficulty: Hard

Insight: Amazon increasingly emphasizes system design.
Recommendation: Allocate 60% prep time to system design, 40% to DSA.
```

---

**Feature 3: Decentralized Curation (DAO Governance)**

**Problem:** Who decides if a JD is outdated or inaccurate?

**Solution:**
- **Community Voting:** Students vote on JD quality (1-5 stars)
- **Weighted Votes:** 
  - Placed students: 2x weight (their experience is validated)
  - Active contributors (10+ uploads): 1.5x weight
  - New users: 1x weight
  
- **Dispute Resolution:**
  - Stake tokens to propose JD removal
  - Community votes (51% threshold to remove)
  - If proposal passes: Staker gets refund + bonus
  - If proposal fails: Stake slashed and redistributed

- **Automatic Archival:**
  - JDs older than 2 years flagged for review
  - Unless 10+ students vote "still relevant", auto-archived

**Smart Contract Governance Logic:**
```
function vote_quality(jd_id, rating):
  voter_weight = get_weight(sender)  // Placed students = 2x
  weighted_rating = rating * voter_weight
  update_score(jd_id, weighted_rating)
  reward_voter(sender, 1)  // Incentive to participate

function propose_removal(jd_id, reason):
  stake_tokens(sender, 20)  // Serious proposals only
  create_proposal(jd_id, reason, sender)
  voting_period = 7 days
  
function vote_on_removal(proposal_id, support):
  record_vote(proposal_id, sender, support)
  
  if voting_ended(proposal_id):
    if support_percentage >= 51%:
      archive_jd(jd_id)
      refund_stake(proposer, 20)
      bonus_tokens(proposer, 10)
    else:
      slash_stake(proposer, 20)
      distribute_to_voters()
```

---

### Part 4: Advanced Features

**Feature 1: Smart Filter System**

**Filter Categories:**

1. **By Role:**
   - Backend Developer (48 companies)
   - Full Stack Developer (32 companies)
   - Data Scientist (21 companies)
   - AI/ML Engineer (15 companies)
   - Frontend Developer (28 companies)

2. **By Skills Required:**
   - Java → Banking sector (Barclays, Citi, Goldman Sachs, JPMorgan)
   - Python → AI/ML companies (Google AI, Microsoft Research, Sprinklr)
   - React → Frontend-heavy (Atlassian, Adobe, Vercel)
   - AWS → Cloud-native (Amazon, VMware, Nutanix)

3. **By DS&A Pattern:**
   - Arrays & HashMaps → Google, Amazon, Microsoft
   - Trees & Graphs → Google, Adobe, Uber
   - Dynamic Programming → Amazon, Apple, Flipkart
   - System Design → All FAANG (senior roles)

4. **By Subject/Domain:**
   - Operating Systems → Asks process scheduling, memory management
   - DBMS → Asks indexing, normalization, transactions
   - Computer Networks → Asks TCP/IP, routing protocols
   - OOP → Asks design patterns, SOLID principles

5. **By CTC Range:**
   - 10-20 LPA (38 companies)
   - 20-40 LPA (52 companies)
   - 40+ LPA (18 companies)

6. **By CGPA Cutoff:**
   - No cutoff (12 companies)
   - 7.0+ (45 companies)
   - 8.0+ (23 companies)
   - 9.0+ (8 companies - elite tier)

**Filter Logic:**
- Boolean AND across categories
- AI ranks results by compatibility score
- "Must-have" vs "Nice-to-have" skill differentiation

---

**Feature 2: Personalized Study Roadmap Generator**

**Input:** Target companies + current skill level + time available

**AI Algorithm:**
1. Analyze all selected companies' historical patterns
2. Identify common topics (intersection of requirements)
3. Calculate weighted difficulty (based on frequency × importance)
4. Generate week-by-week plan with resources

**Example Output:**
```
Target: Google, Amazon, Microsoft
Time Available: 3 months (12 weeks)
Current Level: Intermediate (LeetCode 50 problems solved)

Generated Roadmap:

Week 1-2: Master Arrays & HashMaps (60% of all problems)
  - Topics: Two pointers, sliding window, prefix sums
  - Practice: LeetCode #1, #15, #238, #560, #567
  - Companies: All three ask these heavily
  - Time: 2-3 hours/day

Week 3-4: Trees & Graphs (Google emphasis - 70%)
  - Topics: BFS, DFS, tree traversals, graph cycles
  - Practice: LeetCode #102, #124, #200, #207, #210
  - Focus: Google asks trees in 70% of interviews
  - Time: 3-4 hours/day

Week 5-6: Dynamic Programming (Amazon favorite - 65%)
  - Topics: 1D DP, 2D DP, knapsack, LCS
  - Practice: LeetCode #70, #300, #322, #518, #1143
  - Focus: Amazon asks DP in 65% of final rounds
  - Time: 4 hours/day (most challenging)

Week 7-8: Advanced Data Structures
  - Topics: Heaps, tries, segment trees
  - Practice: LeetCode #23, #208, #295, #347
  - Companies: Microsoft emphasizes heaps
  - Time: 3 hours/day

Week 9-10: System Design Fundamentals
  - Topics: Load balancers, caching, databases, CAP theorem
  - Resources: System Design Primer, Grokking SDI
  - Focus: All three ask for senior roles
  - Time: 2-3 hours/day

Week 11-12: Mock Interviews & Revision
  - Practice: Full interview simulations
  - Review: Mistakes from practice sessions
  - Refine: Communication and problem-solving approach
  - Time: 4-5 hours/day

Success Probability: 85% (based on students with similar profiles)
```

---

**Feature 3: Real-Time Difficulty Predictor**

**Concept:** Students practice problems, AI provides instant feedback

**Flow:**
1. Student submits practice solution (code)
2. AI analyzes:
   - Time complexity (O notation)
   - Space complexity
   - Code quality (readability, style)
   - Pattern used (brute force vs. optimal)
3. Compares against company expectations
4. Provides actionable feedback

**Example:**
```
Your Solution: Two Sum Problem

Analysis:
✗ Time Complexity: O(n²) - Nested loops detected
✗ Space Complexity: O(1) - No auxiliary storage
✗ Pattern: Brute force approach

Company Expectations:
- Amazon: Expects O(n) with HashMap (Medium difficulty)
- Google: Expects O(n) with follow-up optimization
- Microsoft: Accepts O(n log n) with sorting

Feedback:
"This brute force solution won't pass top company interviews.
They expect O(n) time complexity using a HashMap.

Hint: Use a HashMap to store {value: index} pairs.
For each element, check if (target - element) exists in map.

Try again with this approach!"

Learning Path:
1. Watch: HashMap two-pointer technique (video link)
2. Practice: Similar problems (LeetCode #15, #167)
3. Re-attempt: With optimal approach
```

**On-Chain Component:**
- Store solution attempt hash (proves you practiced)
- Track improvement over time (solution quality trend)
- Earn badges for consistent practice (30-day streak NFT)

---

**Feature 4: Mock Interview Matching System**

**Problem:** Students practice alone, lack real interview pressure

**Solution:**
- **Peer Matching:** AI pairs students with similar preparation levels
- **Stake Mechanism:** Both stake 5 tokens (ensures both show up)
- **Video Integration:** Built-in video call (or Zoom/Google Meet link)
- **Feedback Template:** AI provides structured feedback form
- **Reputation System:** Both earn reputation NFT after completion
- **Visibility:** Top mock interviewers visible to TPO (helps with on-campus hiring)

**Matching Algorithm:**
- Skill level similarity (± 10% LeetCode ranking)
- Availability overlap (timezone, schedule)
- Topic preferences (both want to practice graphs)
- Past feedback scores (avoid toxic participants)

**Post-Interview Flow:**
1. Both participants rate each other (1-5 stars)
2. AI aggregates feedback
3. If both show up and complete: Tokens returned + bonus
4. If one no-shows: Stake transferred to other party
5. Build interviewer reputation score (visible on profile)

---

## User Interface Design

### Dashboard (Student View)

**Welcome Screen:**
```
👋 Welcome, Sanchit! (Final Year, CSE)

🎯 Your Target Role: Backend Developer
📊 Profile Completeness: 85% (Add skills: Redis, Kafka)

Top Matches (Based on your skills: Python, Django, PostgreSQL):
1. ✅ Atlassian - 95% match | CTC: 45 LPA | Apply by: Feb 20
   Skills: Python✓, Django✓, PostgreSQL✓, Redis✗
   Action: Learn Redis (2 weeks recommended)
   
2. ✅ Razorpay - 90% match | CTC: 32 LPA | Apply by: Feb 25
   Skills: Python✓, APIs✓, PostgreSQL✓
   Action: Ready to apply!
   
3. ⚠️ Amazon - 75% match | CTC: 52 LPA | Apply by: March 1
   Skills: DSA✓, Backend✓, Java✗
   Action: Learn Java basics (they prefer Java for coding)

📚 Recommended Learning:
- Week 1-2: Redis fundamentals (for Atlassian)
- Week 3-6: Java basics (for Amazon, Goldman Sachs)
- Week 7-12: System design (for senior roles)

🏆 Your Stats:
- JDs viewed: 45
- Mock interviews: 3 (Avg rating: 4.2/5)
- PrepTokens earned: 35 (Upload more content!)
- Preparation score: 72/100
```

---

### Company Deep Dive Page

**Example: Goldman Sachs**

```
🏢 Goldman Sachs

📄 Available JDs: 12 (2022-2024)
  - Software Engineer (2024) - 8 openings - View JD
  - Quant Developer (2023) - 2 openings - View JD
  - Data Analyst (2024) - 5 openings - View JD

🧠 AI-Generated Insights:

Pattern Analysis (Last 50 interviews):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Topics Asked:
  ████████████████████ 85% Core Java (OOP, Multithreading, Collections)
  ██████████████ 70% SQL Queries (Joins, Indexing, Optimization)
  ████████████ 60% Arrays & HashMaps
  ████████ 40% System Design (for senior roles)
  
🎯 Preferred Programming Language:
  Java: 95% | Python: 5%
  
📈 Difficulty Distribution:
  Easy: 10% | Medium: 75% | Hard: 15%
  
🔢 Interview Structure:
  Round 1: Online Coding Test (2 DSA problems, 90 mins)
  Round 2: Technical Interview (Java internals, DBMS)
  Round 3: Behavioral (Teamwork, leadership scenarios)
  Round 4: HR (Salary negotiation, offer discussion)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Historical Data:
  2024 Placement:
    - Applied: 45 students
    - Selected: 12 students
    - Success Rate: 26.7%
    - Avg CGPA of selected: 8.1
    - Branch distribution: CSE (8), IT (3), ECE (1)
  
  2023 Placement:
    - Applied: 52 students
    - Selected: 10 students
    - Success Rate: 19.2%

🎓 AI-Generated Preparation Roadmap:

Week 1-2: Java Deep Dive
  - Topics: Collections Framework, Streams API, Concurrency
  - Resources: Java 8 features, Multithreading tutorial
  - Practice: 20 Java-specific problems
  
Week 3: SQL Mastery
  - Topics: Complex joins, subqueries, indexing
  - Practice: HackerRank SQL track (30 problems)
  - Focus: They ask live SQL queries in interviews
  
Week 4-5: DSA (Arrays, HashMaps, Trees)
  - Practice: LeetCode Medium (50 problems)
  - Pattern: Two-pointer, sliding window
  
Week 6: Mock Interviews
  - Book 3 peer mock interviews
  - Focus: Communication and problem-solving approach

Success Probability: 78% (if you follow this plan)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Senior Insights (Verified On-Chain):

🗣️ Priya Sharma (Placed 2024) - 250 upvotes
"They grill you on Java multithreading. Make sure you understand 
synchronized blocks, volatile keyword, and thread pools. Also, 
they asked me to write SQL queries on a whiteboard - practice 
complex joins without IDE autocomplete!"

🗣️ Arjun Patel (Placed 2023) - 180 upvotes
"Behavioral round is crucial. They want to see leadership and 
problem-solving under pressure. Prepare STAR method examples. 
Technical rounds are medium difficulty but time pressure is real."

🗣️ Sneha Gupta (Placed 2024) - 145 upvotes
"Focus on data structures implementation from scratch (LinkedList, 
HashMap). They asked me to implement LRU cache in Java. System 
design for senior roles - know CAP theorem, load balancing."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📥 Actions:
[Download All JDs] [Add to Target Companies] [Start Preparation Plan]
```

---

### Advanced Filter Interface

```
🔍 Smart Filters (12 companies match your criteria)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Filter by Role:
  ☑ Backend Developer (48 companies)
  ☑ Full Stack Developer (32 companies)
  ☐ Data Scientist (21 companies)
  ☐ AI/ML Engineer (15 companies)
  ☐ Frontend Developer (28 companies)
  ☐ DevOps Engineer (18 companies)

🛠️ Filter by Skills:
  ☑ Java (Banking: Barclays, Citi, Goldman, JPMorgan)
  ☑ Python (AI/ML: Google, Microsoft, Sprinklr)
  ☐ React (Frontend: Atlassian, Adobe, Vercel)
  ☐ AWS (Cloud: Amazon, VMware, Salesforce)
  ☐ Kubernetes (DevOps: Red Hat, HashiCorp)

📚 Filter by DS&A Pattern:
  ☑ Arrays & HashMaps (Google, Amazon, Microsoft)
  ☐ Trees & Graphs (Google, Adobe, Uber)
  ☐ Dynamic Programming (Amazon, Apple, Flipkart)
  ☐ System Design (All FAANG)
  ☐ Greedy Algorithms (Meta, Bloomberg)

📖 Filter by Subject Emphasis:
  ☑ Operating Systems (Process scheduling, memory management)
  ☐ DBMS (Indexing, normalization, transactions)
  ☐ Computer Networks (TCP/IP, routing)
  ☐ OOP (Design patterns, SOLID principles)

💰 Filter by CTC Range:
  ☐ 10-20 LPA (38 companies)
  ☑ 20-40 LPA (52 companies)
  ☐ 40+ LPA (18 companies - FAANG tier)

🎓 Filter by CGPA Cutoff:
  ☐ No cutoff (12 companies)
  ☑ 7.0+ (45 companies)
  ☐ 8.0+ (23 companies)
  ☐ 9.0+ (8 companies - elite tier)

🌍 Filter by Location:
  ☑ Bangalore (85 companies)
  ☐ Pune (32 companies)
  ☐ Hyderabad (45 companies)
  ☐ Remote (28 companies)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Results: 12 companies match your filters

[Apply AI-Powered Ranking] [Save Filter] [Export to PDF]
```

---

## Technical Architecture

### System Architecture Diagram (Conceptual)

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface Layer                     │
│  (React Frontend - Web & Mobile Responsive)                  │
│                                                               │
│  - Dashboard  - Company Pages  - Filter Interface            │
│  - Upload JD  - Mock Interview  - Roadmap Generator          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                  Application Backend Layer                   │
│         (Node.js/Python FastAPI - API Gateway)               │
│                                                               │
│  - Authentication      - JD Processing       - Token Mgmt    │
│  - User Profiles       - Verification Logic  - Analytics     │
└──────────┬──────────────────────────┬─────────────┬─────────┘
           │                          │             │
           ▼                          ▼             ▼
┌──────────────────┐    ┌─────────────────────┐   ┌────────────┐
│  Algorand Layer  │    │   AI/ML Pipeline    │   │  Database  │
│                  │    │     (Off-Chain)     │   │ PostgreSQL │
│ - Smart Contract │    │                     │   │            │
│   (PyTEAL)       │    │ - Skill Extraction  │   │ - User     │
│                  │    │ - Pattern Analysis  │   │   Profiles │
│ - ASA Tokens     │    │ - Recommendations   │   │ - Cache    │
│   (PrepToken)    │    │ - Roadmap Gen       │   │ - Metadata │
│                  │    │                     │   │            │
│ - State Mgmt     │    │ Models:             │   └────────────┘
│   (Global/Local) │    │ - GPT-4 API         │
│                  │    │ - spaCy NLP         │
│ - Verification   │    │ - TF-IDF Matching   │
│   Logic          │    │ - Graph Algorithms  │
└────────┬─────────┘    └─────────────────────┘
         │
         ▼
┌──────────────────┐
│  IPFS Network    │
│                  │
│ - JD Storage     │
│ - Interview Exp  │
│ - Content Hash   │
│ - Pinning Svc    │
└──────────────────┘

External Integrations:
- Algorand Indexer (query blockchain data)
- Email/SMS API (reminders, notifications)
- Video API (mock interview calls)
- TPO System API (optional integration)
```

---

### Data Flow

**1. JD Upload Flow:**
```
Student → Upload PDF → Frontend
                         ↓
            Backend receives file
                         ↓
         ┌───────────────┴───────────────┐
         ▼                               ▼
   Store in IPFS                    Extract with AI
   (get hash)                      (skills, company, etc.)
         │                               │
         └───────────────┬───────────────┘
                         ▼
            Combine: IPFS hash + metadata
                         ↓
          Submit to Algorand Smart Contract
                         ↓
            Contract stores on-chain state
                         ↓
         Mint PrepTokens to uploader (ASA)
                         ▼
              Success confirmation
```

**2. Company Query Flow:**
```
Student → Apply Filters → Frontend
                            ↓
            API request to backend
                            ↓
      ┌────────────────────┴────────────────────┐
      ▼                                         ▼
Query Algorand                            Query AI Pipeline
(get JD hashes)                          (pattern analysis)
      │                                         │
      └────────────────────┬────────────────────┘
                           ▼
              Fetch IPFS content (JDs)
                           ↓
              AI processes & ranks
                           ↓
            Return personalized results
                           ▼
           Frontend displays dashboard
```

**3. Verification Flow:**
```
Student A uploads JD → Smart Contract
                          ↓
        Random Student B sees "Verify JD" prompt
                          ↓
        Student B reviews → Votes authentic/spam
                          ↓
        Smart Contract records vote (stakes 2 tokens)
                          ↓
               Count reaches 5 votes
                          ↓
        ┌─────────────────┴─────────────────┐
        ▼                                   ▼
  If 4/5 authentic                  If 4/5 spam
        │                                   │
        ▼                                   ▼
Bonus to uploader                  Slash uploader stake
Return reviewer stakes             Reward honest reviewers
        │                                   │
        └─────────────────┬─────────────────┘
                          ▼
              Update JD quality score
```

---

## Technology Stack

### Blockchain Layer

**Primary Blockchain:** Algorand

**Smart Contract Development:**
- **Language:** PyTEAL (Python-based)
- **Framework:** Beaker (higher-level PyTEAL framework)
- **Development Tools:** 
  - AlgoKit (scaffolding and deployment)
  - Algorand Sandbox (local testing environment)
  
**SDKs:**
- **JavaScript:** `algosdk` (v2.7+)
- **Python:** `py-algorand-sdk` (v2.6+)

**Algorand Features Used:**
- Stateful Smart Contracts (Applications)
- Algorand Standard Assets (ASAs) for PrepToken
- Atomic Transfers (for multi-party transactions)
- Local State (user-specific data)
- Global State (contract-wide data)

**Network:**
- Development: Algorand LocalNet
- Testing: Algorand TestNet
- Production: Algorand MainNet

---

### Decentralized Storage

**IPFS (InterPlanetary File System)**
- **Purpose:** Store JD PDFs, images, interview experiences
- **Client:** `ipfs-http-client` (JavaScript) or `py-ipfs-api` (Python)
- **Pinning Service:** Pinata or Web3.Storage (ensure content persistence)
- **Content Addressing:** CIDv1 format (e.g., `Qm...`)

---

### AI/ML Pipeline

**Natural Language Processing:**
- **Framework:** spaCy (v3.7+) or Hugging Face Transformers
- **Models:**
  - Named Entity Recognition: `en_core_web_sm` (spaCy)
  - Skill Extraction: Custom BERT fine-tuned model
  - Sentiment Analysis: `distilbert-base-uncased-finetuned-sst-2`
  
**Recommendation Engine:**
- **Algorithm:** Collaborative Filtering + Content-Based Filtering
- **Library:** Scikit-learn (TF-IDF, Cosine Similarity)
- **Vector Database:** Pinecone or Milvus (for similarity search)

**Pattern Recognition:**
- **Clustering:** K-Means, DBSCAN (group similar companies/roles)
- **Time Series:** Prophet (detect temporal trends in company requirements)

**Large Language Model Integration:**
- **Primary:** OpenAI GPT-4 API (for roadmap generation, Q&A)
- **Fallback:** Claude API or Llama 2 (cost optimization)
- **Use Cases:**
  - Summarize JDs
  - Generate personalized study plans
  - Answer student queries

**OCR (Optical Character Recognition):**
- **Library:** Tesseract OCR or Google Cloud Vision API
- **Purpose:** Extract text from image-based JDs

---

### Backend

**API Server:**
- **Framework:** Node.js with Express.js OR Python with FastAPI
- **Why:**
  - Node.js: Better integration with Algorand JS SDK
  - FastAPI: Better for AI/ML pipeline integration
  
**Choice:** **FastAPI (Python)** - unified language for AI + blockchain

**API Structure:**
```
/api/v1
  /auth
    POST /register
    POST /login
    GET  /verify-email
  /jds
    POST /upload
    GET  /list (with filters)
    GET  /:id
    POST /:id/verify
  /companies
    GET  /list
    GET  /:company/insights
    GET  /:company/patterns
  /user
    GET  /profile
    PUT  /profile
    GET  /dashboard
    GET  /tokens
  /recommendations
    GET  /matches
    POST /roadmap
  /mock-interviews
    POST /request
    POST /feedback
```

**Authentication:**
- **Primary:** Wallet-based (Algorand address signature)
- **Secondary:** JWT tokens (session management)
- **Verification:** Campus email verification (one-time)

**Rate Limiting:**
- Redis-based rate limiting (prevent spam uploads)

---

### Frontend

**Framework:** React (v18+) with TypeScript

**UI Library:** 
- **Primary:** Tailwind CSS (rapid styling)
- **Components:** shadcn/ui or Radix UI (accessible components)

**State Management:**
- **Global State:** Zustand or Redux Toolkit
- **Server State:** React Query / TanStack Query (caching API responses)

**Wallet Integration:**
- **Libraries:** 
  - `@perawallet/connect` (Pera Wallet)
  - `@agorise/use-wallet` (multi-wallet support)
  
**Key Features:**
- Responsive design (mobile-first)
- Progressive Web App (PWA) capabilities
- Real-time updates (WebSocket for new JDs)
- Dark mode support

**Routing:** React Router v6

**Charts/Visualization:**
- Recharts (company pattern visualizations)
- D3.js (complex relationship graphs)

---

### Database

**Primary Database:** PostgreSQL (v15+)

**Schema:**
```sql
Users
- id (UUID)
- algorand_address (UNIQUE)
- email
- name
- branch
- year
- cgpa
- skills (JSONB)
- created_at

JDs
- id (UUID)
- ipfs_hash (UNIQUE)
- company
- role
- year
- uploader_id (FK → Users)
- verification_score
- view_count
- extracted_skills (JSONB)
- metadata (JSONB)
- created_at

Verifications
- id (UUID)
- jd_id (FK → JDs)
- verifier_id (FK → Users)
- is_authentic (BOOLEAN)
- stake_amount
- created_at

InterviewExperiences
- id (UUID)
- company
- role
- year
- student_id (FK → Users)
- questions_asked (JSONB)
- difficulty
- outcome
- ipfs_hash
- created_at

PrepTokenTransactions
- id (UUID)
- user_id (FK → Users)
- amount
- type (ENUM: earned, spent, staked)
- reason
- txn_id (Algorand transaction ID)
- created_at
```

**Caching Layer:** Redis
- Cache company insights (updated daily)
- Cache AI-generated roadmaps (user-specific, TTL: 7 days)
- Session storage

---

### Infrastructure & DevOps

**Hosting:**
- **Frontend:** Vercel or Netlify (CDN, auto-scaling)
- **Backend:** Railway, Render, or AWS EC2
- **Database:** Supabase (managed PostgreSQL) or AWS RDS

**CI/CD:**
- GitHub Actions (automated testing, deployment)

**Monitoring:**
- **Application:** Sentry (error tracking)
- **Blockchain:** Algorand Indexer (transaction monitoring)
- **Analytics:** Mixpanel or PostHog (user behavior)

**Environment Management:**
- Docker (containerization)
- Docker Compose (local development)

---

### External Services

**Email/SMS:**
- SendGrid (email notifications)
- Twilio (SMS reminders)

**Video Calls (Mock Interviews):**
- Daily.co API or Agora.io (embedded video)

**File Processing:**
- AWS Lambda or Google Cloud Functions (OCR processing)

**Analytics:**
- Google Analytics 4 (user tracking)
- Algorand Indexer API (on-chain analytics)

---

### Development Tools

**Version Control:** Git + GitHub

**Code Quality:**
- ESLint + Prettier (JavaScript/TypeScript)
- Black + Flake8 (Python)
- Husky (pre-commit hooks)

**Testing:**
- **Smart Contracts:** pytest with Algorand test fixtures
- **Backend:** pytest (Python) or Jest (Node.js)
- **Frontend:** Jest + React Testing Library
- **E2E:** Playwright or Cypress

**Documentation:**
- Swagger/OpenAPI (API documentation)
- Storybook (UI component documentation)

---

## Implementation Approach

### Phase 1: Foundation (Day 1)

**Focus:** Core infrastructure and blockchain integration

**Tasks:**
1. **Smart Contract Development (PyTEAL)**
   - Define state variables (global & local)
   - Implement JD upload function
   - Implement verification function
   - Implement PrepToken minting logic
   - Deploy to Algorand TestNet

2. **IPFS Integration**
   - Set up IPFS node or use Pinata
   - Implement upload function
   - Test content persistence

3. **Backend Skeleton**
   - Initialize FastAPI project
   - Set up PostgreSQL database
   - Create basic API endpoints (upload, query)
   - Integrate Algorand SDK

4. **Frontend Skeleton**
   - Initialize React project
   - Set up routing
   - Create wallet connection UI
   - Basic dashboard layout

**Deliverable:** Working JD upload flow (Frontend → Backend → IPFS → Algorand)

---

### Phase 2: AI Integration (Day 2)

**Focus:** Intelligent features and data processing

**Tasks:**
1. **Skill Extraction Pipeline**
   - Implement PDF text extraction
   - Set up spaCy NLP pipeline
   - Train/fine-tune skill extraction model
   - Test on sample JDs

2. **Pattern Recognition System**
   - Create historical data aggregation logic
   - Implement clustering algorithms
   - Build company pattern analysis

3. **Recommendation Engine**
   - Implement student-company matching algorithm
   - Build compatibility scoring system
   - Generate personalized roadmaps (GPT-4 integration)

4. **Frontend - Company Pages**
   - Design company detail pages
   - Implement filter interface
   - Visualize AI insights (charts, graphs)

**Deliverable:** AI-powered recommendations and insights working end-to-end

---

### Phase 3: Polish & Demo (Day 3)

**Focus:** User experience and presentation

**Tasks:**
1. **Verification System**
   - Implement stake-based verification UI
   - Smart contract verification logic
   - Quality score calculation

2. **Token Economy**
   - Leaderboard implementation
   - Token earning/spending UI
   - Transaction history

3. **Mock Interview Feature** (Optional/Stretch Goal)
   - Peer matching algorithm
   - Video call integration
   - Feedback system

4. **Testing & Bug Fixes**
   - End-to-end testing
   - Fix critical bugs
   - Performance optimization

5. **Demo Preparation**
   - Seed database with real data (20-30 JDs from your campus)
   - Prepare demo script
   - Create pitch deck
   - Record demo video (backup)

**Deliverable:** Production-ready MVP for live demo

---

### Demo Strategy

**Live Demo Flow (10 minutes):**

1. **Problem Introduction (1 min)**
   - Show VIERP screenshot (confusing UI)
   - Explain pain point with real example

2. **Solution Overview (2 min)**
   - Open PlacePrep DAO dashboard
   - Show personalized recommendations
   - Highlight AI-powered insights

3. **Core Feature Demo (5 min)**
   - **Upload JD:** Senior uploads Google JD → IPFS → Algorand
   - **AI Extraction:** Show extracted skills in real-time
   - **Verification:** Another student verifies → earns tokens
   - **Company Insights:** Navigate to Google company page
   - **Filters:** Apply multiple filters → show results
   - **Roadmap:** Generate personalized study plan for student

4. **Blockchain Value Prop (1.5 min)**
   - Show on-chain verification proof
   - Demonstrate immutability (timestamp, hash)
   - Explain token incentive mechanism

5. **Impact & Future (0.5 min)**
   - "500+ JDs organized, 1000+ students helped"
   - "Cross-college expansion potential"
   - "Recruiter partnership opportunities"

**Backup Plan:**
- Pre-recorded video (if live demo fails)
- Static screenshots for each step

---

## Expected Outcomes

### Immediate Impact (MVP)

1. **Centralized Knowledge Repository**
   - 50+ JDs uploaded in first month
   - 100+ interview experiences shared
   - All data verifiable and tamper-proof

2. **Improved Preparation Efficiency**
   - Students save 50+ hours of research time
   - Personalized roadmaps increase success rate by 30%
   - Better company-student matching

3. **Incentivized Contribution**
   - Seniors motivated to upload (earn PrepTokens)
   - Community-driven quality control
   - Self-sustaining knowledge transfer

4. **Transparency & Trust**
   - On-chain verification eliminates fake JDs
   - Immutable timeline tracks company evolution
   - Decentralized governance prevents censorship

---

### Long-Term Vision

1. **Cross-College Network**
   - Expand to 10+ engineering colleges
   - Shared PrepToken economy
   - Inter-college mock interview matching

2. **Recruiter Integration**
   - Companies access verified candidate pool
   - On-chain skill credentials (verifiable portfolios)
   - Direct recruitment through platform

3. **Monetization**
   - Premium tier ($5/month): AI mock interviews, mentorship
   - Company partnerships: Sponsored JD placement
   - Data insights for TPOs (anonymized trends)

4. **DAO Governance**
   - Token holders vote on platform features
   - Community-driven roadmap
   - Decentralized moderation

---

## Future Scope

### Feature Enhancements

1. **Advanced AI Features**
   - Resume analyzer (match resume to JD requirements)
   - Interview question predictor (based on company patterns)
   - Weakness identifier (suggest improvement areas)
   - Salary negotiation assistant (ML-based CTC predictor)

2. **Blockchain Enhancements**
   - Cross-chain bridge (support Ethereum for wider adoption)
   - Zero-knowledge proofs (stronger privacy for sensitive data)
   - Decentralized storage migration (IPFS → Arweave for permanent storage)
   - DAO treasury management (community-funded initiatives)

3. **Social Features**
   - Study groups on-chain (accountability contracts)
   - Peer mentorship marketplace
   - Alumni network integration
   - Discussion forums (moderated via token-curated registry)

4. **Integration Possibilities**
   - TPO system API integration (auto-import JDs)
   - LinkedIn integration (verify on-chain credentials)
   - GitHub integration (verify coding projects)
   - LeetCode/HackerRank API (sync practice stats)

---

### Scalability Considerations

1. **Technical Scalability**
   - Shard database for multi-college support
   - CDN for IPFS content delivery
   - Caching layer for AI-generated insights
   - Load balancing for API servers

2. **Economic Scalability**
   - Token value appreciation (as user base grows)
   - Staking rewards (incentivize long-term holding)
   - Burn mechanism (reduce supply, increase scarcity)

3. **Governance Scalability**
   - Quadratic voting (prevent whale control)
   - Delegate voting (representative democracy)
   - Multi-sig admin (decentralized control)

---

## Conclusion

**PlacePrep DAO** addresses a critical gap in campus placement preparation by combining:
- **Blockchain's immutability** for trust and verification
- **AI's intelligence** for personalization and insights
- **Token economics** for incentivizing knowledge sharing

This solution transforms placement preparation from an individual struggle into a collaborative, transparent, and efficient process. By leveraging Algorand's unique features (low fees, fast finality, native ASAs), we create a sustainable ecosystem that benefits students, seniors, and institutions alike.

**Team Init2WinIt** is committed to building a production-ready MVP that demonstrates the power of decentralized knowledge management in education.

---

## Appendix

### References

1. Algorand Developer Documentation: https://developer.algorand.org
2. PyTEAL Documentation: https://pyteal.readthedocs.io
3. IPFS Documentation: https://docs.ipfs.tech
4. spaCy NLP Documentation: https://spacy.io
5. React Documentation: https://react.dev

### Team Contact

**Sanchitsai Nipanikar** (Team Leader)  
Email: [Your Email]  
GitHub: [Your GitHub]  
LinkedIn: [Your LinkedIn]

**Shrey Chougule**  
Email: [Shrey's Email]  
GitHub: [Shrey's GitHub]  
LinkedIn: [Shrey's LinkedIn]

---

**Prepared for:** Campus Blockchain Hackathon, February 12, 2026  
**Last Updated:** February 9, 2026  
**Version:** 1.0

---

*"Empowering students through decentralized knowledge, one JD at a time."*

**Team Init2WinIt**
