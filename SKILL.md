# Universal Codebase Optimization Orchestrator

## Overview

This skill orchestrates a comprehensive, multi-agent codebase optimization analysis. It coordinates discovery, domain-specific analysis, cross-domain synthesis, and report generation.

## Invocation

Use this skill when the user wants to:
- Analyze a codebase for optimization opportunities
- Perform security/performance/quality audits
- Prepare a codebase for production deployment
- Identify technical debt and architectural issues

## Core Principles

1. **Read-Only First**: Analysis phase makes NO code changes
2. **Evidence-Based**: All findings reference specific files/lines
3. **Severity-Driven**: Prioritize by impact, not discovery order
4. **Cross-Domain Awareness**: Connect related findings
5. **Production Safety**: Never break working code

---

## Phase 1: Discovery

### Step 1.1: Initialize Analysis Context

```yaml
# Create analysis context file
analysis_context:
  project_path: "<USER_PROVIDED_PATH>"
  timestamp: "<ISO_8601_TIMESTAMP>"
  analyst: "UCOF"
  version: "1.0.0"
  status: "discovery"
```

### Step 1.2: Tech Stack Detection

Scan the project root for technology indicators:

```
DETECTION_PATTERNS:
  # Frontend
  - package.json → Check for: react, vue, angular, svelte, next, nuxt
  - tsconfig.json → TypeScript project
  - tailwind.config.* → Tailwind CSS
  - vite.config.* → Vite bundler
  
  # Backend
  - requirements.txt, pyproject.toml, Pipfile → Python
  - go.mod → Go
  - Cargo.toml → Rust
  - pom.xml, build.gradle → Java
  - package.json scripts → Node.js backend
  
  # Database
  - prisma/schema.prisma → Prisma ORM
  - supabase/ directory → Supabase
  - migrations/ directory → Database migrations
  - *.sql files → Raw SQL
  
  # Infrastructure
  - Dockerfile, docker-compose.yml → Docker
  - .github/workflows/ → GitHub Actions
  - .gitlab-ci.yml → GitLab CI
  - railway.toml, vercel.json, netlify.toml → Platform configs
  - terraform/, *.tf → Terraform
  - k8s/, kubernetes/ → Kubernetes
  
  # Testing
  - jest.config.*, vitest.config.* → JS testing
  - pytest.ini, conftest.py → Python testing
  - *_test.go, *_test.py, *.test.ts → Test files
```

### Step 1.3: Generate Project Map

Create a structured map of the codebase:

```yaml
project_map:
  root: "/path/to/project"
  tech_stack:
    frontend: [next.js, react, typescript, tailwind]
    backend: [next.js-api, python]
    database: [supabase, postgresql]
    queue: [redis]
    deployment: [vercel, railway]
  
  structure:
    source_directories:
      - path: "app/"
        type: "frontend"
        framework: "next.js"
        file_count: 45
      - path: "lib/"
        type: "shared"
        file_count: 32
      - path: "recipe-extraction/"
        type: "backend"
        language: "python"
        file_count: 12
    
    config_files:
      - package.json
      - tsconfig.json
      - next.config.js
      - docker-compose.yml
    
    documentation:
      - README.md
      - docs/
    
    test_directories: []  # Empty = no tests found
```

### Step 1.4: Identify Critical Paths

Map the most important code flows:

```yaml
critical_paths:
  - name: "User Authentication"
    entry: "app/(auth)/login/page.tsx"
    touches: ["middleware.ts", "lib/supabase/", "app/api/auth/"]
    
  - name: "Core Feature (varies by project)"
    entry: "<DETECTED_MAIN_FEATURE>"
    touches: ["<RELATED_FILES>"]
```

---

## Phase 2: Domain Analysis

### Model Routing Decision Tree

```
FOR EACH domain_agent:
  complexity = assess_domain_complexity(domain, project_map)
  
  IF complexity == "critical" OR domain IN ["security", "external-pipelines"]:
    model = "opus-4.5"
    
  ELSE IF complexity == "high":
    model = "opus-4.5"
    
  ELSE IF complexity == "medium":
    model = "sonnet-4.5"
    
  ELSE:  # low
    model = "haiku"
```

### Complexity Assessment Criteria

```yaml
complexity_factors:
  critical:
    - Production deployment imminent
    - Handles PII or financial data
    - External AI/ML integrations
    - Multi-service distributed system
    
  high:
    - >50 source files in domain
    - Complex state management
    - Multiple data sources
    - Real-time requirements
    
  medium:
    - 20-50 source files
    - Standard CRUD operations
    - Single database
    - Synchronous processing
    
  low:
    - <20 source files
    - Simple utilities
    - Static content
    - No external dependencies
```

### Agent Dispatch Order

