# Backend / API Domain Analysis

Analyze the server-side logic, API design, and error handling.

## Checks
- **Input Validation**: Are API requests validated against a schema (e.g., Zod, Joi)?
- **Error Handling**: Do errors fail silently or leak internal details (like stack traces) to the client?
- **API Consistency**: Are HTTP methods, status codes, and response formats consistent across the API?
- **Request Timeouts**: Are there timeouts on long-running operations or outgoing requests?
- **Request Size Limits**: Is there a limit on the size of payloads or files acceptable by the API?
- **Authentication Architecture**: Is the session/JWT management secure?

## Finding Examples
- API-001: Missing input validation on POST /api/data.
- API-002: Internal stack traces leaked in 500 responses.
- API-003: Inconsistent use of HTTP status codes.
