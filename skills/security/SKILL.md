# Security Domain Analysis

Analyze the codebase for security vulnerabilities, authentication flaws, and sensitive data exposure.

## Checks
- **Authentication**: Can users access endpoints or data without logging in?
- **Authorization**: Can users access other users' data (IDOR)? Check for ownership checks on resources.
- **Data Protection**: Are there hardcoded secrets (API keys, passwords, database URLs) in the code? Are user passwords hashed?
- **Input Validation**: Are user-supplied inputs validated on the server side before use?
- **Injection Attacks**: Look for SQL injection, XSS, and command injection patterns.
- **Rate Limiting**: Is there protection against brute force or DoS attacks?
- **CORS**: Are cross-origin requests properly restricted?
- **Supabase Specific**: Are RLS (Row Level Security) policies enabled and correctly configured for all tables?

## Finding Examples
- SEC-001: API endpoint lacks authentication.
- SEC-002: Hardcoded API key in config file.
- SEC-003: Missing Row Level Security (RLS) on public table.
