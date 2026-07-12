# Technical Requirements Document (TRD)
## TransitOps — Smart Transport Operations Platform

**Stack:** MongoDB · Express · React (Vite) · Node.js — full MERN
**Duration:** 8-hour hackathon build
**Version:** 1.0

---

## 1. Architecture Overview

```
┌─────────────────────┐        HTTPS/JSON         ┌──────────────────────┐
│   React (Vite) SPA   │ ───────────────────────▶ │  Express REST API     │
│  - Role-aware UI      │ ◀─────────────────────── │  - JWT auth middleware │
│  - Axios client        │                          │  - RBAC middleware     │
│  - React Router        │                          │  - Business-rule layer │
└─────────────────────┘                            └──────────┬────────────┘
                                                                │ Mongoose
                                                                ▼
                                                      ┌──────────────────┐
                                                      │   MongoDB Atlas    │
                                                      │  (or local mongod)  │
                                                      └──────────────────┘
```

- **Frontend:** React + Vite, React Router for pages, Context API (or Zustand if time permits) for auth/role state, Axios for API calls, Recharts for analytics charts.
- **Backend:** Node.js + Express, Mongoose ODM, JWT for auth, bcrypt for password hashing, express-validator for request validation.
- **Database:** MongoDB — one connection, multiple collections (see §3).
- **No separate microservices** — monolith API is correct for 8 hours.

---

## 2. Folder Structure

```
transitops/
├── server/
│   ├── src/
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Vehicle.js
│   │   │   ├── Driver.js
│   │   │   ├── Trip.js
│   │   │   ├── Maintenance.js
│   │   │   ├── FuelLog.js
│   │   │   └── Expense.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   │   ├── auth.js       # verifies JWT
│   │   │   └── rbac.js       # role gate
│   │   ├── services/
│   │   │   └── stateEngine.js # centralized status-transition logic
│   │   ├── utils/
│   │   └── app.js
│   ├── seed.js               # demo data seeder
│   └── server.js
└── client/
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Vehicles.jsx
    │   │   ├── Drivers.jsx
    │   │   ├── Trips.jsx
    │   │   ├── Maintenance.jsx
    │   │   ├── FuelExpenses.jsx
    │   │   └── Reports.jsx
    │   ├── components/
    │   ├── context/AuthContext.jsx
    │   ├── api/axiosClient.js
    │   └── App.jsx
    └── vite.config.js
```

---

## 3. Data Models (Mongoose Schemas)

### User
```js
{
  name: String,
  email: { type: String, unique: true, required: true },
  password: String, // bcrypt hashed
  role: { type: String, enum: ['FleetManager','Driver','SafetyOfficer','FinancialAnalyst'], required: true }
}
```

### Vehicle
```js
{
  registrationNumber: { type: String, unique: true, required: true },
  name: String,
  type: String,
  maxLoadCapacity: Number,   // kg
  odometer: Number,
  acquisitionCost: Number,
  region: String,            // needed for dashboard filter
  status: { type: String, enum: ['Available','On Trip','In Shop','Retired'], default: 'Available' }
}
```

### Driver
```js
{
  name: String,
  licenseNumber: { type: String, unique: true },
  licenseCategory: String,
  licenseExpiryDate: Date,
  contactNumber: String,
  safetyScore: { type: Number, default: 100 },
  status: { type: String, enum: ['Available','On Trip','Off Duty','Suspended'], default: 'Available' }
}
```

### Trip
```js
{
  source: String,
  destination: String,
  vehicle: { type: ObjectId, ref: 'Vehicle', required: true },
  driver: { type: ObjectId, ref: 'Driver', required: true },
  cargoWeight: Number,
  plannedDistance: Number,
  actualDistance: Number,
  fuelConsumed: Number,
  revenue: Number,           // needed for ROI calc — not in original entity list, add it
  status: { type: String, enum: ['Draft','Dispatched','Completed','Cancelled'], default: 'Draft' },
  createdAt: { type: Date, default: Date.now }
}
```

