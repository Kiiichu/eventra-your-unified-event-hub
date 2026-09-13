# EVENTRA Public User UI/UX Plan

## 1. Goal and scope

Build the UI/UX layout and an interactive web prototype for the **Public User** experience of EVENTRA, a centralized event discovery, vendor management, and community engagement platform for Kemaman, Malaysia.

Scope for this phase:
- Public-user screens only (attendee/discoverer role).
- Responsive layout that works as a PWA on mobile and as a website on desktop.
- Bilingual-ready structure (English / Bahasa Melayu) with instant language toggle.
- Design foundation, component inventory, navigation model, and page map.

Platform note: the interactive prototype will be built with the project's existing TanStack Start + Tailwind v4 + React stack. The resulting layout, tokens, and component specs will serve as the design reference for the separate Flutter/Dart PWA implementation.

## 2. Design direction

Selected direction: **Bold Market Pop**

Visual identity:
- Strong display typography (Anton) for headlines and brand moments.
- Clean body typography (Inter) for readability.
- Monospace labels (JetBrains Mono) for categories, dates, and metadata.
- High-contrast dark ink outlines paired with three energetic accent surfaces: coral, fresh mint, and gold.
- Rounded, poster-like cards with 2px ink borders.
- Friendly, youthful, community-market energy.

Design tokens (Tailwind v4 / oklch):
```text
--color-canvas:  oklch(0.98 0.02 92)    /* page background */
--color-ink:     oklch(0.19 0.03 280)   /* text, borders */
--color-sub:     oklch(0.45 0.04 280)   /* secondary text */
--color-line:    oklch(0.9  0.02 92)    /* dividers */
--color-coral:   oklch(0.7  0.19 25)    /* primary CTA / featured events */
--color-fresh:   oklch(0.8  0.17 150)   /* filter / success surfaces */
--color-gold:    oklch(0.83 0.16 85)    /* my-events / highlights */
```

Typography:
- Display: Anton
- Body: Inter
- Labels / metadata: JetBrains Mono

## 3. Public user information architecture

```text
Home / Discover
├── Event Feed (filtered by district, category, date)
├── Featured / Hero Event
├── My Events (registered, upcoming)
└── Quick submit community event

Event Detail
├── Hero image + title + metadata
├── Register / Get QR Ticket
├── Add to reminders
├── Programme / schedule
├── Location + map link
└── Organizer contact / PIC chat

Jadual / Schedule
├── Calendar / list view toggle
├── Registered events
└── Saved / interested events

Notifications
├── Registration confirmations
├── Venue / time changes
├── Reminders
└── Admin announcements

Submit Event (Community Submission)
├── Event title, description, category
├── Date / time / location
├── Poster upload
└── Review status indicator

Profile
├── Personal details (autofill-ready)
├── My QR tickets
├── Saved events
├── Language toggle (EN / BM)
└── Notification preferences

AI Chatbot
├── Floating action or bottom sheet
├── Quick replies for common questions
└── Escalate to event PIC
```

## 4. Screen inventory

1. **Home / Discover**  
   Mobile: greeting, "Apakah Hari Ini" headline, horizontal category chips, district filter pill, "My Events" mini-list, event feed cards, bottom nav.  
   Desktop: top navigation, left sidebar with district/category filters and submit CTA, main event grid, sticky header.

2. **Event Detail**  
   Full-width hero, title, category badge, date/location metadata, description, programme accordion, sticky register/QR CTA, organizer section, related events.

3. **Jadual (Schedule)**  
   Segmented control: Upcoming / Past / Saved. Date-grouped list. Each item shows thumbnail, title, time, district, QR status.

4. **Notifications**  
   Grouped by date. Icons indicate type (registration, change, reminder, system). Tap to open related event.

5. **Submit Event**  
   Form with bilingual labels. Fields: title, category, district, venue, date/time, description, poster, organizer contact. Submit-for-review CTA.

6. **Profile**  
   Avatar, name, language toggle, my tickets section, saved events count, notification settings, logout.

7. **AI Chatbot**  
   Bottom sheet or floating panel. Conversation bubbles, quick-action chips, escalate-to-PIC button.

## 5. Component library

- `TopNav` — logo, district label, nav pills, avatar.
- `BottomNav` — mobile 5-tab bar (Home, Schedule, Filter quick-action, Notifications, Profile).
- `DistrictFilter` — list/button group of Kemaman sub-districts.
- `CategoryChips` — horizontally scrollable chips, single-select.
- `EventCard` — image, category badge, date, title, venue, attendee count, register CTA.
- `MyEventRow` — compact row with color-coded background, initials avatar, title, time.
- `HeroEvent` — featured event banner with overlay CTA.
- `QRTicket` — QR placeholder card with event name and scan instructions.
- `NotificationRow` — icon + text + timestamp.
- `SubmitEventForm` — grouped form fields with validation placeholders.
- `LanguageToggle` — EN/BM segmented button.
- `FloatingChatButton` — FAB to open AI chat.

## 6. Responsive strategy

Breakpoints:
- Mobile first: default layout for < 640px.
- Tablet: 640–1024px, sidebar collapses to drawer, grid goes 2 columns.
- Desktop: > 1024px, persistent left sidebar, 2-column event grid, top nav instead of bottom nav.

Mobile patterns:
- Bottom navigation (4–5 tabs).
- Horizontal scroll for category chips.
- Filter as bottom sheet or top pill.
- Sticky register/QR button on event detail.

Desktop patterns:
- Top navigation with logo, search, primary actions.
- Left sidebar for district/category filters.
- 2-column card grid for events.
- Event detail as full page with sticky right rail (my tickets, organizer).

## 7. Navigation model

Mobile:
```text
[Home] [Jadual] [Filter*] [Notifications] [Profile]
* Filter opens filter sheet on Home, or district/category drawer.
```

Desktop:
```text
Logo — District label
Search input
Discovery | My Events | Submit Event | Notifications | Avatar
Left sidebar: district + category filters
```

Route structure (prototype):
- `/` — Home / Discover
- `/events/$id` — Event Detail
- `/schedule` — Jadual / Schedule
- `/notifications` — Notifications
- `/submit` — Community Event Submission
- `/profile` — Profile
- `/chat` or sheet — AI Chatbot

## 8. Bilingual support

- All UI labels and form labels stored in a translation object.
- Toggle in top nav (desktop) or profile (mobile).
- Instant switch without page reload.
- Default language: Bahasa Melayu for local resonance, with English fallback.

Key bilingual labels for prototype:
| English | Bahasa Melayu |
|---|---|
| Discover | Penemuan |
| What's on today | Apakah hari ini |
| My Events | Acara saya |
| Schedule | Jadual |
| Submit Event | Hantar Acara |
| Register | Daftar |
| District | Daerah |
| Category | Kategori |

## 9. Deliverables

1. Updated design tokens in `src/styles.css` (Bold Market Pop palette + fonts).
2. Shared layout components: `TopNav`, `BottomNav`, `DistrictFilter`, `CategoryChips`.
3. Home/Discover page with mobile and desktop variants.
4. Event Detail page.
5. Schedule, Notifications, Submit Event, and Profile pages.
6. Floating AI chatbot component.
7. Bilingual label map.

## 10. Out of scope for this phase

- Authentication flows (login, signup, password reset).
- Organizer, Vendor, and Admin role interfaces.
- Real-time data integration, backend APIs, or database schema.
- Payment processing.
- QR scanning logic.
- Push notification infrastructure.

These will be planned in later phases after the Public User experience is approved.
