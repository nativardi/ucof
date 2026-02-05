# Performance Domain Analysis

Analyze the codebase for performance bottlenecks and resource management.

## Checks
- **Polling Intervals**: Are there aggressive polling mechanisms (intervals < 3 seconds) that could be replaced with WebSockets?
- **Caching Strategy**: Are expensive computations or database queries cached (e.g., Redis, SWR, TanStack Query)?
- **Large Payloads**: Is the API returning more data than necessary for the current view?
- **Synchronous Operations**: Are there heavy computations blocking the main execution thread?
- **Memory Management**: Are event listeners or subscriptions properly cleaned up to prevent leaks?
- **Asset Optimization**: Are images and other assets optimized or lazily loaded?

## Finding Examples
- PERF-001: Polling interval too aggressive (500ms).
- PERF-002: Large JSON payload for simple dashboard view.
- PERF-003: Missing memoization on expensive calculation.
