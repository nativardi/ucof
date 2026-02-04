# UCOF Methodology - How It Works

> **Both Skill and CLI versions use the same analysis methodology.**
> This document explains what UCOF does and how it finds issues.

---

## 🎯 Core Principles

UCOF is built on these principles:

1. **Read-Only Analysis** - Never modify code during analysis
2. **Evidence-Based** - Every finding has file paths and code snippets
3. **Severity-Driven** - Prioritize by impact, not discovery order
4. **Systematic** - Cover all 8 domains consistently
5. **Actionable** - Findings include specific fix recommendations

---

## 📊 Analysis Process (4 Phases)

### Phase 1: Discovery

**Goal:** Understand the project

```
1. Detect technology stack
   - Frontend: React? Next.js? Vue? Angular?
   - Backend: Node? Python? Go? Rust?
   - Database: Supabase? Prisma? MongoDB?
   - Queue/Workers: Redis? Celery? BullMQ?
   - AI Services: OpenAI? Anthropic? Google AI?
   - Deployment: Vercel? Railway? Docker?

2. Map directory structure
   - Source files by type
   - Test files location
   - Config files present
   - Documentation location

3. Count files and lines of code
   - By language/type
   - Distribution across project
   - Complexity indicators

4. Check quality indicators
   - Tests exist? (*.test.ts, __tests__/, jest.config.*, etc.)
   - CI/CD configured? (.github/workflows/, .gitlab-ci.yml, etc.)
   - Linting set up? (.eslintrc*, .prettier*, etc.)
   - TypeScript? (tsconfig.json)
   - Error monitoring? (sentry, datadog, etc.)
```

**Output:** Project overview, tech stack, structure map

---

### Phase 2: Domain Analysis

**Goal:** Deep-dive into each domain

#### 🔒 Security Domain

Checks for:
- **Authentication** - Can users access without logging in?
- **Authorization** - Can users access others' data (IDOR)?
- **Data Protection** - Are secrets in code? Are passwords hashed?
- **Input Validation** - Are forms validated on server side?
- **Injection Attacks** - SQL injection, XSS, command injection?
- **Rate Limiting** - Can brute force attacks work?
- **CORS** - Are cross-origin requests properly restricted?
- **Database Policies** - RLS policies configured? (for Supabase)

Example findings:
```
❌ SEC-001: API endpoint /api/users/:id lacks authentication
   - Can call as anonymous and get any user's data
   - Fix: Add auth check before returning data

❌ SEC-002: Hardcoded API key in .env.example
   - Secret exposed in git repository
   - Fix: Use environment variables, never commit secrets
```

---

#### 🗄️ Data Layer Domain

Checks for:
- **N+1 Queries** - Does listing 100 items query 101 times?
- **Unbounded Queries** - SELECT * without LIMIT?
- **Missing Indexes** - Slow queries on frequently filtered columns?
- **Schema Issues** - Missing constraints, wrong types?
- **Migrations** - Are they versioned and tested?
- **Client DB Access** - Should operations be server-side?
- **Pagination** - Does large result set lack pagination?

Example findings:
```
❌ DB-001: N+1 query in UserList component
   - Fetches user, then 1 query per item = 101 queries for 100 users
   - Fix: Use JOIN or batch queries

❌ DB-002: Unbounded query in dashboard
   - Fetches ALL events without LIMIT
   - Fix: Add LIMIT 1000 and pagination
```

---

#### 🔧 Backend / API Domain

Checks for:
- **Input Validation** - Are user inputs checked?
- **Error Handling** - Do errors return stack traces? Silent failures?
- **Authentication** - Are protected routes actually protected?
- **API Consistency** - Different endpoints have different patterns?
- **Request Timeouts** - Can requests hang forever?
- **Request Size Limits** - Can huge files DOS the server?
- **Pagination** - Large endpoints paginated?

Example findings:
```
❌ API-001: POST /api/messages accepts any JSON
   - No input validation
   - Fix: Validate message format, length, type

❌ API-002: 500 errors return stack traces
   - Exposes internal code structure
   - Fix: Return generic error, log details server-side
```

---

#### 🔌 External Services Domain

Checks for:
- **Retry Logic** - API calls fail silently if service is down?
- **Timeout Handling** - Requests hang forever?
- **Rate Limiting** - Hitting rate limits? No backoff?
- **Job Failures** - Background jobs lost on failure?
- **Dead Letter Queue** - Failed jobs go somewhere?
- **AI Response Validation** - Is AI output validated?
- **Webhook Verification** - Are webhooks validated?

Example findings:
```
❌ EXT-001: OpenAI calls have no retry logic
   - If API is slow, requests timeout and fail
   - Fix: Add exponential backoff retry

❌ EXT-002: Background jobs fire-and-forget
   - Job fails and never retries = data loss
   - Fix: Use queue with retry (BullMQ, RQ)
```

---

#### 🖥️ Frontend Domain

