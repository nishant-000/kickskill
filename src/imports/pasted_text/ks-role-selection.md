Create the next page for the existing KickSkill application.

PAGE NAME:
KICKSKILL ROLE SELECTION

IMPORTANT:
This page is the ENTRY POINT into the KickSkill platform after the user clicks Sign Up.

Do NOT create the Industry Portal yet.

Do NOT create a dashboard.

Do NOT redesign the existing product.

Keep the EXACT SAME KickSkill visual language already established across the existing pages.

Preserve:
- Dark black background
- Purple/blue Moon aesthetic
- Existing glowing Moon arc
- Existing lighting
- Existing typography
- Existing font
- Existing spacing
- Existing glassmorphism
- Existing subtle borders
- Existing rounded corners
- Existing button style
- Existing Lucide icons
- Existing hamburger/sidebar style
- Existing responsive behavior

Do NOT use emojis.

Do NOT introduce new colors.

The page should be extremely clean and focused.

--------------------------------------------------
MAIN QUESTION
--------------------------------------------------

Center the main content on the page.

Large heading:

What brings you to KickSkill?

Subtitle:

Choose how you want to use KickSkill.

Keep the same typography and visual treatment as the existing KickSkill homepage.

--------------------------------------------------
TWO OPTIONS
--------------------------------------------------

Create exactly TWO large selectable options.

OPTION 1:

I'm looking for opportunities

Supporting text:

Find internships, jobs and projects that match my skills.

Small supporting points:

Skill Assessment
Personalized Learning
Skill Passport
AI Opportunity Matching
Application Tracking

Button:

[ Continue as Student ]

Icon:

GraduationCap

--------------------------------------------------

OPTION 2:

I'm hiring / looking for talent

Supporting text:

Find students and professionals with the skills your organization needs.

Small supporting points:

Post Opportunities
AI Skill Matching
Verified Candidate Profiles
Shortlisting
Recruitment Management

Button:

[ Continue as Industry ]

Icon:

Building2

--------------------------------------------------
CARD DESIGN
--------------------------------------------------

The two options should use the SAME glassmorphism style already used throughout KickSkill.

Use:

- Dark transparent background
- Subtle border
- Soft glow on hover
- Rounded corners
- Clean typography
- Minimal icons

Do NOT make the cards colorful.

When hovering:

Slight border/glow increase.

When selected:

Use a subtle purple/blue accent consistent with the existing Moon theme.

--------------------------------------------------
NO OTHER OPTIONS
--------------------------------------------------

Do NOT add:

Faculty

Institution

Admin

Recruiter

Teacher

Company

Researcher

or additional role cards on this screen.

For the first version, keep the primary decision to exactly:

STUDENT
or
INDUSTRY

Other roles can be handled later inside the platform.

--------------------------------------------------
WORKFLOW
--------------------------------------------------

The most important part of this page is the branching workflow.

If the user selects:

CONTINUE AS STUDENT

go to:

STUDENT VERIFICATION / AI ASSESSMENT

If the user selects:

CONTINUE AS INDUSTRY

go to:

INDUSTRY ONBOARDING

Do NOT show both workflows on the same page.

--------------------------------------------------
STUDENT WORKFLOW
--------------------------------------------------

After selecting:

I'm looking for opportunities

the user should enter an AI-powered onboarding flow.

The first screen should say:

Let's understand where you stand.

Subtitle:

KickSkill will ask you a few questions to understand your skills, experience and career goals.

Button:

[ Start AI Assessment ]

Secondary:

