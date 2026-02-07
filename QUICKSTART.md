# UCOF Quick Start Guide

> **Analyze your codebase in 3-5 minutes with parallel AI agents**

---

## 🎯 Choose Your Path

### Path A: Instant Analysis (Recommended)

**In Claude Code, paste this ONE line:**

```
Read https://raw.githubusercontent.com/nativardi/ucof/main/SKILL.md and analyze /path/to/my/project
```

**What happens:**
- ✅ Parallel analysis across 8 domains (Security, Data, Backend, External, Frontend, Infrastructure, Performance, Quality)
- ✅ Intelligent model routing (Haiku for discovery, Sonnet for standard, Opus for critical)
- ✅ Complete report with prioritized findings in 3-5 minutes
- ✅ Free (uses your Claude subscription)

**Total time:** 30 seconds setup + 3-5 minutes analysis = **< 6 minutes** ✅

---

### Path B: I Want to Automate Analysis (CI/CD)

```bash
# 1. Clone and install (one time)
git clone https://github.com/nativardi/ucof.git ~/ucof-cli && \
cd ~/ucof-cli/cli-standalone && \
npm install

# 2. Get free API key: https://console.anthropic.com/account/keys

# 3. Set API key
export ANTHROPIC_API_KEY="sk-ant-..."

# 4. Analyze!
~/ucof-cli/cli-standalone/ucof.js analyze /path/to/your/project

# Results: /path/to/your/project/.optimization/report.md
```

**Time:** 3 minutes setup + 3 minutes analysis = **6 minutes total** ✅

---

## 📊 See Your Results

### Path A (Claude Code Skill)
Results appear directly in Claude Code chat - copy and save them!

### Path B (CLI)
```bash
# View the report
cat ~/my-app/.optimization/report.md

# View detailed findings
cat ~/my-app/.optimization/synthesis.json
```

---

## 🎯 What You'll Get

```
# Analysis Summary

Project: my-saas-app
Health Score: 65/100

## Findings by Severity
- 🔴 Critical: 1
- 🟠 High: 4
- 🟡 Medium: 8
- 🔵 Low: 2

## Top 5 Issues
1. SEC-001 - Missing auth check [Low effort]
2. DB-001 - N+1 queries [Medium effort]
3. PERF-001 - Polling too fast [Low effort]
4. INFRA-001 - No monitoring [Medium effort]
5. QA-001 - No tests [High effort]

## Patterns Detected
- "No Safety Net": No tests, no CI/CD, no monitoring
- "Happy Path Only": Missing error handling

## Next Steps
1. Fix SEC-001 before any deployment
2. Add error monitoring (Sentry)
3. Optimize N+1 queries
```

---

## ✅ Next Steps

### 1. Review Findings (5 minutes)
```
Read the analysis report
Pick out the critical issues (🔴 red)
```

### 2. Fix Phase 0 (Quick Wins)
```
Focus on critical + low effort issues
Should take 30 minutes - 2 hours
This gets you to "safe to deploy"
```

### 3. Re-analyze (Optional)
```
After fixes, run analysis again
See health score improve
Celebrate progress! 🎉
```

### 4. Plan Long-term Fixes
```
Create PRs for Phase 1 issues (high severity)
Schedule Phase 2 (medium) for later
Phase 3 (low) as you go
```

---

## 🤔 Which Path Should I Use?

| Situation | Path |
|-----------|------|
| "I want to try this now" | **A** |
| "I want to automate this" | **B** |
| "I don't have an API key" | **A** |
| "I analyze many projects" | **B** |
| "I'm in a team" | **B** |
| "I want offline capability" | **A** |

---

## 💡 Pro Tips

**Tip 1: Save the URL**
```
Bookmark this for future use:
https://raw.githubusercontent.com/nativardi/ucof/main/skill-claude-code/SKILL.md
```

**Tip 2: Analyze specific domains**
```
"Analyze focusing only on SECURITY issues"
"Check DATA layer for N+1 queries"
"Find PERFORMANCE bottlenecks"
```

**Tip 3: Ask for fixes**
```
"Based on the analysis, show me how to fix the top 3 issues"
Claude can provide actual code!
```

**Tip 4: Regular audits**
```
Weekly: Quick skill version analysis
Monthly: Deep CLI version analysis with all domains
```

---

## ❓ Stuck?

### Path A Issues?
- "Claude can't find my files" → Use absolute path: `/Users/me/my-app` not `./my-app`
- "Analysis seems incomplete" → Project too large? Try analyzing 1 domain at a time

### Path B Issues?
- "Command not found" → Use full path: `~/ucof-cli/cli-standalone/ucof.js analyze /path`
- "API key not found" → Did you set it? Run: `echo $ANTHROPIC_API_KEY`

→ Full troubleshooting: [Skill Docs](./skill-claude-code/README.md#troubleshooting) | [CLI Docs](./cli-standalone/README.md#troubleshooting)

---

## 📚 Learn More

- **Main Overview** → [README.md](./README.md)
- **Version Details** → [VERSIONS.md](./VERSIONS.md)
- **How Analysis Works** → [METHODOLOGY.md](./METHODOLOGY.md)
- **Skill Setup** → [skill-claude-code/README.md](./skill-claude-code/README.md)
- **CLI Setup** → [cli-standalone/README.md](./cli-standalone/README.md)

---

## 🚀 You're Ready!

Pick Path A or B above and **start analyzing in under 3 minutes!**

When you're done, post your health score to celebrate. 🎉

---

**Questions?** See the full documentation or open an issue on GitHub.