### Maintenance
```js
{
  vehicle: { type: ObjectId, ref: 'Vehicle', required: true },
  description: String,       // e.g. "Oil Change"
  cost: Number,
  isActive: { type: Boolean, default: true }, // false = closed
  createdAt: { type: Date, default: Date.now },
  closedAt: Date
}
```

### FuelLog
```js
{
  vehicle: { type: ObjectId, ref: 'Vehicle', required: true },
  liters: Number,
  cost: Number,
  date: { type: Date, default: Date.now }
}
```

### Expense
```js
{
  vehicle: { type: ObjectId, ref: 'Vehicle', required: true },
  type: String,     // 'toll', 'other'
  amount: Number,
  date: { type: Date, default: Date.now }
}
```

---

## 4. State Machine Logic (the core engineering piece)

Put this in **one file** (`services/stateEngine.js`) so all status transitions are centralized — this is the single most important architectural decision for the demo to work reliably.

| Trigger | Vehicle status change | Driver status change |
|---|---|---|
| Trip Dispatched | → `On Trip` | → `On Trip` |
| Trip Completed | → `Available` | → `Available` |
| Trip Cancelled (was Dispatched) | → `Available` | → `Available` |
| Maintenance created (active) | → `In Shop` | — |
| Maintenance closed | → `Available` (skip if `Retired`) | — |

**Validation gate before Trip creation (`POST /api/trips`):**
```js
function validateTripCreation(vehicle, driver, cargoWeight) {
  if (vehicle.status !== 'Available') throw new Error('Vehicle not available');
  if (driver.status !== 'Available') throw new Error('Driver not available');
  if (driver.status === 'Suspended') throw new Error('Driver suspended');
  if (new Date(driver.licenseExpiryDate) < new Date()) throw new Error('License expired');
  if (cargoWeight > vehicle.maxLoadCapacity) throw new Error('Cargo exceeds capacity');
}
```
Run this **server-side** on every trip create/dispatch call — never trust the frontend dropdown filtering alone (frontend filtering is just UX; backend re-validates).

Eligible-vehicle query for trip creation dropdown:
```js
Vehicle.find({ status: 'Available' })
```
Eligible-driver query:
```js
Driver.find({ status: 'Available', licenseExpiryDate: { $gt: new Date() } })
```

---

## 5. API Endpoints

| Method | Route | Role(s) | Notes |
|---|---|---|---|
| POST | `/api/auth/login` | all | returns JWT |
| GET | `/api/vehicles` | all | filter by status/type/region query params |
| POST | `/api/vehicles` | FleetManager | enforce unique reg number |
| PUT | `/api/vehicles/:id` | FleetManager | |
| GET | `/api/drivers` | all | |
| POST | `/api/drivers` | SafetyOfficer | |
| PUT | `/api/drivers/:id` | SafetyOfficer | |
| GET | `/api/trips` | all | |
| POST | `/api/trips` | Driver, FleetManager | runs validateTripCreation |
| PATCH | `/api/trips/:id/dispatch` | Driver, FleetManager | triggers state engine |
| PATCH | `/api/trips/:id/complete` | Driver, FleetManager | requires finalOdometer, fuelConsumed |
| PATCH | `/api/trips/:id/cancel` | Driver, FleetManager | only if Dispatched |
| POST | `/api/maintenance` | FleetManager | sets vehicle → In Shop |
| PATCH | `/api/maintenance/:id/close` | FleetManager | restores vehicle |
| POST | `/api/fuel-logs` | FleetManager, FinancialAnalyst | |
| POST | `/api/expenses` | FinancialAnalyst | |
| GET | `/api/reports/dashboard` | all | KPI aggregates |
| GET | `/api/reports/analytics` | FinancialAnalyst, FleetManager | fuel efficiency, utilization, cost, ROI |
| GET | `/api/reports/export/csv` | FinancialAnalyst | |

