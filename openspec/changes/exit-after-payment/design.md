# Exit After Payment: Design Document

**Status:** In Review

This document defines the technical approach for implementing exit logic during payment simulation, including timing constraints and validation handling.

## Architecture Overview

The system uses precise millisecond-level timing to determine state transitions after simulated payment completion. An external verification service must be consulted to confirm payment status before any expiration checks occur.

## Key Components

| Component | Responsibility |
|-----------|-----------------|
| Payment Processor | Executes simulated payment and returns completion timestamp |
| Timer Module | Monitors 900ms window for exit decisions |
| External Service | Confirms external system's state query results |
| State Manager | Updates balance status (VALID, EXPIRED, UNPAID) |

## Flow Diagram

```mermaid
sequenceDiagram
    participant Client as Client Application
    participant PS as Payment Service
    participant ES as External System
    participant TM as Timer Module
    participant SM as State Manager
    
    Client->>PS: Execute payment\nReturns: timestamp T
    PS-->>Client: 200 OK\nStatus: PAID
    
    Note over Client,TM,ES: Simulate exit at time T + delay
    
    alt delay = 900ms (exact)
        Client->>ES: Query payment status(T)
        Note over ES: Verify from external system
        EM-->>Client: Confirmed as PAID
        
        TM-->SM: setState(VALID, EXPIRED)\nStatus: ALLOWED
    else delay > 900ms
        ES-->>Client: Timeout or failure
        SM->>SM: setState(EXPIRED)
        
        Note over Client,TM: No valid state available
        TM-->SM: setState(EXPIRED)
    end
    
    Alternative: Payment not executed
    PS-->>Client: NOT_IMPLEMENTED\nStatus: UNPAID
```

## Validation Rules

| Condition | Output |
|-----------|--------|
| Exit at 900,000 ms exactly after payment | HTTP 200 WITH ALLOWED\nVALID status |
| Exit at > 900,001 ms after payment | HTTP 400/422 WITH EXPIRED status |
| Payment not executed | HTTP 400/422 WITH UNPAID status |
| Invalid input (wrong timestamp/pid) | HTTP 400 INVALID_INPUT |

## External Dependencies

The simulator requires connectivity to an external payment verification service. This service must respond with a confirmed payment state for timestamps within ±1ms of the recorded payment completion. Without this external check, all states incorrectly report `NOT_IMPLEMENTED`.

## Performance Considerations

- Timer resolution: millisecond accuracy
- Network latency threshold: < 50ms for external service queries
- Batch processing: single timestamp per request
- Fail-safe default: UNPAID on any timeout