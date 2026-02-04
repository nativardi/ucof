# UCOF CLI - Standalone Installation

> **Powerful, cost-optimized analysis. Perfect for automation and teams.**

---

## ⚡ Quick Start (3 Steps, 3 Minutes)

### Step 1️⃣ Clone & Install

```bash
# Copy this entire block and run it:
git clone https://github.com/nativardi/ucof.git ~/ucof-cli && \
cd ~/ucof-cli/cli-standalone && \
npm install

echo "✅ Installation complete!"
```

**What it does:**
- Downloads UCOF to your home directory
- Installs Node.js dependencies
- Ready to use

---

### Step 2️⃣ Get Your Free API Key

Visit: **https://console.anthropic.com/account/keys**

(You get $5 free credits - enough for ~10 analyses)

---

### Step 3️⃣ Set Your API Key

```bash
# Choose ONE:

# Option A: Temporary (current terminal session only)
export ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Option B: Permanent (add to ~/.zshrc or ~/.bashrc)
echo 'export ANTHROPIC_API_KEY="sk-ant-your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

**Verify it worked:**
```bash
echo $ANTHROPIC_API_KEY
# Should show: sk-ant-...
```

---

## 🚀 Analyze Your Project

```bash
# From anywhere on your system:
~/ucof-cli/cli-standalone/ucof.js analyze /path/to/your/project
```

**Example:**
```bash
~/ucof-cli/cli-standalone/ucof.js analyze ~/my-app
# Output: my-app/.optimization/report.md
```

---

## 📊 Check Your Results

```bash
# View the report
cat ~/my-app/.optimization/report.md

# View full JSON findings
cat ~/my-app/.optimization/synthesis.json
```

---

## 🛠️ Make It Easier (Optional Setup)

### Create an Alias

Add this to your shell config (`~/.zshrc` or `~/.bashrc`):

```bash
alias ucof='~/ucof-cli/cli-standalone/ucof.js'
```

Then reload:
```bash
source ~/.zshrc
```

Now you can just say:
```bash
ucof analyze /path/to/my/project
```

---

### Global Command (If You Want)

```bash
cd ~/ucof-cli/cli-standalone
npm link

# Now you can use 'ucof' from anywhere:
ucof analyze /path/to/project
```

To uninstall: `npm unlink -g ucof`

---

## 📋 CLI Commands

```bash
# Full analysis (creates .optimization/ folder)
ucof analyze /path/to/project

# View existing report
ucof report /path/to/project

# Start fixing issues in new session
ucof fix /path/to/project

# Re-analyze with cached discovery (faster)
ucof analyze /path/to/project --skip-discovery

# Show help
ucof --help
```

---

## 💾 Output Files

After `ucof analyze`, your project gets a `.optimization/` folder:

```
your-project/
└── .optimization/
    ├── report.md              # Human-readable summary (START HERE)
    ├── synthesis.json         # Full analysis with patterns
    ├── all-findings.json      # Raw findings from all domains
    ├── discovery.json         # Tech stack detection
    └── [domain]-findings.json # Individual domain results
```

**To view the report:**
```bash
cat ~/my-app/.optimization/report.md
```

---

## 🚀 Advanced: CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/analyze.yml
name: UCOF Analysis

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install UCOF
        run: |
          cd cli-standalone
          npm install

      - name: Run Analysis
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          cd cli-standalone
          node ucof.js analyze ..

      - name: Fail if Critical Issues Found
        run: |
          CRITICAL=$(jq '.summary.by_severity.critical' .optimization/synthesis.json)
          if [ "$CRITICAL" -gt 0 ]; then
            echo "❌ Critical issues found! Please review .optimization/report.md"
            exit 1
          fi

      - name: Comment PR with Report
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('.optimization/report.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '## 📊 UCOF Analysis\n\n' + report
            });
```

**To enable:**
1. Save the file as `.github/workflows/analyze.yml` in your repo
2. Go to **Settings → Secrets** and add `ANTHROPIC_API_KEY`
3. Push to main/develop to trigger

---

## 💡 Use Cases

### Daily Local Use
```bash
ucof analyze /path/to/my/project
```

### Weekly Re-checks
```bash
# Faster (uses cached discovery)
ucof analyze /path/to/my/project --skip-discovery
```

### Multiple Projects
```bash
for project in ~/projects/*; do
  ucof analyze "$project"
done
```