RBAC middleware pattern:
```js
const allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
  next();
};
// usage: router.post('/vehicles', auth, allowRoles('FleetManager'), createVehicle);
```

---

## 6. Reports & Analytics — Calculation Reference

```
Fleet Utilization % = (Vehicles with status 'On Trip' / Total non-Retired Vehicles) × 100
Fuel Efficiency      = totalActualDistance / totalFuelConsumed   (per vehicle)
Operational Cost     = SUM(FuelLog.cost) + SUM(Maintenance.cost)  (per vehicle)
Vehicle ROI          = (SUM(Trip.revenue) - OperationalCost) / Vehicle.acquisitionCost
```
Use MongoDB aggregation pipelines (`$group`, `$lookup`) for per-vehicle rollups rather than pulling all docs into Node and looping — faster and cleaner for the reports endpoint.

---

## 7. 8-Hour Build Plan (phase checklist)

**Phase 1 — Foundation (Hour 0–1.5)**
- [ ] Init repo, client + server scaffolds (Vite + Express)
- [ ] MongoDB connection + all 7 Mongoose models
- [ ] Seed script with demo Users (one per role), 3–4 vehicles, 3–4 drivers
- [ ] Auth: signup/login, JWT issue + verify middleware

**Phase 2 — Core CRUD (Hour 1.5–3.5)**
- [ ] Vehicle CRUD (API + UI table + form)
- [ ] Driver CRUD (API + UI table + form)
- [ ] RBAC middleware wired into all write routes
- [ ] Basic protected-route wrapper on frontend (redirect to login if no JWT)

**Phase 3 — Trip Engine (Hour 3.5–5.5)** ← highest priority, this is the demo centerpiece
- [ ] Trip model + create endpoint with full `validateTripCreation`
- [ ] Eligible vehicle/driver dropdowns (backend-filtered)
- [ ] Dispatch / Complete / Cancel endpoints wired to `stateEngine.js`
- [ ] Trip list UI with status badges

**Phase 4 — Maintenance + Fuel/Expense (Hour 5.5–6.5)**
- [ ] Maintenance create/close → vehicle status sync
- [ ] Fuel log + expense forms
- [ ] Operational cost auto-computation visible on vehicle detail

**Phase 5 — Dashboard + Reports (Hour 6.5–7.5)**
- [ ] KPI aggregation endpoint + dashboard cards
- [ ] Filters (type/status/region)
- [ ] Reports page: fuel efficiency, utilization, cost, ROI (Recharts bar/line)
- [ ] CSV export endpoint

**Phase 6 — Polish + Demo Prep (Hour 7.5–8)**
- [ ] Run the exact §6 workflow from the PRD end-to-end, fix breaks
- [ ] Basic responsive check
- [ ] Seed data reset script so demo is repeatable
- [ ] 2-minute demo script written down

**Move to next phase only when the previous phase's checklist is fully checked** — don't start Trip Engine before Auth+RBAC is solid, since every trip mutation depends on `req.user.role`.

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Team burns too much time on UI polish before rules work | Get Phase 3 (Trip Engine) functionally correct via Postman/curl before touching its UI |
| Race condition: two trips dispatched against same vehicle simultaneously | Not a real risk at hackathon scale/demo — skip; note as future work if asked |
| ROI field (`revenue`) not in original spec | Added to Trip schema now, documented in PRD §10 — flag to teammates immediately |
| Time runs out before Reports/CSV | Reports is Phase 5, deliberately after all state-machine logic — protects the core demo even if reports get cut short |

---

## 9. Out of Scope (explicitly, to prevent scope creep)

- Real-time GPS / live tracking
- Email reminders for license expiry (bonus only — Phase 6 stretch if time remains)
- PDF export (bonus)
- Dark mode (bonus)
- Vehicle document uploads (bonus)
