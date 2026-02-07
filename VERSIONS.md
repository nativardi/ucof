# UCOF Versions - Detailed Comparison

> **Two ways to use UCOF - choose what fits your needs.**

---

## 🎯 Quick Reference Table

| Aspect | Skill Version | CLI Version |
|--------|---------------|-------------|
| **Setup Time** | 2 min | 3 min |
| **API Key Required** | ❌ No | ✅ Yes (~$5 free) |
| **Cost per Run** | Free | ~$0.50 |
| **Installation** | None | npm install |
| **Access** | GitHub URL or copy-paste | Terminal command |
| **Model Selection** | ✅ Optimized (Haiku/Sonnet/Opus) | ✅ Optimized (Haiku/Sonnet/Opus) |
| **Parallel Analysis** | ✅ Yes (3-5 min) | ✅ Yes (1-3 min) |
| **Large Projects** | Context limits | No limits |
| **CI/CD Ready** | Scriptable | ✅ Full automation |
| **Automation** | Manual | Full support |
| **Team Usage** | Per-person | Shared config |
| **Offline Mode** | ✅ Local clone | ❌ No |
| **Best For** | Quick audits, individual devs | Teams, automation, large projects |

---

## 🆚 Detailed Comparison

### 1. Installation

#### Skill Version
```
✅ Super simple:
- Option A: Just paste URL in Claude Code
- Option B: Local git clone (works offline)
- Option C: Copy-paste the skill file

⏱️  Time: 30 seconds to 2 minutes
```

#### CLI Version
```
✅ Standard Node.js install:
- Clone repo
- npm install
- Set environment variable

⏱️ Time: 3 minutes
```

**Winner:** Skill (easier setup)

---

### 2. Cost

#### Skill Version
```
💚 FREE
- Uses your Claude Code subscription
- No additional charges
- No API key to manage
- Unlimited analyses

📊 Real cost: $0 per analysis
```

#### CLI Version
```
💳 Pay-as-you-go
- ~$0.50 per analysis
- You get $5 free credits (≈10 analyses)
- Cheaper for large organizations
- Predictable costs

📊 Real cost: $0.50 per analysis
```

**Winner:** Skill (free), but CLI wins for high volume

---

### 3. Model Selection & Power

#### Skill Version
```
Intelligent routing (optimized):
- Discovery: Haiku (fast mapping)
- Security & External: Opus (critical domains)
- Data/Backend/Frontend/Infrastructure/Performance/Quality: Sonnet
- Synthesis: Opus (cross-domain pattern detection)

✅ Pros:
- Automatic model optimization
- Free (uses Claude subscription)
- No API key needed
- Same intelligence as CLI

❌ Cons:
- Uses Claude Code quota
- Large projects may hit context limits
```

#### CLI Version
```
Intelligent routing (identical to Skill):
- Discovery: Haiku (cheap, fast)
- Security & External: Opus (critical)
- Data/Backend/Frontend/Infrastructure/Performance/Quality: Sonnet
- Synthesis: Opus (cross-domain pattern detection)

✅ Pros:
- Same model intelligence as Skill
- Independent context per domain (no limits)
- Can run in CI/CD
- Predictable costs

❌ Cons:
- Costs ~$0.50 per analysis
- Requires API key
```

**Winner:** Tie for intelligence, Skill wins on cost, CLI wins on scale

---

### 4. Analysis Speed

#### Skill Version
```
Parallel analysis: 3-5 minutes total

Flow:
1. Discovery (Haiku - fast)
2. Batch 1 (parallel): Security + External (Opus)
3. Batch 2 (parallel): Data + Backend (Sonnet)
4. Batch 3 (parallel): Frontend + Infrastructure + Performance + Quality (Sonnet)
5. Synthesis (Opus)
6. Report

⏰ Typical timeline:
- Small project: 3 min
- Medium project: 4 min
- Large project: 5 min

Speedup: Parallel domains within Claude Code session
```

#### CLI Version
```
Parallel analysis: 1-3 minutes total

Flow:
1. Discovery (Haiku)
2. All domains in parallel (Security/External=Opus, others=Sonnet)
3. Synthesis (Opus)
4. Report

⏰ Typical timeline:
- Small project: 1 min
- Medium project: 2 min
- Large project: 3 min

Speedup: Full parallel + independent API calls
```

