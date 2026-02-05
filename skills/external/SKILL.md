# External Services Domain Analysis

Analyze integrations with third-party APIs (OpenAI, Stripe, etc.) and background workers.

## Checks
- **Retry Logic**: Do external API calls have exponential backoff or retry mechanisms for transient failures?
- **Timeout Handling**: Are timeouts set for all external network requests?
- **Rate Limit Handling**: Does the system gracefully handle 429 Too Many Requests responses?
- **Job Reliability**: Are background jobs (e.g., Redis queues) persistent and retriable?
- **Dead Letter Queues**: Do failed jobs go to a dead letter queue for manual inspection?
- **Webhook Verification**: Are incoming webhooks from external services (e.g., Stripe) cryptographically verified?
- **AI Output Validation**: If using LLMs, is the output validated for structure and safety before use?

## Finding Examples
- EXT-001: No retry logic for OpenAI API calls.
- EXT-002: Unverified webhook endpoint for third-party service.
- EXT-003: No dead letter queue for background worker failures.