Checks for:
- **Server vs Client** - Too many client components?
- **Bundle Size** - Is it growing too large?
- **Loading States** - Does UI show loading? Empty states?
- **Error Boundaries** - Do errors crash the whole app?
- **Pagination** - Large lists paginated?
- **Data Fetching** - Fetching on every render? Race conditions?
- **Accessibility** - Can screen readers use the site?

Example findings:
```
❌ FE-001: Large data fetch on component render
   - Fetches 10,000 items every time component loads
   - Fix: Use pagination, lazy loading, virtualization

❌ FE-002: No error boundary
   - One component error crashes entire app
   - Fix: Wrap in <ErrorBoundary>
```

---

#### 🏗️ Infrastructure Domain

Checks for:
- **CI/CD Pipeline** - Is there automated testing/deployment?
- **Error Monitoring** - Errors go to /dev/null?
- **Health Checks** - Can you tell if app is healthy?
- **Secrets Management** - Hardcoded passwords? Env vars?
- **Environment Separation** - Dev/prod difference?
- **Logging** - Can you debug issues?
- **Alerts** - Are critical errors monitored?

Example findings:
```
❌ INFRA-001: No CI/CD pipeline
   - Code not linted, tested, or type-checked before deploy
   - Fix: Set up GitHub Actions, run tests on PR

❌ INFRA-002: No error monitoring
   - Crashes in production unknown
   - Fix: Add Sentry, DataDog, or similar
```

---

#### ⚡ Performance Domain

Checks for:
- **Polling Intervals** - Checking every 100ms?
- **Caching** - Same data fetched repeatedly?
- **Large Payloads** - Sending unnecessary data?
- **Synchronous Ops** - Blocking the main thread?
- **Memory Leaks** - Listeners not cleaned up?
- **Rendering** - Re-rendering too often?

Example findings:
```
❌ PERF-001: Polling interval of 500ms
   - Drains battery, wastes bandwidth
   - Fix: Use WebSocket or long polling

❌ PERF-002: Large API response (5MB per page)
   - Slow to load, wastes bandwidth
   - Fix: Paginate, compress, lazy-load images
```

---

#### ✅ Quality Domain

Checks for:
- **Test Coverage** - Zero tests?
- **Type Safety** - Using `any` everywhere?
- **Linting** - Code style consistent?
- **Documentation** - Can new devs understand the code?
- **Logging** - Debug logs left in production?
- **Code Comments** - Is complex logic explained?
- **Tech Debt** - TODOs everywhere?

Example findings:
```
❌ QA-001: Zero unit tests
   - Can't catch regressions
   - Fix: Add Jest/Vitest, aim for 60%+ coverage

❌ QA-002: TypeScript with `any` type
   - Lost type safety
   - Fix: Use proper types, enable strict mode
```

---

### Phase 3: Finding Aggregation

**Goal:** Compile and deduplicate findings

```
1. Collect all findings from all domains

2. Deduplicate
   - If two domains find same issue = report once
   - Add cross-references between related issues

3. Score findings
   - Severity: critical | high | medium | low
   - Effort to fix: low | medium | high
   - Impact: how bad if not fixed?

4. Sort by priority
   - Severity first
   - Then effort (quick wins first)
```

---

### Phase 4: Synthesis & Reporting

**Goal:** Identify patterns and create execution plan

#### 4.1: Systemic Patterns

Look for cross-cutting themes:

**Pattern: "No Safety Net"**
```
Indicators:
- QA: Zero test coverage
- INFRA: No CI/CD pipeline
- INFRA: No error monitoring

Meaning: System has no way to detect issues before users do
Fix: Add monitoring, tests, CI/CD (Phase 0)
```

**Pattern: "Happy Path Only"**
```
Indicators:
- EXT: No retry logic
- API: Fire-and-forget operations
- DB: No transaction rollbacks

Meaning: System assumes all operations succeed
Fix: Add error handling, retries, transactions (Phase 1)
```

**Pattern: "Scale Cliff"**
```
Indicators:
- DB: N+1 queries
- API: No pagination
- FE: No virtualization
- PERF: Polling intervals < 1 sec

Meaning: Works now, breaks at 10x users
Fix: Fix queries, add pagination, optimize (Phase 2)
```

---

#### 4.2: Execution Plan

Group findings into phases:

**Phase 0: Immediate (Before Production)**
```
Criteria: Critical severity + low effort
Examples:
- Missing auth on public endpoint
- Hardcoded secrets
- SQL injection vulnerability

Action: Fix before any deployment
```

**Phase 1: Foundation (Sprint 1)**
```
Criteria: Critical issues OR high-severity blocking work
Examples:
- N+1 queries
- No error monitoring
- Missing input validation

Action: Fix this sprint
```

**Phase 2: Stability (Sprint 2)**
```
Criteria: High severity improvements
Examples:
- Add test coverage
- Optimize performance
- Add caching

Action: Plan for next sprint
```

**Phase 3: Hardening (Sprint 3+)**
```
Criteria: Medium/low severity
Examples:
- Code quality improvements
- Documentation
- Refactoring

Action: Opportunistic fixes
```

---

## 📋 Severity Classification

### Critical 🔴

**Definition:** Immediate risk of data breach, service outage, or exploit

