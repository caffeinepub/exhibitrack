# ExhibiTrack - Exhibition Management System

## Current State
New project, no existing code.

## Requested Changes (Diff)

### Add
- Admin authentication and dashboard
- Booth management: create/edit booths with ID, dimensions, category (Premium/Standard), rental price, status (Available/Reserved/Occupied)
- Vendor registration: company name, contact info, business description, trade license number, license document upload
- Admin vendor verification/approval workflow
- Interactive booth map: color-coded (green=available, red=occupied, yellow=reserved)
- Booth selection by verified vendors
- Payment status tracking (Reserved → Paid → Occupied)
- Live visitor count tracking (entry/exit counters)
- Analytics/reporting: total revenue, popular booth sections, visitor footfall
- Role-based access: Admin vs Vendor roles

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Select authorization and blob-storage components (for vendor document uploads)
2. Generate Motoko backend with:
   - Booth CRUD (id, dimensions, category, price, status)
   - Vendor registration and profile storage
   - Admin approval/rejection of vendors
   - Booth reservation and payment status updates
   - Visitor entry/exit tracking
   - Analytics queries (revenue, occupancy, footfall)
3. Build React frontend:
   - Landing/login page
   - Admin dashboard: booth management, vendor approvals, live crowd monitor, reports
   - Vendor portal: registration form, booth map, booking status
   - Interactive SVG/canvas booth map with color-coded status