**Winner:** CLI (slightly faster due to fully independent parallel execution)

---

### 5. Project Size Limits

#### Skill Version
```
Claude's context window: ~200K tokens

Typical limits:
- Small project: ✅ No problem (< 500 files)
- Medium project: ✅ Works (500-2000 files)
- Large project: ⚠️  May hit limits (> 2000 files)

When to worry:
- 1000+ source files
- Very large monorepo
- Multiple languages

Workaround: Analyze specific domains or subdirectories
```

#### CLI Version
```
Fresh context per domain: No practical limits

Each domain gets:
- 200K token context window
- Only files relevant to that domain

Can handle:
- ✅ 10,000+ file projects
- ✅ Complex monorepos
- ✅ Multiple languages
- ✅ Microservices architecture
```

**Winner:** CLI (no practical limits)

---

### 6. Use Cases

#### Skill Version - Perfect For

✅ **One-time audits**
```
"I want a quick security check"
→ Paste URL, get report in 3 minutes
```

✅ **Learning & exploration**
```
"Let me understand what UCOF does"
→ Try locally, no API key needed
```

✅ **Individual developers**
```
"I want to audit my personal projects"
→ Free, simple, effective
```

✅ **Small to medium projects**
```
"My app is < 1000 files"
→ Works perfectly
```

✅ **Quick before deployment**
```
"I'm shipping tomorrow, find critical issues"
→ 5 minute audit
```

#### CLI Version - Perfect For

✅ **Team automation**
```
"We want analysis on every PR"
→ GitHub Actions integration
→ Automated quality gates
```

✅ **Large codebases**
```
"Our monorepo has 5000+ files"
→ CLI handles it without limits
```

✅ **Cost optimization**
```
"We analyze 20 projects/month"
→ Cost: $10 vs free for Skill
→ But parallel analysis is worth it
```

✅ **CI/CD pipelines**
```
"Integrate analysis into our workflow"
→ Full automation, status checks
```

✅ **Enterprise deployments**
```
"We need reliable, repeatable analysis"
→ Consistent model routing
→ API key management
→ Audit logs
```

✅ **Performance critical**
```
"Analysis takes too long"
→ Parallel domains = 60% faster
```

---

### 7. Integration Examples

#### Skill Version

```
# In Claude Code, simple one-liner:
"Read https://raw.githubusercontent.com/nativardi/ucof/main/SKILL.md
and analyze /path/to/my/project"

# Can also do:
"Analyze /Users/me/projects/app-a, app-b, and app-c"
```

#### CLI Version

```bash
# Terminal command:
ucof analyze /path/to/my/project

# Pipe to CI/CD:
if ucof analyze . | grep -q "critical"; then exit 1; fi

# GitHub Actions:
- name: Analyze Code
  run: ucof analyze .

# Cron job (weekly analysis):
0 0 * * 0 cd ~/my-app && ucof analyze . >> analysis.log
```

**Winner:** Skill (simpler for ad-hoc), CLI (better for automation)

---

### 8. Offline Capability

#### Skill Version
```
✅ Can work offline!

Option 1: Clone locally
- git clone https://github.com/nativardi/ucof.git ~/ucof
- Claude Code can read local files
- No internet needed after setup

Option 2: Copy-paste
- Save SKILL.md locally
- Paste whenever needed
- Pure offline
```

#### CLI Version
```
❌ Requires internet
- Must call Anthropic API
- Offline analysis not possible
- But: Can cache discovery with --skip-discovery
```

**Winner:** Skill (works offline)

---

### 9. Data Privacy

#### Skill Version
```
✅ Claude Code processes locally
- Files stay on your machine
- Only used for that analysis
- No additional logging
- Standard Claude privacy

Data sent to Anthropic:
- Your code (for analysis)
- Nothing stored permanently
```

#### CLI Version
```
✅ Same privacy model
- Files stay on your machine
- Only used for analysis
- No persistent storage
- Standard Claude API privacy

Data sent to Anthropic:
- Your code (for analysis)
- API logs (temporary)
```

**Winner:** Tie (both respect privacy)

---

### 10. Customization

#### Skill Version
```
✅ Easy to customize
- Copy the SKILL.md file
- Edit the methodology
- Add your own checks
- Share custom version

Examples:
- Add framework-specific rules
- Adjust severity levels
- Focus on security only
- Add internal tool checks
```