```
PARALLEL_BATCH_1 (Can run simultaneously):
  - Agent 1: Frontend Architecture
  - Agent 2: Backend API
  - Agent 3: Data Layer
  - Agent 4: External Services

PARALLEL_BATCH_2 (After batch 1, needs context):
  - Agent 5: Security (needs API + Data findings)
  - Agent 6: Infrastructure
  - Agent 7: Performance (needs all technical findings)
  - Agent 8: Quality Assurance
```

### Agent Invocation Template

For each agent, provide:

```yaml
agent_context:
  domain: "<DOMAIN_NAME>"
  model: "<SELECTED_MODEL>"
  
  scope:
    include_paths: ["<PATH_1>", "<PATH_2>"]
    exclude_paths: ["node_modules/", "dist/", ".git/"]
    file_patterns: ["*.ts", "*.tsx", "*.py"]
  
  tech_context:
    framework: "<DETECTED_FRAMEWORK>"
    language: "<PRIMARY_LANGUAGE>"
    related_tech: ["<TECH_1>", "<TECH_2>"]
  
  investigation_questions:
    - "<DOMAIN_SPECIFIC_QUESTION_1>"
    - "<DOMAIN_SPECIFIC_QUESTION_2>"
  
  output_requirements:
    finding_prefix: "<DOMAIN_PREFIX>"  # FE-, API-, DB-, etc.
    min_findings: 8
    max_findings: 20
    required_fields:
      - id
      - title
      - severity
      - evidence
      - file_location
      - recommendation
```

---

## Phase 3: Finding Aggregation

### Standard Finding Schema

Every finding MUST conform to this schema:

```json
{
  "id": "SEC-001",
  "domain": "security",
  "title": "Unauthenticated API endpoint allows data enumeration",
  "severity": "critical",
  "cvss_estimate": 7.5,
  
  "evidence": {
    "file": "app/api/recipes/[id]/status/route.ts",
    "lines": "20-26",
    "code_snippet": "// No auth check before returning recipe status",
    "reproduction": "curl https://app.com/api/recipes/123/status"
  },
  
  "impact": {
    "description": "Attackers can enumerate all recipe IDs and access processing status",
    "affected_users": "all",
    "data_at_risk": ["recipe_ids", "processing_status"]
  },
  
  "recommendation": {
    "action": "Add authentication check using getUser() before returning status",
    "effort": "low",
    "breaking_change": false,
    "code_example": "const { data: { user } } = await supabase.auth.getUser();\nif (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });"
  },
  
  "cross_references": ["API-003", "DB-007"],
  "tags": ["auth", "api", "idor"]
}
```

### Severity Classification Rubric

```yaml
severity_rubric:
  critical:
    definition: "Immediate risk of data breach, service outage, or security exploit"
    examples:
      - SQL injection vulnerability
      - Exposed secrets in code
      - Authentication bypass
      - Data loss without recovery
    action: "Fix before any production deployment"
    
  high:
    definition: "User-facing degradation, data integrity risk, or security weakness"
    examples:
      - N+1 query causing slow page loads
      - Missing input validation
      - Rate limiting ineffective
      - Jobs lost on failure
    action: "Fix within sprint 1"
    
  medium:
    definition: "Technical debt, future scaling risk, or code quality issue"
    examples:
      - No automated tests
      - Component violates SRP
      - No pagination (works now, won't scale)
      - Missing error monitoring
    action: "Plan for sprint 2-3"
    
  low:
    definition: "Minor inconsistency, style issue, or optimization opportunity"
    examples:
      - Unused imports
      - Inconsistent naming
      - Missing JSDoc comments
      - Suboptimal algorithm (small data)
    action: "Address opportunistically"
```

### Deduplication Rules

```
FOR EACH new_finding:
  existing = findings.filter(f => 
    f.file == new_finding.file AND
    f.lines overlaps new_finding.lines
  )
  
  IF existing.length > 0:
    IF new_finding.severity > existing[0].severity:
      REPLACE existing[0] with new_finding
    ELSE:
      ADD cross_reference(existing[0], new_finding)
      DISCARD new_finding
```

---

## Phase 4: Cross-Domain Synthesis

### Systemic Pattern Detection

Look for these cross-cutting themes:

```yaml
systemic_patterns:
  no_safety_net:
    indicators:
      - QA: Zero test coverage
      - INFRA: No CI/CD pipeline
      - QA: No error monitoring
    synthesis: "No mechanism to detect issues before users do"
    
  happy_path_only:
    indicators:
      - EXT: No retry logic
      - API: Fire-and-forget operations
      - DB: No transaction rollbacks
    synthesis: "System assumes all operations succeed"
    
  client_heavy:
    indicators:
      - FE: >80% client components
      - FE: Client-side data filtering
      - PERF: Large bundle size
    synthesis: "Server capabilities underutilized"
    
  scale_cliff:
    indicators:
      - DB: N+1 queries
      - API: No pagination
      - FE: No virtualization
      - PERF: Polling intervals
    synthesis: "Linear growth causes exponential degradation"
```