[ I'll do this later ]

--------------------------------------------------
AI VERIFICATION
--------------------------------------------------

This is a CORE FEATURE of KickSkill.

Do NOT make the student simply enter their skills manually and immediately receive a Skill Passport.

KickSkill should verify the student's knowledge through an AI-driven assessment.

The AI should ask questions based on:

- Target career
- Claimed skills
- Education
- Projects
- Experience
- Desired opportunities

--------------------------------------------------
AI INTERVIEW EXPERIENCE
--------------------------------------------------

Create an AI interview interface.

Heading:

Skill Verification

Subtitle:

"Let's verify what you know."

Show:

Question 1 of 10

AI:

"Tell me how you would approach building a machine learning model when the dataset contains missing values."

Below:

Large response input box

Placeholder:

"Explain your approach..."

Buttons:

[ Submit Answer ]

[ Skip ]

--------------------------------------------------
ADAPTIVE QUESTIONS
--------------------------------------------------

The AI should NOT ask the same fixed questions to everyone.

Questions should adapt based on previous answers.

Example:

Student claims:

Python — Advanced

The AI starts with:

"Explain the difference between a list and a tuple in Python."

If the answer demonstrates strong knowledge:

Increase difficulty.

Next:

"How would you optimize a Python application that is processing millions of records?"

If the answer is weak:

Decrease difficulty and verify fundamentals.

This should create an adaptive assessment.

--------------------------------------------------
MULTIPLE ASSESSMENT TYPES
--------------------------------------------------

The AI verification flow should eventually support:

Technical Questions

Scenario Questions

Problem Solving

Aptitude

Communication

Behavioral Questions

Industry-specific Questions

Do NOT show all of these at once.

KickSkill should determine which questions are relevant.

--------------------------------------------------
CLAIM VS VERIFIED
--------------------------------------------------

This is very important.

If the student claims:

Python — 90%

After assessment, KickSkill might determine:

Python

Claimed:
90%

Verified:
82%

Status:

Verified

The platform should distinguish between:

Claimed Skills

and

Verified Skills

Do not automatically trust user-entered skill levels.

--------------------------------------------------
AI ASSESSMENT RESULT
--------------------------------------------------

After the assessment, show:

YOUR VERIFIED SKILL PROFILE

Example:

Python
82%
Verified

Machine Learning
74%
Verified

SQL
79%
Verified

PyTorch
41%
Developing

Docker
35%
Needs Verification

Then:

Career Readiness

78%

--------------------------------------------------
AI EXPLANATION
--------------------------------------------------

Add:

KICKSKILL ANALYSIS

Example:

"Your Python fundamentals are strong and your machine learning knowledge is developing well.

Your biggest gaps for AI/ML internships are PyTorch and deployment.

You currently qualify for 14 opportunities in your selected career area."

Button:

[ View My Opportunities ]

Secondary:

[ View My Skill Gaps ]

--------------------------------------------------
STUDENT WORKFLOW
--------------------------------------------------

The complete student flow should be:

SIGN UP
↓
CHOOSE:
"I'm looking for opportunities"
↓
CAREER GOAL
↓
AI SKILL VERIFICATION
↓
VERIFIED SKILL PROFILE
↓
SKILL GAP ANALYSIS
↓
PERSONALIZED LEARNING
↓
OPPORTUNITY MATCHING
↓
APPLICATION
↓
AI AGENT
↓
APPLICATION TRACKING

This workflow should connect the pages we have already built.

--------------------------------------------------
INDUSTRY WORKFLOW
--------------------------------------------------

If the user selects:

"I'm hiring / looking for talent"

send them to a separate Industry onboarding flow.

First screen:

Tell us what you're looking for.

Fields:

Company Name

Industry

Company Size

Website

Hiring Goal

Then:

[ Continue ]

Next step will eventually be:

Post Opportunity

where the company can provide a job description.

KickSkill will then use AI to extract:

Required Skills

Preferred Skills

Qualifications

Experience

Soft Skills

and create the opportunity.

Do NOT build the complete Industry Portal on this page.

Only establish the branching workflow.

--------------------------------------------------
BACK BUTTON
--------------------------------------------------

Add a subtle:

[ Back ]

button at the top-left of the content area.

It should return the user to the previous authentication/signup step.

--------------------------------------------------
PROGRESS
--------------------------------------------------

For the student flow, show a subtle progress indicator:

Profile
→
Career Goal
→
AI Verification
→
Skill Profile
→
Opportunities

The current stage should be highlighted.

Do not make the progress indicator large.

--------------------------------------------------
AI VERIFICATION PRINCIPLE
--------------------------------------------------

The AI should NOT simply ask:

"What skills do you have?"

Instead, it should VERIFY skills by asking questions that demonstrate actual understanding.

For example:

CLAIM:

"I know Python."

VERIFICATION:

Conceptual question
+
Practical scenario
+
Problem-solving question

Then calculate a verified proficiency.

The verification score should be based on evidence from the assessment.

--------------------------------------------------
ANTI-CHEATING / TRUST
--------------------------------------------------

For the prototype, include a subtle concept of assessment integrity.

The system should be able to detect:

Copied answers
Inconsistent answers
Unsupported skill claims
Extremely unusual answer patterns

Do not make this a large warning section.

The goal is simply to communicate that:

KickSkill does not blindly trust self-reported skills.

--------------------------------------------------
AI AGENT CONNECTION
--------------------------------------------------

The Skill Verification results should become the foundation for the KickSkill Agent.

The agent should use verified skills when:

- Matching opportunities
- Recommending learning
- Generating resumes
- Preparing applications
- Deciding which opportunities meet the user's criteria

The agent must never claim a skill that has not been verified or explicitly provided by the user.

--------------------------------------------------
VISUAL HIERARCHY
--------------------------------------------------

The page should have:

Top:
Minimal KickSkill branding

Center:
What brings you to KickSkill?

Middle:
Two large role cards

Bottom:
Small privacy/trust statement

Example:

"Your information is used to personalize your KickSkill experience."

Keep it subtle.

--------------------------------------------------
RESPONSIVE DESIGN
--------------------------------------------------

Desktop:

Two cards side-by-side.

Mobile:

Cards stacked vertically.

Keep the same spacing and visual hierarchy.

The Moon background should remain visible.

Do not allow horizontal overflow.

--------------------------------------------------
FINAL REQUIREMENT
--------------------------------------------------

This page is NOT a dashboard.

This page is NOT the Industry Portal.

This page is the DECISION POINT that determines which KickSkill workflow the user enters.

The user must choose between exactly two paths:

[ I'm looking for opportunities ]

or

[ I'm hiring / looking for talent ]

Student:

SIGN UP
↓
CAREER GOAL
↓
AI VERIFICATION
↓
VERIFIED SKILLS
↓
SKILL GAPS
↓
LEARNING
↓
OPPORTUNITIES
↓
APPLICATIONS
↓
AI AGENT

Industry:

SIGN UP
↓
COMPANY PROFILE
↓
POST OPPORTUNITY
↓
AI SKILL EXTRACTION
↓
CANDIDATE MATCHING
↓
SHORTLIST
↓
INTERVIEW
↓
HIRE

Keep the entire page consistent with the existing KickSkill Moon design.

No emojis anywhere.