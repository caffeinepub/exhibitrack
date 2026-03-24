# ExhibiTrack – Event Sync: Massive Scale Coordination Hub

A web-based exhibition management system designed to streamline and automate the coordination of large-scale exhibitions and trade fairs. The platform centralizes operations for organizers, vendors, service providers, and visitors.

---

## System Overview

ExhibiTrack replaces manual, paper-based processes with a centralized, automated platform that integrates:

- Vendor registration and approval
- Booth allocation and floor mapping
- Document verification (licenses, ID proofs)
- Payment tracking
- Service provider management
- Crowd and visitor monitoring
- Analytics and reporting

---

## Login Credentials

| Role  | Username | Password  |
|-------|----------|-----------|
| Admin | admin    | admin123  |

Admin has full control over all modules: approve/reject vendors and users, manage booths, payments, documents, services, visitors, and event details.

---

## Modules

### Dashboard
Live statistics overview — total booths, active vendors, current visitors, and revenue.

### Event Details
Admin view of event metadata: dates, venue info, organizer card, live stats summary, and quick action buttons.

### Booth Map
Interactive, color-coded floor layout. Click any booth to view details. Statuses: Available, Reserved, Occupied.

### Vendors
Manage vendor registrations. Admin can approve or reject vendors and assign booths to approved vendors.

### Visitors
Real-time crowd monitoring. Track entry and exit counts. Alerts for capacity thresholds.

### Document Verification
Admin reviews uploaded documents (business licenses, ID proofs). Approve or reject with notes.

### Payment Tracking
View and manage vendor payments. Status indicators: Paid, Pending, Overdue. Admin verifies payments.

### Service Providers
Manage service providers (electricity, setup, logistics). Assign providers to vendor booths.

### Analytics
Post-event and real-time reports — revenue breakdown, booth occupancy rates, vendor statistics.

### Settings
Configure event details, booth categories, pricing tiers, and system preferences.

### User Registration
New users (vendors) can register and submit their details. Accounts are pending admin approval before access is granted.

---

## System Workflow

```
Register → Login → Apply for Booth → Document Verification
    → Booth Allocation → Payment → Service Request → Monitor → Report
```

1. **User Registration** – Vendor registers, enters details, uploads documents
2. **User Login** – Backend verifies credentials
3. **Admin Login** – Separate admin portal with full system access
4. **Booth Application** – Vendor applies for a booth
5. **Document Verification** – Admin reviews and approves/rejects documents
6. **Booth Allocation** – Admin assigns available booth; status updates to Occupied
7. **Payment Processing** – Vendor pays; admin verifies; status updates (Paid/Pending)
8. **Service Management** – Vendor requests services; admin manages approvals
9. **Crowd Monitoring** – System tracks visitors for safety and compliance
10. **Data Storage** – All data securely stored (vendors, booths, payments, documents)
11. **Reporting** – Admin generates comprehensive reports
12. **Final Outcome** – Centralized, automated, efficient event management

---

## Technology Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React, TypeScript, Tailwind CSS   |
| Backend  | Motoko (Internet Computer)        |
| Platform | Caffeine / Internet Computer (ICP)|

---

## Navigation

Sidebar links (admin-accessible):
- Dashboard
- Event Details
- Booth Map
- Vendors
- Visitors
- Documents
- Payments
- Services
- Analytics
- Settings
- User Register

---

## Version History

| Version | Changes |
|---------|---------|
| v1 | Initial deployment: Dashboard, Booth Map, Vendors, Visitors, Analytics, Settings |
| v2 | Vendor Registration page added |
| v3 | Document Verification, Payment Tracking, Service Providers added |
| v4 | User Registration module added with admin approval workflow |
| v5 | Vendor Register page removed from sidebar; User Register remains |
| v6 | Admin Event Details view added |
| v7 | Login page added (Admin + User); full module integration |

---

## Built with [Caffeine](https://caffeine.ai/)
