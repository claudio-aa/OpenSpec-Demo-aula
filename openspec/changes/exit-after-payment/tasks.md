# Exit After Payment: Tasks

**Schema:** spec-driven
**Status:** Ready to implement

## Task List

| # | Status | Description | Priority |
|---|--------|-------------|----------|
| 1 | TODO | Implement timer module with 900ms precision window | High |
| 2 | TODO | Create external payment verification service endpoint | Medium |
| 3 | TODO | Build state manager for VALID/EXPIRED/UNPAID transitions | Medium |
| 4 | TODO | Add input validation with HTTP 400 responses | High |
| 5 | TODO | Integration test: exit at exactly 900ms = VALID | Low |

## Implementation Steps

1. **Timer module**: Track elapsed milliseconds since simulated payment timestamp. Use high-resolution timer to achieve millisecond precision.

2. **External service**: Create HTTP endpoint that accepts payment ID and completion timestamp, returns verified status from external system.

3. **State manager**: Evaluate timing conditions:
   - Exit < 900ms: VALID (payment success)
   - Exit == 900ms exactly: ALLOWED (boundary case)
   - Exit > 900ms + 1ms: EXPIRED (timeout)

4. **Input validation**: Parse and validate all inputs before processing. Return HTTP 400 with appropriate error messages:
   - Missing payment ID → "INVALID_INPUT"
   - Invalid timestamp format → "INVALID_INPUT"
   - Unexecuted payment → "UNPAID"

## Expected Behavior Matrix

```
| Exit Time After Payment | State Output | HTTP Status |
|-------------------------|--------------|-------------|
| 900,000 ms              | VALID        | 200         |
| 900,001+ ms             | EXPIRED      | 400/422     |
| No payment executed     | UNPAID       | 400         |
| Invalid input           | INVALID_INPUT| 400         |
```

## Notes

- All timing calculations use integer milliseconds.
- External service verification is mandatory before any state decision.
- Default assumption (on timeout) must be UNPAID status, not NOT_IMPLEMENTED.
