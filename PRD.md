# Dr. Dédé Tetsubayashi Personal Brand Website

A professional digital presence showcasing Dr. Dédé Tetsubayashi's expertise in AI governance, speaking engagements, and thought leadership through accessible, modern design.

**Experience Qualities**: 
1. **Professional** - Conveys expertise and credibility through clean typography and structured information hierarchy
2. **Accessible** - Demonstrates commitment to disability advocacy through inclusive design practices and clear navigation
3. **Engaging** - Builds connection through video content, progress visualization, and clear calls-to-action

**Complexity Level**: Content Showcase (information-focused)
- Primary focus on presenting Dr. Tetsubayashi's professional credentials, speaking topics, and thought leadership content with integrated YouTube functionality for audience engagement.

## Essential Features

### Hero Section with TEDx Integration
- **Functionality**: Embedded TEDx talk with subscriber counter showing progress toward 10K goal
- **Purpose**: Immediately establishes credibility while encouraging audience growth
- **Trigger**: Page load displays video and current subscriber count
- **Progression**: User sees talk → inspired by content → subscribes to YouTube → counter updates
- **Success criteria**: Video loads quickly, counter displays accurately, subscribe button functions

### Professional Bio Section
- **Functionality**: Comprehensive background covering Cornell education, disability advocacy, and systems disruption work
- **Purpose**: Builds trust and demonstrates qualifications for speaking engagements
- **Trigger**: User scrolls to bio section
- **Progression**: Read credentials → understand expertise → consider booking
- **Success criteria**: Information is scannable, credentials are prominent, advocacy work is highlighted

### Speaking Services Showcase
- **Functionality**: Details on custom workshops and keynote availability with topic areas
- **Purpose**: Convert visitors into speaking engagement leads
- **Trigger**: Interest in booking Dr. Tetsubayashi for events
- **Progression**: View services → see topics → contact for booking
- **Success criteria**: Services are clearly categorized, topics are specific, booking path is obvious

### Contact Form for Speaking Engagements
- **Functionality**: Structured form capturing event details, audience size, topics of interest
- **Purpose**: Streamline the booking process and qualify leads
- **Trigger**: User wants to book speaking engagement
- **Progression**: Fill form → submit inquiry → receive confirmation → booking discussion
- **Success criteria**: Form submits successfully, required fields are validated, confirmation is shown

### YouTube Integration & Subscribe CTA
- **Functionality**: Prominent subscribe buttons and subscriber counter with goal tracking
- **Purpose**: Grow YouTube audience to amplify thought leadership reach
- **Trigger**: User engages with video content or subscribes
- **Progression**: Watch content → subscribe → become regular viewer → amplify message
- **Success criteria**: Subscribe buttons are prominent, counter updates, links work correctly

## Edge Case Handling
- **Slow Video Loading**: Display skeleton loader with fallback poster image
- **API Failures**: Show cached subscriber count with "approximate" disclaimer
- **Form Errors**: Inline validation with helpful error messages and retry options
- **Mobile Viewport**: Responsive video embeds that maintain aspect ratio
- **Accessibility**: Screen reader support for all interactive elements and progress indicators

## Design Direction
The design should feel authoritative yet approachable, reflecting Dr. Tetsubayashi's role as both an academic expert and disability advocate - clean, professional aesthetic with purposeful use of color and generous whitespace to ensure accessibility and readability across all devices.

## Color Selection
Complementary (opposite colors) - Professional purple as primary with energetic teal accents to create visual interest while maintaining the sophisticated, trustworthy feeling appropriate for an AI governance expert.

- **Primary Color**: Deep Professional Purple (`oklch(0.35 0.15 270)`) - Communicates expertise, wisdom, and thought leadership
- **Secondary Colors**: Neutral grays (`oklch(0.95 0.02 270)` light, `oklch(0.25 0.02 270)` dark) for backgrounds and supporting text
- **Accent Color**: Vibrant Teal (`oklch(0.65 0.15 180)`) - Highlights CTAs, progress indicators, and interactive elements
- **Foreground/Background Pairings**: 
  - Background (Light Purple Gray #F8F7FA): Dark Purple text (`oklch(0.25 0.02 270)`) - Ratio 12.8:1 ✓
  - Primary (Deep Purple `oklch(0.35 0.15 270)`): White text (`oklch(0.98 0.02 270)`) - Ratio 8.2:1 ✓
  - Accent (Vibrant Teal `oklch(0.65 0.15 180)`): White text (`oklch(0.98 0.02 270)`) - Ratio 5.1:1 ✓
  - Card (White `oklch(1 0 0)`): Dark Purple text (`oklch(0.25 0.02 270)`) - Ratio 15.1:1 ✓

## Font Selection
Typography should convey academic credibility while remaining highly readable for accessibility - using a modern sans-serif system that projects both intelligence and approachability.

- **Typographic Hierarchy**:
  - H1 (Page Title): Inter Bold/32px/tight letter spacing (-0.02em)
  - H2 (Section Headers): Inter Semibold/24px/normal letter spacing
  - H3 (Subsection): Inter Medium/20px/normal letter spacing
  - Body Text: Inter Regular/16px/relaxed line height (1.6)
  - Small Text: Inter Regular/14px/relaxed line height (1.5)

## Animations
Subtle, purposeful motion that enhances usability without creating barriers - gentle transitions that guide attention and provide feedback while respecting users' motion preferences and accessibility needs.

- **Purposeful Meaning**: Counter animations reinforce progress toward goals, smooth transitions maintain context during navigation, hover states provide clear interaction feedback
- **Hierarchy of Movement**: Subscribe buttons and counter deserve most animation attention as primary conversion goals, section transitions are secondary

## Component Selection
- **Components**: Card for bio and speaking sections, Button for CTAs and subscribe actions, Form for contact inquiries, Progress for subscriber counter visualization, Badge for credentials and topics
- **Customizations**: YouTube embed wrapper with responsive aspect ratio, custom counter component with progress visualization, testimonial cards if available
- **States**: Buttons have distinct hover/focus states with teal accent, form fields show clear validation states, video embed has loading and error states
- **Icon Selection**: Play icon for video, Arrow-right for CTAs, Mail for contact, Users for subscriber count, Academic-cap for education credentials
- **Spacing**: Consistent 4/6/8/12/16/24px spacing using Tailwind's scale, generous padding on mobile (px-4), larger on desktop (px-8)
- **Mobile**: Single column layout with stacked sections, collapsible navigation if needed, touch-friendly button sizes (min 44px), optimized video embeds for mobile viewing