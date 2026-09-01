Modify the existing SideNavbar / hamburger sidebar component for my project "KickSkill".

IMPORTANT:
This is a SIDE HAMBURGER BAR.

Do NOT redesign the component from scratch.
Keep the existing collapsible/hamburger behavior, structure, animations, spacing and styling approach.

The sidebar should start COLLAPSED and expand when the hamburger/menu button is clicked.

The collapsed state should show ONLY icons.
The expanded state should show icons + labels.

Keep the existing smooth width transition and collapsible behavior.

--------------------------------------------------
KICKSKILL SIDEBAR
--------------------------------------------------

Replace the existing generic navigation items with the following KickSkill navigation.

TOP:

KickSkill

When collapsed:
Show only a simple KickSkill mark/icon.

When expanded:
Show:

KickSkill

Keep the branding minimal and consistent with the existing dark Moon design.

--------------------------------------------------
HAMBURGER BUTTON
--------------------------------------------------

Keep the existing Menu hamburger button.

It should remain at the top of the sidebar.

Clicking it should:

Collapsed → Expanded
Expanded → Collapsed

Use the existing smooth transition.

Do not change the hamburger interaction.

--------------------------------------------------
MAIN NAVIGATION
--------------------------------------------------

Replace the existing:

Home
Products
Category 1
Category 2
Team
Messages
Settings

with:

Home
Opportunities
Skills
Learning
Skill Passport
Applications

Use Lucide React icons.

Suggested icons:

Home → Home
Opportunities → Briefcase
Skills → BrainCircuit
Learning → BookOpen
Skill Passport → BadgeCheck
Applications → ClipboardList

--------------------------------------------------
HOME
--------------------------------------------------

Navigation item:

Home

This should take the user to the KickSkill AI home/chat interface.

Icon:
Home

--------------------------------------------------
OPPORTUNITIES
--------------------------------------------------

Navigation item:

Opportunities

When expanded, make this a collapsible navigation item with these sub-items:

Recommended
Internships
Jobs
Projects

Use:

Briefcase → Opportunities
Sparkles/Search → Recommended
GraduationCap → Internships
BriefcaseBusiness → Jobs
FolderKanban → Projects

Keep the existing collapsible submenu behavior from the component.

--------------------------------------------------
SKILLS
--------------------------------------------------

Navigation item:

Skills

When expanded, show:

My Skills
Skill Gaps
Assessments

Use:

BrainCircuit → Skills
BadgeCheck → My Skills
AlertCircle → Skill Gaps
ClipboardCheck → Assessments

--------------------------------------------------
LEARNING
--------------------------------------------------

Navigation item:

Learning

When expanded, show:

For You
Roadmaps
Courses
Projects

Use:

BookOpen → Learning
Route → Roadmaps
GraduationCap → Courses
FolderKanban → Projects

--------------------------------------------------
SKILL PASSPORT
--------------------------------------------------

Navigation item:

Skill Passport

This represents the user's digital professional portfolio.

When expanded, show:

Overview
Projects
Certifications
Achievements

Use:

BadgeCheck → Skill Passport
UserRound → Overview
Folder → Projects
Award → Certifications
Trophy → Achievements

--------------------------------------------------
APPLICATIONS
--------------------------------------------------

Navigation item:

Applications

When expanded, show:

All Applications
In Progress
Interviews
Offers
Rejected

Use:

ClipboardList → Applications
List → All Applications
LoaderCircle → In Progress
CalendarCheck → Interviews
BadgeCheck → Offers
XCircle → Rejected

--------------------------------------------------
AI AGENT SECTION
--------------------------------------------------

Add a separate section below the main navigation.

Section title:

AI AGENT

Add:

Agent Activity

Use the Bot icon.

When clicked, this should open the user's AI agent activity.

Example activity:

Searching opportunities
Analyzing job requirements
Preparing applications
Applications submitted
Application tracking

The Agent Activity item should feel important but should NOT visually overpower the rest of the sidebar.

--------------------------------------------------
BOTTOM SECTION
--------------------------------------------------

At the bottom of the sidebar add:

Career Goal
Settings

Use:

Target → Career Goal
Settings → Settings

Keep these pinned toward the bottom, similar to the existing sidebar structure.

--------------------------------------------------
USER PROFILE
--------------------------------------------------

At the very bottom, add a compact user profile area.

Expanded:

[profile icon] Nishant
Student

Collapsed:

Only the profile icon.

Do not use emojis.

--------------------------------------------------
VISUAL DESIGN
--------------------------------------------------

VERY IMPORTANT:

The sidebar must match the EXISTING KickSkill homepage design.

Use the same:

- Dark black background
- Purple/blue Moon aesthetic
- Subtle borders
- Glass/transparent surfaces
- White/light-gray text
- Muted secondary text
- Rounded corners
- Soft hover states
- Minimal glow
- Premium futuristic appearance

Do NOT introduce:
- Bright colors
- New gradients
- White sidebar
- Traditional dashboard styling
- Large colorful icons
- Excessive cards
- Emojis

The sidebar should feel like it belongs to the existing KickSkill homepage.

--------------------------------------------------
COLLAPSED STATE
--------------------------------------------------

Default state:

COLLAPSED

Width approximately:

64px

Show:

Menu icon
KickSkill mark
Navigation icons
AI Agent icon
Career Goal icon
Settings icon
Profile icon

Hide all text labels.

Icons should be centered.

--------------------------------------------------
EXPANDED STATE
--------------------------------------------------

Expanded width approximately:

250–280px

Show:

KickSkill
Navigation labels
Sub-navigation
AI Agent
Career Goal
Settings
User profile

Keep the transition smooth.

The main page content should NOT be permanently pushed into a completely different layout.

The sidebar should overlay or integrate naturally with the existing homepage without destroying the central AI composition.

--------------------------------------------------
IMPORTANT HOMEPAGE INTEGRATION
--------------------------------------------------

The existing KickSkill homepage has:

- Large glowing purple/blue Moon arc
- Centered greeting
- AI prompt box
- KickSkill quick-action buttons

DO NOT CHANGE ANY OF THESE.

The hamburger sidebar is an additional navigation layer.

When the sidebar opens, the homepage should remain visually consistent.

Do not move or redesign the Moon background.

Do not change the prompt box.

Do not change the quick-action buttons.

Do not change the central greeting.

--------------------------------------------------
RESPONSIVE BEHAVIOR
--------------------------------------------------

Desktop:

Collapsed hamburger sidebar by default.

Click hamburger → sidebar expands.

Mobile:

The sidebar should behave as an overlay/drawer.

Click hamburger → sidebar slides in from the left.

Click outside → sidebar closes.

Keep the existing dark Moon visual style behind the overlay.

--------------------------------------------------
NO EMOJIS
--------------------------------------------------

Do not use any emoji characters anywhere.

Use Lucide React icons only.

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

This should feel like:

KickSkill's ChatGPT-style AI workspace

with a clean hamburger navigation on the side.

The hierarchy should be:

KickSkill
↓
Home
Opportunities
Skills
Learning
Skill Passport
Applications
↓
AI Agent
Agent Activity
↓
Career Goal
Settings
↓
Profile

Keep the component visually minimal and premium.

MOST IMPORTANT:
Do not turn this into a conventional dashboard sidebar.

It should remain a clean, collapsible HAMBURGER SIDEBAR that complements the existing KickSkill Moon homepage.