# Universal Codebase Optimization - Claude Code Prompt

Use this prompt to initiate a comprehensive codebase optimization analysis with Claude Code.

---

## Quick Start Prompt

Copy and paste this into Claude Code:

```
I need you to perform a comprehensive codebase optimization analysis using the Universal Codebase Optimization Framework (UCOF).

## Project Path
[INSERT YOUR PROJECT PATH HERE]

## Analysis Goals
- Identify all optimization opportunities, risks, and architectural concerns
- This is a pre-production review (adjust if already in production)
- Focus on: security, performance, reliability, and maintainability

## Constraints
- DO NOT make any code changes during analysis phase
- Produce findings only
- Evidence-based: every finding must reference specific files and lines
- Severity-driven: prioritize by impact

## Framework Reference
Follow the UCOF methodology:
1. Discovery - Detect tech stack and map structure
2. Domain Analysis - Run 8 parallel domain agents
3. Synthesis - Identify systemic patterns and dependencies
4. Execution Planning - Create phased remediation plan

## Model Routing
- Security & External Pipelines: Use highest capability (Opus-level thinking)
- Standard Domains: Normal analysis depth
- Simple Tasks: Quick pattern matching

## Output Requirements
1. Executive Summary (for stakeholders)
2. Technical Report (for developers)
3. Prioritized Findings Catalog
4. Phased Execution Plan

Begin with discovery phase.
```

---

## Detailed Prompt (For Complex Projects)

```
# Comprehensive Codebase Optimization Analysis

## Context
I'm preparing [PROJECT_NAME] for production deployment and need a thorough optimization audit. This is a [BRIEF_DESCRIPTION: e.g., "Next.js SaaS with AI-powered recipe extraction"].

## Project Details
- **Path**: [PROJECT_PATH]
- **Tech Stack**: [LIST_KNOWN_TECH: e.g., "Next.js 14, Supabase, Python worker, Redis queue"]
- **Current State**: [pre-production / production with issues / scaling concerns]
- **Team Size**: [solo / small team / large team]
- **Timeline Pressure**: [urgent / normal / can take time]

## Analysis Scope

### Must Analyze (Critical)
- [ ] Security vulnerabilities and auth gaps
- [ ] Data integrity and database patterns
- [ ] External service reliability (AI, queues, APIs)
- [ ] Error handling and failure modes

### Should Analyze (Important)
- [ ] Performance bottlenecks
- [ ] Scalability limits
- [ ] CI/CD and deployment safety
- [ ] Test coverage gaps

### Nice to Analyze (If Time)
- [ ] Code quality and maintainability
- [ ] Documentation gaps
- [ ] Accessibility
- [ ] Bundle optimization

## Known Issues
List any issues you're already aware of:
1. [KNOWN_ISSUE_1]
2. [KNOWN_ISSUE_2]

## Special Concerns
Any specific areas you want extra attention on:
- [CONCERN_1: e.g., "The recipe extraction worker seems to lose jobs sometimes"]
- [CONCERN_2: e.g., "Page loads are slow with many recipes"]

## Output Preferences

### Report Format
- [ ] Markdown report
- [ ] JSON findings catalog
- [ ] Both

### Severity Threshold
Include findings of severity:
- [x] Critical (always)
- [x] High (always)
- [ ] Medium (include / skip)
- [ ] Low (include / skip)

### Execution Plan Detail
- [ ] High-level phases only
- [x] Detailed with specific fixes
- [ ] Include code examples for fixes

## Process Instructions

1. **Discovery Phase**
   - Detect all technologies
   - Map directory structure
   - Identify critical files
   - Flag immediate quality indicators

2. **Domain Analysis**
   Use appropriate depth for each domain:
   - Security: THOROUGH (use Opus-level thinking)
   - External Services: THOROUGH
   - Data Layer: THOROUGH
   - Backend API: STANDARD
   - Frontend: STANDARD
   - Infrastructure: STANDARD
   - Performance: STANDARD
   - Quality: QUICK

3. **Synthesis**
   - Identify systemic patterns (not just individual issues)
   - Build dependency graph between findings
   - Create phased execution plan

4. **Reporting**
   - Start with executive summary
   - Provide detailed technical findings
   - End with actionable next steps

## Begin Analysis
Start with the discovery phase. Map the project structure and identify the tech stack before diving into domain analysis.
```

---

## Domain-Specific Prompts

### Security-Focused Analysis

```
Perform a security-focused analysis of [PROJECT_PATH].

Focus areas:
1. Authentication & Authorization
   - Are all protected routes properly authenticated?
   - Can users access resources they don't own?
   - Are there any IDOR vulnerabilities?

2. Input Validation
   - Is user input validated before database queries?
   - Are there potential XSS vulnerabilities?
   - Is file upload (if any) properly sanitized?

3. Secrets Management
   - Are there any hardcoded secrets?
   - Are server secrets exposed to the client?
   - Is the .env file properly gitignored?

4. API Security
   - Are rate limits implemented?
   - Are CORS settings appropriate?
   - Do error responses leak sensitive info?

Output: Security findings with CVSS estimates and prioritized remediation steps.
```

### Performance-Focused Analysis

```
Perform a performance analysis of [PROJECT_PATH].

Focus areas:
1. Database Performance
   - Identify N+1 query patterns
   - Check for missing indexes
   - Analyze query counts per page load

2. Frontend Performance
   - Estimate bundle size
   - Check for unnecessary client components
   - Identify render performance issues

3. API Performance
   - Check for unbounded queries
   - Analyze response payload sizes
   - Identify slow endpoints

4. Scalability
   - Project breaking points for key metrics
   - Identify non-linear scaling patterns
   - Recommend scaling strategies

Output: Performance findings with quantitative analysis and scaling projections.
```

---

## Follow-Up Prompts

### After Initial Analysis

```
Based on the findings, let's deep-dive into [SPECIFIC_AREA].

Questions:
1. What is the exact fix for [FINDING_ID]?
2. Will fixing [FINDING_A] affect [FINDING_B]?
3. What's the minimum viable fix vs the ideal fix?
```

### For Execution Planning

```
Create a detailed execution plan for the findings.

Constraints:
- Sprint length: [X weeks]
- Available dev hours: [X hours/week]
- Can we make breaking changes? [yes/no]
- Priority: [security first / performance first / balanced]

Include:
- Specific PRs to create
- Order of operations
- Dependencies between fixes
- Estimated time per fix
```

### For Verification

```
Verify that [FINDING_ID] has been properly fixed.

Check:
1. Is the fix in place at [FILE:LINE]?
2. Does the fix fully address the issue?
3. Are there any regressions?
4. Should any related findings be marked resolved?
```

---

## Tips for Best Results

1. **Start with Discovery**: Always let Claude map the project first
2. **Be Specific**: Mention known issues and concerns upfront
3. **Set Priorities**: Indicate which domains matter most
4. **Iterate**: Use follow-up prompts to dive deeper
5. **Verify**: Always verify fixes were implemented correctly