### Dependency Graph Generation

```
FOR EACH finding_pair (A, B):
  IF A.recommendation requires B.recommendation to be done first:
    ADD dependency_edge(A, B)
    
  IF A.file_location imports B.file_location:
    ADD code_dependency(A, B)
    
  IF A.tags intersects B.tags:
    ADD thematic_link(A, B)
```

---

## Phase 5: Execution Planning

### Phase Sequencing Template

```yaml
execution_phases:
  phase_0_immediate:
    name: "Critical Blockers"
    criteria: "severity == critical AND effort == low"
    timing: "Before any production traffic"
    findings: ["<AUTO_POPULATED>"]
    
  phase_1_foundation:
    name: "Critical Path"
    criteria: "severity == critical OR (severity == high AND blocks_other_work)"
    timing: "Sprint 1"
    dependencies: ["phase_0_immediate"]
    findings: ["<AUTO_POPULATED>"]
    
  phase_2_stability:
    name: "Stability & Reliability"
    criteria: "severity == high AND improves_reliability"
    timing: "Sprint 2"
    dependencies: ["phase_1_foundation"]
    findings: ["<AUTO_POPULATED>"]
    
  phase_3_hardening:
    name: "Hardening & Polish"
    criteria: "severity IN [medium, low]"
    timing: "Sprint 3+"
    dependencies: ["phase_2_stability"]
    findings: ["<AUTO_POPULATED>"]
```

### Constraint Resolution

```
constraints:
  - ESLint config BEFORE pre-commit hooks
  - N+1 fix BEFORE pagination (query pattern changes first)
  - Error monitoring BEFORE integration tests (need baseline)
  - CI pipeline BEFORE branch protection
  - Database migrations BEFORE application code changes
```

---

## Output Formats

### Executive Summary (for stakeholders)

```markdown
# Codebase Optimization Report: [PROJECT_NAME]

## Health Score: [X/100]

### Critical Issues: [N]
- [ISSUE_1_TITLE]
- [ISSUE_2_TITLE]

### Risk Areas
| Domain | Score | Status |
|--------|-------|--------|
| Security | X/10 | 🔴 |
| Performance | X/10 | 🟡 |
| Quality | X/10 | 🔴 |

### Recommended Timeline
- Immediate: [N] fixes before launch
- Sprint 1: [N] critical path items
- Sprint 2+: [N] stability improvements
```

### Technical Report (for developers)

Full finding catalog with:
- All findings by domain
- Code snippets and line references
- Dependency graph visualization
- Execution sequence with commands

### Machine-Readable Output

```json
{
  "analysis": {
    "project": "project-name",
    "timestamp": "ISO8601",
    "version": "1.0.0"
  },
  "summary": {
    "total_findings": 95,
    "by_severity": {
      "critical": 12,
      "high": 28,
      "medium": 35,
      "low": 20
    }
  },
  "findings": [/* array of finding objects */],
  "systemic_patterns": [/* array of pattern objects */],
  "execution_plan": {/* phased plan object */}
}
```

---

## Usage Examples

### Full Analysis

```
User: Analyze /path/to/my/project for production readiness

Claude: I'll run the Universal Codebase Optimization Framework.

[Invokes discovery skill]
[Dispatches domain agents based on complexity]
[Aggregates findings]
[Generates cross-domain synthesis]
[Produces execution plan]

Here's your optimization report...
```

### Domain-Specific Analysis

```
User: Just check the security of my API routes

Claude: Running security-focused analysis...

[Invokes security agent only with elevated model]
[References other domains for context but doesn't deep-analyze]

Here are the security findings...
```

### Incremental Re-Analysis

```
User: I fixed the N+1 queries, re-check performance

Claude: Re-running performance analysis...

[Marks previous findings as "resolved" or "pending verification"]
[Runs targeted performance analysis]
[Updates execution plan]
```

---

## Integration with Claude Code

This skill is designed to work with Claude Code. Key integration points:

1. **File System Access**: Uses standard file reading tools
2. **Code Analysis**: Can run `tsc --noEmit`, `npm run lint`, etc.
3. **Finding Persistence**: Stores findings in project's `.optimization/` directory
4. **Progress Tracking**: Updates status in analysis context file

## Extending the Framework

To add new domains or tech stack support:

1. Create new skill in `skills/domains/[domain]/SKILL.md`
2. Add detection patterns to `config/tech-patterns.yaml`
3. Update orchestrator's agent dispatch list
4. Add domain-specific questions to the investigation template
