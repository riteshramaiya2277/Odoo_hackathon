# Product Requirements Document (PRD)
## TransitOps — Smart Transport Operations Platform

**Hackathon Duration:** 8 Hours
**Stack:** MERN (MongoDB, Express, React/Vite, Node.js)
**Version:** 1.0

---

## 1. Problem Statement

Logistics companies today run transport operations on spreadsheets and paper logbooks. This causes:
- Double-booked vehicles and drivers
- Underutilized fleet capacity
- Missed maintenance windows
- Expired driver licenses going unnoticed
- Inaccurate expense/fuel tracking
- Zero real-time visibility into operations

**TransitOps** centralizes the full transport operations lifecycle — vehicle registry, driver management, trip dispatch, maintenance, fuel/expense logging, and analytics — in one platform, with business rules enforced automatically instead of relying on manual discipline.

---

## 2. Goals

- G1: Digitize vehicle and driver records with single-source-of-truth status tracking.
- G2: Prevent invalid dispatches (double-booking, overload, expired license) through system-enforced rules, not manual checks.
- G3: Automate status transitions across Trip ↔ Vehicle ↔ Driver ↔ Maintenance so no manual status-flipping is needed.
- G4: Give each role (Fleet Manager, Driver, Safety Officer, Financial Analyst) a dashboard relevant to their job.
- G5: Surface operational cost, fuel efficiency, utilization, and ROI without spreadsheets.

**Non-goals (for the 8-hour build):** real-time GPS tracking, native mobile app, payment processing, multi-tenant orgs, offline mode.

---

## 3. Target Users & Personas

| Role | Core Need | Primary Screens |
|---|---|---|
| **Fleet Manager** | Oversee fleet health, lifecycle, utilization | Dashboard, Vehicle Registry, Maintenance |
| **Driver** (dispatcher persona) | Create trips, assign vehicle+driver, monitor deliveries | Trip Management, Dashboard |
| **Safety Officer** | Track license validity & safety scores | Driver Management, Dashboard (compliance view) |
| **Financial Analyst** | Review costs, fuel, profitability | Reports & Analytics, Fuel & Expense |

All four roles share one login system with **Role-Based Access Control (RBAC)** gating what each can see/edit.

---

## 4. Feature Requirements

### 4.1 Authentication & RBAC
- Email/password login (JWT-based session).
- Every route protected — unauthenticated users redirected to login.
- Role assigned at signup/seed; UI and API both enforce role permissions (not just hidden buttons — backend must reject unauthorized calls).

### 4.2 Dashboard
KPIs (role-aware, but same core set):
- Active Vehicles, Available Vehicles, Vehicles in Maintenance
- Active Trips, Pending Trips
- Drivers On Duty
- Fleet Utilization % = (Vehicles On Trip / Total Active Vehicles) × 100

Filters: vehicle type, status, region.

### 4.3 Vehicle Registry (Fleet Manager owns; others read-only or scoped)
Fields: Registration Number (**unique**), Name/Model, Type, Max Load Capacity, Odometer, Acquisition Cost, Status.
Status enum: `Available | On Trip | In Shop | Retired`.
Full CRUD, with registration number uniqueness enforced.

### 4.4 Driver Management (Safety Officer owns; Fleet Manager read/write)
Fields: Name, License Number, License Category, License Expiry Date, Contact Number, Safety Score, Status.
Status enum: `Available | On Trip | Off Duty | Suspended`.

### 4.5 Trip Management
Create trip: source, destination, vehicle (from **eligible** pool only), driver (from **eligible** pool only), cargo weight, planned distance.
Lifecycle: `Draft → Dispatched → Completed → Cancelled`.

Eligibility filters applied at trip creation (see §5 Business Rules) — this is the feature that makes or breaks the demo, since it's the rule-engine heart of the product.