#### CLI Version
```
⚠️  Harder to customize
- Modify ucof.js
- Requires JavaScript knowledge
- More complex codebase
- Changes require npm rebuild

More powerful:
- Can add new domains
- Create new output formats
- Hook into CI/CD systems
```

**Winner:** Skill (easier customization)

---

## 🤔 How to Choose?

### Use Skill Version If:
- ✅ You want the simplest setup
- ✅ You don't have an API key
- ✅ You analyze projects occasionally
- ✅ Your projects are < 1000 files
- ✅ You're exploring UCOF
- ✅ You want offline capability

### Use CLI Version If:
- ✅ You need CI/CD automation
- ✅ You analyze many projects
- ✅ You have very large projects
- ✅ You want faster analysis (parallel)
- ✅ You're in an organization
- ✅ You need consistent, repeatable results

---

## 🔄 Migration Guide

### Starting with Skill, Want to Switch to CLI?

```bash
# 1. Get API key at https://console.anthropic.com/
# 2. Follow CLI setup: ~/ucof-cli/cli-standalone/
# 3. Run: ucof analyze /path/to/project
# 4. Results are identical, just from .optimization/report.md
```

### Starting with CLI, Want to Use Skill?

```
# 1. In Claude Code, paste:
"Read ~/ucof/SKILL.md
and analyze /path/to/my/project"

# 2. Results in Claude's response instead of file
```

### Running Both (Why Not?)

```
# Local development: Use Skill (quick, free)
# Pre-production: Use CLI (comprehensive, parallel)
# CI/CD: Use CLI (automated)
```

---

## 💰 Cost Analysis

### Scenario 1: Individual Developer (5 projects/year)

```
Skill Version:
- Cost: $0
- Setup: 2 min
- Total time per analysis: 3-5 min
- Total yearly: ~15-25 minutes

CLI Version:
- Cost: $2.50 (5 × $0.50)
- Setup: 3 min
- Total time per analysis: 1-3 min
- Total yearly: ~5-15 minutes

Winner: Skill (free, nearly same speed for small projects)
```

### Scenario 2: Team (100 analyses/year)

```
Skill Version:
- Cost: $0
- Manual copy-paste: inefficient
- Automation: impossible
- Team friction: high (no shared setup)

CLI Version:
- Cost: $50 (100 × $0.50)
- CI/CD automation: included
- Reproducible: guaranteed
- Team efficiency: high

Winner: CLI (enables automation, scales)
```

### Scenario 3: Large Project (1 analysis)

```
Skill Version:
- Cost: Free
- Risk: May hit context limits
- Likely outcome: Incomplete analysis

CLI Version:
- Cost: $0.50
- Risk: None (parallel, no limits)
- Likely outcome: Complete analysis

Winner: CLI (actually completes the job)
```

---

## 🎓 Learning Path

### Week 1: Explore with Skill
```
- Try Skill Version (quick, free)
- Understand what UCOF finds
- Get comfortable with methodology
```

### Week 2: Evaluate CLI
```
- Read CLI docs
- Get free Anthropic API credits
- Compare results with CLI version
```

### Week 3+: Choose & Use
```
- Pick one or both based on use cases
- Set up automation if needed
- Run regular analyses
```

---

## 📊 Summary Table

| Metric | Skill | CLI | Winner |
|--------|-------|-----|--------|
| Easiest setup | ✅✅✅ | ✅✅ | Skill |
| Cheapest | ✅ Free | 💳 $0.50 | Skill |
| Fastest | ⏱️ 3-5 min | ⚡ 1-3 min | CLI |
| Best for large projects | ⚠️ Limits | ✅✅ | CLI |
| Automation ready | ❌ No | ✅✅ | CLI |
| Customizable | ✅✅ | ✅ | Skill |
| Offline capable | ✅ | ❌ | Skill |
| Enterprise ready | ⚠️ | ✅✅ | CLI |

---

## 🚀 Next Steps

1. **Decide:** Use the decision matrix above
2. **Setup:** Follow instructions for your chosen version
3. **Run:** Analyze your first project
4. **Compare:** If curious, try both to see differences
5. **Integrate:** Set up automation if you chose CLI

---

**Questions? See the README for each version or open an issue!**