**Examples:**
- SQL injection vulnerability
- Hardcoded API keys or passwords
- Authentication bypass
- Data loss without recovery
- Unencrypted sensitive data

**Action:** Fix before any production deployment

---

### High 🟠

**Definition:** User-facing degradation, data integrity risk, or security weakness

**Examples:**
- N+1 queries causing slow page loads
- Missing input validation
- Rate limiting ineffective
- Background jobs lost on failure
- Weak password hashing

**Action:** Fix within sprint 1

---

### Medium 🟡

**Definition:** Technical debt, future scaling risk, or code quality issue

**Examples:**
- No automated tests
- Component violates single responsibility
- No pagination (works now, won't scale)
- Missing error monitoring
- Tight coupling between modules

**Action:** Plan for sprint 2-3

---

### Low 🔵

**Definition:** Minor inconsistency, style issue, or optimization opportunity

**Examples:**
- Unused imports
- Inconsistent naming
- Missing JSDoc comments
- Suboptimal algorithm (works for current data)
- Code formatting

**Action:** Address opportunistically

---

## 🎯 Finding Format

Each finding includes:

```json
{
  "id": "SEC-001",
  "title": "API endpoint lacks authentication",
  "severity": "critical",
  "file": "app/api/users/[id]/route.ts",
  "lines": "15-22",

  "code_snippet": "...",

  "issue": "Why this is wrong",
  "impact": "What happens if not fixed",

  "recommendation": {
    "action": "Add authentication check",
    "effort": "low",
    "code_example": "..."
  },

  "tags": ["auth", "api", "security"]
}
```

---

## 🏆 Health Score (0-100)

Calculated based on findings:

```
Perfect score: 100 (no findings)

Deductions:
- Each critical: -20 points
- Each high: -10 points
- Each medium: -3 points
- Each low: -1 point

Examples:
- 3 critical, 5 high = 100 - 60 - 50 = Negative → 0/100 (very bad)
- 1 critical, 2 high = 100 - 20 - 20 = 60/100 (needs work)
- 0 critical, 3 high = 100 - 30 = 70/100 (decent)
- 0 critical, 0 high = 80-100/100 (good)
```

**Interpretation:**
- 80-100: Production ready
- 60-79: Fix high-severity issues first
- 40-59: Significant work needed
- 0-39: Serious issues, handle carefully

---

## 💡 What UCOF Does NOT Check

- **Code style** - Use ESLint, Prettier (unless it causes security issues)
- **Code comments** - Use JSDoc (unless missing critical documentation)
- **Variable naming** - Follow your team's conventions
- **Whitespace** - Use formatters, not manual checking
- **Performance micro-optimizations** - Unless causing real problems
- **Design patterns** - Unless causing maintainability problems

---

## 🔄 When to Use UCOF

### Good Times:
- ✅ Before shipping to production
- ✅ When onboarding new developers
- ✅ Before major refactoring
- ✅ Quarterly health checks
- ✅ After acquiring/merging code
- ✅ When performance issues appear

### Not Ideal:
- ❌ For every commit (too much overhead)
- ❌ For code style checking (use ESLint instead)
- ❌ For architectural discussions (use code reviews)
- ❌ Real-time feedback (too slow)

---

## 📈 Iterative Improvement

UCOF works best as a cycle:

```
1. Run analysis → Find issues
2. Fix Phase 0 (critical) → 10-20 minutes
3. Fix Phase 1 (high) → 1-3 days
4. Run analysis again → Health score improves
5. Fix Phase 2 (medium) → 1-2 weeks
6. Run analysis again → Approaching production ready
7. Fix Phase 3 (low) → Ongoing
```

Each cycle improves the codebase and increases health score.

---

## 🎓 Example: From 30 → 80 Health Score

### Starting Point: 30/100
```
Issues found:
- 3 critical (security holes)
- 8 high (missing error handling)
- 15 medium (no tests)
- 10 low (style issues)
```

### After Phase 0 (2 hours)
```
Fix: 3 critical security issues
Result: 30/100 → 40/100
```

### After Phase 1 (2 days)
```
Fix: 8 high-severity issues (error handling, missing auth)
Result: 40/100 → 60/100 (production-ready)
```

### After Phase 2 (1 week)
```
Add: Test coverage, remove N+1 queries
Result: 60/100 → 75/100
```

### After Phase 3 (ongoing)
```
Refactor: Improve code quality, documentation
Result: 75/100 → 85/100+
```

---

## 🚀 Next Steps

- **Understand each domain:** Review sections above
- **Run UCOF:** Analyze your project
- **Review findings:** Read through all issues
- **Prioritize:** Focus on Phase 0, then Phase 1
- **Fix:** Use recommendations as guide
- **Re-analyze:** Check progress, celebrate wins

---

## 📚 More Resources

- [Main README](./README.md) - Choose your version
- [Skill Version](./skill-claude-code/README.md) - Quick analysis
- [CLI Version](./cli-standalone/README.md) - Automation
- [Version Comparison](./VERSIONS.md) - Detailed differences

---

**UCOF is a tool to help you ship better code. Use it regularly! 🚀**
