# Exit After Payment

**Scenario:** When a user exits immediately after payment, their account balance should expire rather than remain unpaid.

## Purpose
Simulate behavior when a system exits (e.g., user stops the terminal) exactly as payment completes. The simulator must determine whether the balance expires or remains unprocessed based on timing precision and input validation.

## Requirements
- **RQ1:** Verify that if the exit occurs exactly 900 seconds after the simulated payment, the balance status is *allowed* (VALID).
- **RQ2:** Verify that if the exit occurs at any time greater than 900 seconds after the simulated payment, the balance status is *expired*.
- **RQ3:** Verify that when the simulated payment has not been executed, the system exits with an *unpaid* status.
- **RQ4:** Any request containing invalid or missing input (such as incorrect timestamps, payment IDs) must result in HTTP 400 responses.
