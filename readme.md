# GearUp — Premium Sports & Outdoor Gear Rental Engine

> "Rent Sports & Outdoor Gear Instantly"

GearUp is a high-concurrency backend API engine for a multi-vendor sports and outdoor equipment rental platform. The system handles automated inventory calculations, multi-vendor order routing, secure payment gateways, and verified closed-loop customer reviews.

---

## 👥 Roles & Permissions

Users select their specific role during registration. The platform enforces strict Role-Based Access Controls (RBAC):

| Role         | Description                 | Key Permissions                                                                  |
| :----------- | :-------------------------- | :------------------------------------------------------------------------------- |
| **Customer** | Users who rent sports gear  | Browse gear, place rental orders, track status, make payments, leave reviews.    |
| **Provider** | Gear vendors / rental shops | Manage gear inventory, track stock, view vendor orders, update order lifecycles. |
| **Admin**    | Platform moderators         | Manage all users, toggle account access, oversee all rentals, manage categories. |

---

## ✨ Core Features

### 🌍 Public Domain

- **Dynamic Gear Catalog:** Browse all available sports and outdoor gear listings.
- **Advanced Search & Multi-Filter:** Full-text search combining category matches, price ranges (`minPrice`/`maxPrice`), brand names, and real-time availability filters.
- **Granular Inspection:** View deep gear details including technical specifications, vendor origins, and current stock.

### 🚴 Customer Pipeline

- **Account Identity:** Custom registration and authentication.
- **Smart Rental Booking:** Place dynamic orders by specifying custom booking dates and targeted items.
- **Dual Payment Gateways:** Process financial settlements securely via **Stripe** or **SSLCommerz** checkout channels when creating or confirming an order.
- **Financial Tracking:** Review personal payment history sheets and active invoice statuses.
- **Verified Feedback Loop:** Submit ratings and comments _only_ after database transactions verify that the specific item was safely returned.

### 🏪 Provider Management Portal

- **Inventory Control:** Add new gear items, edit specifications, or remove units from the marketplace.
- **Automated Stock Ledger:** Track real-time item availability.
- **Isolated Order Desk:** Stream incoming order lines showing items belonging exclusively to the authenticated provider.
- **Lifecycle State Machine:** Progress orders smoothly through states (`CONFIRMED` $\rightarrow$ `PICKED_UP` $\rightarrow$ `RETURNED`) with transactional restock guards.

### 👑 Admin Governance Hub

- **User Directory Monitoring:** Review comprehensive data indexes for both Customers and Providers.
- **Access Control Modifiers:** Manually suspend or activate accounts based on platform guidelines.
- **Global System Audits:** Cross-examine every gear listing and platform rental order in existence.
- **Taxonomy Management:** Create, update, and organize gear classification categories.

---

## 🛠️ Technology Specifications

- **Runtime Engine:** Node.js v20+ with type-safe TypeScript compilation
- **Framework Architecture:** Express.js (Modular Route-Controller-Service Isolation layers)
- **Database Engine:** PostgreSQL
- **ORM Layer:** Prisma with full relational typing
- **Transaction Controls:** Prisma Interactive Transactions (`$transaction`)
- **Payment Gateways:** Stripe Checkout API & SSLCommerz Payment Engines
- **Security:** JWT (JSON Web Tokens) with cross-tier validation middleware

---

## 📁 Repository Layout

```text
src/
├── app.ts                 # Express Application Configuration
├── server.ts              # Server Bootstrapper & HTTP Listeners
├── app/
│   ├── modules/
│   │   ├── auth/          # Identity Registration & Verification
│   │   ├── gear/          # Catalog Filtering & Inventory Specifications
│   │   ├── category/      # Admin Taxonomy Classification Logs
│   │   ├── rental/        # Booking Engines & Cost Calculators
│   │   ├── payment/       # Stripe & SSLCommerz Payment Gateways
│   │   ├── provider/      # Vendor Desk & Stock Replenishment Engines
│   │   └── review/        # Verified Feedback Verification Filters
│   └── middlewares/
│       ├── auth.ts        # Access Token RBAC Extractor
│       └── globalErrorHandler.ts  # Request Payload Structure Checker
└── utils/
    ├── catchAsync.ts      # Global Promise Exception Wrap Hook
    └── sendResponse.ts    # Standardized Response Builder
```

### - Git Repository Clone

https://github.com/Rayhan-abdullha/gearup

- cd gearup
- npm install
- npm run dev
