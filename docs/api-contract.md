# Banking Data API Contract (Draft)

This document sketches the HTTP contract we can target when we replace the shared mock data with live services. All payloads are JSON encoded using UTF-8 and timestamps follow ISO 8601 in UTC unless noted.

## Authentication

- Scheme: `Bearer <token>` header issued by the platform identity service.
- Permissions: callers must have `accounts:read`, `cards:read`, or `transactions:read` scopes depending on the endpoint. Requests lacking the necessary scope receive `403`.

## Endpoints

### GET /api/v1/snapshot

Summarises the latest balances that feed both the hero tiles on web and the gradient summary card on mobile.

**Query params**
- `accountId` (optional) – when provided, returns a card/account-specific snapshot.

**Response 200**
```json
{
  "totalBalance": 49880.33,
  "incomeThisMonth": 18240.58,
  "spendingThisMonth": 9680.41,
  "currency": "USD",
  "asOf": "2025-09-21T18:00:00Z"
}
```

### GET /api/v1/accounts

Returns all bank and card accounts visible to the signed-in operator.

**Response 200**
```json
{
  "accounts": [
    {
      "id": "acc-001",
      "name": "Everyday Checking",
      "type": "checking",
      "balance": 6280.18,
      "currency": "USD",
      "accountNumberMasked": "***8123",
      "updatedAt": "2025-09-21T17:45:00Z"
    }
  ]
}
```

### GET /api/v1/cards

Provides card portfolio details for both the Active Cards grid and the mobile list.

**Query params**
- `status` (optional) – filter by `active`, `frozen`, etc.

**Response 200**
```json
{
  "cards": [
    {
      "id": "card-001",
      "label": "All Access Platinum",
      "brand": "visa",
      "last4": "8123",
      "balance": 1240.54,
      "creditLimit": 5000,
      "accentColor": "#4f46e5",
      "owner": {
        "id": "user-219",
        "name": "Priya Patel"
      }
    }
  ]
}
```

### GET /api/v1/cards/{cardId}/transactions

Feeds both the recent card activity component and mobile transaction rows.

**Query params**
- `limit` – default `10`, max `100`.
- `startDate` / `endDate` (optional) for historical ranges.

**Response 200**
```json
{
  "cardId": "card-001",
  "transactions": [
    {
      "id": "tx-010",
      "description": "Stripe Settlement",
      "merchant": "Stripe",
      "category": "incoming_payments",
      "amount": 4100.72,
      "currency": "USD",
      "direction": "credit",
      "bookedAt": "2025-09-21T11:32:10Z"
    }
  ],
  "nextCursor": "..."
}
```

### GET /api/v1/spending/categories

Returns the spending mix that powers the category pills.

**Query params**
- `period` – `week`, `month`, `quarter`; defaults to `month`.

**Response 200**
```json
{
  "period": "month",
  "categories": [
    {
      "id": "cat-001",
      "label": "Essentials",
      "amount": 1344.82,
      "percentage": 34,
      "trend": "down"
    }
  ]
}
```

## Error Model

Errors follow the shared envelope:
```json
{
  "error": {
    "code": "string",
    "message": "Human readable detail",
    "traceId": "uuid"
  }
}
```
- `400` validation failure
- `401` missing/expired token
- `403` insufficient scope
- `404` resource not found
- `429` throttled
- `500` server side fault

## Web & Mobile Consumption Notes

- Web cards page should request `/cards` (with optional facets) and `/cards/{id}/transactions?limit=5` for the sidebar list.
- Mobile app can fetch `/snapshot`, `/accounts`, `/cards`, and `/spending/categories?period=month` on launch, and lazy-load `/cards/{id}/transactions?limit=20` when users expand a card.
- Both clients should cache responses for the session and tag them for revalidation when a user freezes/unfreezes a card or changes controls.

This outline is a starting point—final naming, pagination and auth scopes should be validated with the backend team before implementation.
