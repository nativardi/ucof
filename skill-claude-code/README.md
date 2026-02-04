# UCOF Skill Version - Claude Code Setup

> **No API key needed. No installation. Just copy-paste.**

---

## 🚀 Get Started (Choose One)

### Method 1: GitHub URL (Easiest, Recommended)

In Claude Code, just say:

```
Read https://raw.githubusercontent.com/nativardi/ucof/main/skill-claude-code/SKILL.md
Then analyze my project at /path/to/my/project
```

Claude will:
1. Fetch the skill
2. Analyze your project
3. Return findings with severity, evidence, and fixes

**Advantage:** Always uses the latest version. One-liner.

---

### Method 2: Local Installation (Works Offline)

```bash
# Clone once
git clone https://github.com/nativardi/ucof.git ~/.ucof

# Then in Claude Code, say:
"Read ~/.ucof/skill-claude-code/SKILL.md and analyze /path/to/my/project"
```

**Advantage:** Works without internet.

---

### Method 3: Copy-Paste (Most Control)

1. Open [SKILL.md](./SKILL.md)
2. Copy the entire contents
3. Paste into Claude Code
4. Say: "Analyze /path/to/my/project"

**Advantage:** You can edit the skill if needed.

---

## 📊 Sample Usage

### Full Analysis

```
Read https://raw.githubusercontent.com/nativardi/ucof/main/skill-claude-code/SKILL.md
Then analyze /Users/me/my-saas-app
```

### Focused Analysis

```
Read the UCOF skill and analyze /Users/me/my-project focusing only on SECURITY
```

### After Fixes

```
Re-analyze /Users/me/my-project to verify the security fixes I made
```

---

## 📋 What You'll Get

After analysis, Claude returns:

```
# Analysis Summary

Project: my-app
Health Score: 68/100

## Findings by Severity
- 🔴 Critical: 1
- 🟠 High: 3
- 🟡 Medium: 5
- 🔵 Low: 2

## Top 5 Issues to Fix First
1. SEC-001 - Missing authentication check [Low effort]
2. DB-001 - N+1 queries in user listing [Medium effort]
3. PERF-001 - Aggressive polling interval [Low effort]
4. INFRA-001 - No error monitoring [Medium effort]
5. QA-001 - Zero unit tests [High effort]

## Systemic Patterns Detected
- "No Safety Net": Missing CI/CD, no monitoring

## Recommended Next Steps
1. Fix SEC-001 before deployment
2. Add error monitoring (Sentry)
3. Set up basic linting
```

---

## ⚙️ Customization

### Analyze Specific Domains Only

```
Using UCOF, analyze ONLY the security and data domains of /path/to/project
```

### Focus on Specific Issue

```
Using UCOF, deeply analyze /path/to/project focusing on authentication and database queries
```

### Get Fix Code

```
Using UCOF, analyze /path/to/project and provide actual code fixes for critical issues
```

### Check Multiple Projects

```
Read the UCOF skill and analyze:
1. /path/to/project-a
2. /path/to/project-b
3. /path/to/project-c
```

---

## 🎯 Workflow Examples

### Pre-Launch Checklist

```
1. Read https://raw.githubusercontent.com/nativardi/ucof/main/skill-claude-code/SKILL.md

2. Analyze my project at /path/to/my/app for production readiness

3. For each critical finding, help me create a fix PR
```

### Weekly Audit

```
Every Sunday, remind me to:

1. Fetch UCOF skill: Read https://raw.githubusercontent.com/nativardi/ucof/main/skill-claude-code/SKILL.md

2. Analyze /path/to/my/project

3. Compare with last week's findings
```

### Code Review Enhancement

```
1. Load the UCOF skill

2. Analyze this pull request at /path/to/feature-branch

3. Compare with /main branch to highlight new issues introduced
```

---

## ❓ FAQ

### Q: Do I need to install anything?
**A:** No! Just paste the URL or copy-paste the content into Claude Code.

### Q: Does this cost extra?
**A:** No. It uses your existing Claude Code subscription - no separate billing.

### Q: Why do I need to provide the project path?
**A:** So Claude can read and analyze your actual files. Nothing leaves your machine.

### Q: Can I modify the skill?
**A:** Yes! Copy-paste the skill and edit it however you want for your specific needs.

### Q: How is this different from asking Claude directly?
**A:** UCOF is a structured methodology that:
- Covers all 8 domains systematically
- Prioritizes by severity and effort
- Detects systemic patterns
- Provides actionable fixes
- Ensures consistent analysis

### Q: What if my project is very large?
**A:** UCOF will analyze the most important files. For very large projects (1000+ files), consider the CLI version (no context limits).

### Q: Can I save the analysis?
**A:** Yes - copy-paste the results. The CLI version saves to `.optimization/report.md` automatically.

### Q: Does UCOF modify my code?
**A:** No. It only reads files and reports findings. You decide what to fix.

### Q: Which version should I use?
**A:** Start here! Use the Skill version for quick audits. Switch to CLI if you need:
- CI/CD automation
- Analyzing many projects (cost optimization)
- Handling very large codebases

---

## 🛠️ Troubleshooting

### "Claude can't find the file"

**Problem:** Claude says file doesn't exist

**Solution:** Use absolute path:
```
❌ analyze my project at ./my-app
✅ analyze my project at /Users/me/projects/my-app
```

### "Analysis seems incomplete"

**Problem:** Claude skips some domains

**Solution:**
- The project might be very large (context limit)
- Try analyzing specific domain: `analyze focusing only on SECURITY`
- Use CLI version for large projects

### "How do I know if it worked?"

**Success signs:**
- Claude lists findings with file paths and line numbers
- Shows health score (0-100)
- Lists systemic patterns
- Provides fix recommendations

---

## 📚 Learn More

- [Main README](../README.md) - Choose between Skill and CLI versions
- [SKILL.md](./SKILL.md) - The full skill definition (copy-paste this)
- [CLI Version](../cli-standalone/README.md) - For automation and large projects
- [Methodology](../METHODOLOGY.md) - How analysis works

---

## 💡 Pro Tips

**Tip 1:** Save the GitHub URL in your clipboard
```
https://raw.githubusercontent.com/nativardi/ucof/main/skill-claude-code/SKILL.md
```
Then you can quickly analyze any project without looking up the URL.

**Tip 2:** Use in batches
```
Analyze these 3 projects:
1. /path/to/app-a
2. /path/to/app-b
3. /path/to/app-c
```

**Tip 3:** Create a custom skill for your company
Copy the skill and add your internal tools/frameworks to detection patterns.

**Tip 4:** Ask Claude for actionable fixes
```
Based on the analysis above, help me fix the top 3 critical issues
```

---

## 🆘 Need Help?

- **Claude not finding files?** Use absolute paths (`/Users/me/project`, not `./project`)
- **Analysis too slow?** Try analyzing specific domain instead of all 8
- **Want to automate?** Switch to [CLI version](../cli-standalone/README.md)
- **Found a bug?** [Report it](https://github.com/nativardi/ucof/issues)

---

**Ready?** Jump to the [Main README](../README.md) and start analyzing!