### 4.6 Maintenance
Create maintenance record against a vehicle → vehicle auto-flips to `In Shop`.
Close maintenance record → vehicle reverts to `Available` (unless `Retired`).
While `In Shop`, vehicle is invisible to trip creation.

### 4.7 Fuel & Expense Management
Fuel logs: liters, cost, date, linked vehicle.
Other expenses: tolls, maintenance costs.
System auto-computes **Total Operational Cost per vehicle** = Fuel Cost + Maintenance Cost.

### 4.8 Reports & Analytics
- Fuel Efficiency = Distance / Fuel (per vehicle, per trip)
- Fleet Utilization %
- Operational Cost (per vehicle / fleet-wide)
- Vehicle ROI = (Revenue − (Maintenance + Fuel)) / Acquisition Cost
- CSV export (mandatory); PDF export (bonus)

---

## 5. Business Rules (must be enforced server-side, not just UI)

1. Vehicle registration number is unique.
2. `Retired` or `In Shop` vehicles never appear in dispatch selection.
3. Drivers with expired license OR `Suspended` status cannot be assigned to trips.
4. A vehicle or driver already `On Trip` cannot be assigned to another trip.
5. Cargo Weight ≤ Vehicle Max Load Capacity — reject otherwise.
6. Dispatch trip → Vehicle status = `On Trip`, Driver status = `On Trip`.
7. Complete trip → Vehicle status = `Available`, Driver status = `Available`.
8. Cancel a dispatched trip → Vehicle and Driver restored to `Available`.
9. Create active maintenance record → Vehicle status = `In Shop`.
10. Close maintenance → Vehicle status = `Available` (unless `Retired`).

These rules are effectively a **finite state machine** shared by Vehicle, Driver, and Trip — the TRD models this explicitly.

---

## 6. Example End-to-End Workflow (acceptance scenario)

1. Register vehicle `Van-05`, max capacity 500kg, status `Available`.
2. Register driver `Alex` with a valid (non-expired) license.
3. Create trip, cargo weight 450kg → system validates 450 ≤ 500 → allowed.
4. Dispatch → Vehicle & Driver → `On Trip`.
5. Complete trip (enter final odometer + fuel consumed) → both → `Available`.
6. Create maintenance record (Oil Change) → Vehicle → `In Shop`, hidden from dispatch.
7. Reports reflect updated operational cost + fuel efficiency.

This exact flow should be the **demo script** for judges.

---

## 7. Non-Functional Requirements

- Responsive web UI (desktop-first is fine for judging, but shouldn't break on a laptop resize).
- API responses < 500ms for CRUD ops on seeded demo data.
- Data integrity: no orphaned trips (trip must reference valid vehicle+driver IDs at all times).
- Basic input validation on both client and server.

---

## 8. Success Metrics (for hackathon judging, not production KPIs)

- All 10 business rules demonstrably enforced live (not just described).
- Full example workflow (§6) runs without manual DB edits.
- Dashboard reflects real-time state changes after each action.
- At least one working CSV export.

---

## 9. Deliverables Checklist

- [ ] Auth + RBAC (4 roles)
- [ ] Dashboard with KPIs + filters
- [ ] Vehicle CRUD
- [ ] Driver CRUD
- [ ] Trip creation with full validation + lifecycle
- [ ] Maintenance workflow with auto status sync
- [ ] Fuel & expense logging + auto cost computation
- [ ] Reports: fuel efficiency, utilization, operational cost, ROI
- [ ] CSV export
- [ ] (Bonus) PDF export, license expiry email reminders, dark mode, document uploads

---

## 10. Open Questions / Assumptions for MVP

- Revenue field for ROI calc isn't in the mandatory entity list — assume a manually-entered `revenue` field per trip or per vehicle (flag this to teammates early; it's needed for §4.8 ROI).
- "Region" filter on dashboard implies vehicles need a `region` field — add to Vehicle schema even though §3.3 doesn't list it explicitly.
- Single-org assumption: no multi-tenant org boundary needed for the hackathon.