### Performance Troubleshooting
```bash
ucof analyze /path/to/project --skip-discovery
# Then focus on: cat /path/to/project/.optimization/performance-findings.json
```

---

## ❓ FAQ

### Q: Where do I get the API key?
**A:** Visit https://console.anthropic.com/account/keys (takes 30 seconds)

### Q: How much does it cost?
**A:** ~$0.50 per analysis (you get $5 free credits with a new account)

### Q: Is the API key secure?
**A:** Yes:
- Only used to call Anthropic's API
- Never stored or logged
- Set as environment variable (best practice)
- Delete the key anytime from the dashboard

### Q: Can I skip the API key?
**A:** Yes! Use the [Skill Version](../skill-claude-code/README.md) instead (no API key needed)

### Q: What if analysis fails?
**A:** Try:
```bash
# Check your API key
echo $ANTHROPIC_API_KEY

# Verify it starts with 'sk-ant-'
# If empty, run: export ANTHROPIC_API_KEY="..."

# Try a smaller project first
ucof analyze /path/to/small-project
```

### Q: How long does analysis take?
**A:** Depends on project size:
- Small project (< 100 files): 1-2 minutes
- Medium project (100-500 files): 2-3 minutes
- Large project (500+ files): 3-5 minutes

### Q: Can I analyze multiple projects at once?
**A:** Yes:
```bash
ucof analyze /path/to/project-a
ucof analyze /path/to/project-b
```

But they run sequentially. For parallel:
```bash
(ucof analyze /path/to/project-a &)
(ucof analyze /path/to/project-b &)
wait
```

### Q: Will this modify my code?
**A:** No. It's read-only. Only creates `.optimization/` folder.

### Q: Can I ignore certain files?
**A:** Not yet. It will analyze:
- All source code
- Config files
- Tests
- (Skips: node_modules, .git, dist/)

---

## 🛠️ Troubleshooting

### "Command not found: ucof"

**Problem:** Can't run the command

**Solution:**
```bash
# Use full path:
~/ucof-cli/cli-standalone/ucof.js analyze /path/to/project

# OR create alias:
alias ucof='~/ucof-cli/cli-standalone/ucof.js'
source ~/.zshrc
```

---

### "API key not found"

**Problem:** Error: "ANTHROPIC_API_KEY not found"

**Solution:**
```bash
# Check if set:
echo $ANTHROPIC_API_KEY

# If empty, set it:
export ANTHROPIC_API_KEY="sk-ant-..."

# Make permanent:
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
source ~/.zshrc
```

---

### "Project path does not exist"

**Problem:** Error: "Project path does not exist"

**Solution:**
```bash
# Use absolute path, not relative:
❌ ucof analyze ./my-app
✅ ucof analyze /Users/me/my-app

# Check path:
ls /Users/me/my-app  # Should list files
```

---

### "Analysis seems incomplete"

**Problem:** Fewer findings than expected

**Solution:**
```bash
# Check the report:
cat /path/to/project/.optimization/report.md

# If empty domains:
# The project might be very large (hitting context limits)
# OR it's a clean project (good job!)
```

---

### "Node.js not found"

**Problem:** Error: "command not found: node"

**Solution:**
```bash
# Install Node.js: https://nodejs.org/
# Download and run installer

# Verify:
node --version  # Should show v18 or higher
```

---

## 📚 Learn More

- [Main README](../README.md) - Choose between Skill and CLI versions
- [Skill Version](../skill-claude-code/README.md) - No API key option
- [Methodology](../METHODOLOGY.md) - How analysis works
- [Original Install Guide](./INSTALL.md) - Legacy documentation

---

## 🚀 Next Steps

1. ✅ Complete the 3-step setup above
2. ✅ Run: `ucof analyze /path/to/your/project`
3. ✅ Check: `cat /path/to/your/project/.optimization/report.md`
4. ✅ Fix issues in priority order (critical first)

---

## 💬 Questions?

- **Installation stuck?** Check Step 1 - make sure `npm install` completed
- **API key issues?** Verify at https://console.anthropic.com/account/keys
- **Analysis failing?** Check the error message and [troubleshooting](./README.md#troubleshooting)
- **Want to automate?** See [CI/CD Integration](./README.md#-advanced-cicd-integration) above

---

**Happy analyzing! 🔍**
