/*
  # Update Program and Project Content

  1. Updates
    - Add detailed content to existing programs
    - Update program descriptions with more comprehensive information
    - Add additional metadata and content structure

  2. Changes
    - Updates program content with expanded information
    - Enhances program descriptions
    - Adds detailed project information
*/

-- Update Gender Equality program
UPDATE programs
SET content = '2.1 Gender Equality and Social Inclusion Program

FIDIPA believes promoting gender equity and equality is a promotion of fundamental Human Rights and principles/values and democracy. The program seeks to empower the local communities to take positive steps to address gender inequality, social inclusion, and livelihood issues, looking at both men and women as equal partners in community development.

Key Projects:

• Women Land and Property Rights
  - Strengthening land rights for rural women and men
  - Focus on widows and women with disabilities (WWD)
  - Advocacy for women''s land rights and food security
  - Enabling productive ways of survival

• Women in and out of prisons project
  - Socio-economic empowerment for women affected by the justice system
  - Support for rehabilitation and reintegration
  - Skills development and income generation
  - Mental health and emotional support

• Girls Education and Mentorship Project
  - Career development and mentorship for girls
  - Reducing teenage pregnancy and school dropout rates
  - Improving education standards in marginalized communities
  - Operating in Kisumu, Kwale, Kilifi, Homa Bay and Siaya Counties

• Women in Leadership and Socio-economic Project
  - Promoting women''s participation in leadership and politics
  - Addressing gender disparities in governance
  - Training in soft skills and leadership
  - Advocacy through radio and community outreach',
    description = 'FIDIPA believes promoting gender equity and equality is a promotion of fundamental Human Rights and principles/values and democracy. The program empowers local communities to address gender inequality and social inclusion through comprehensive training and support programs.'
WHERE slug = 'gender-equality-and-social-inclusion';

-- Update Orphans/Vulnerable Children program
UPDATE programs
SET content = '2.2 Orphans/Vulnerable Children Project

Program Objectives:
• Increase capacity of rural and urban poor grannies caring for HIV/AIDS affected orphans
• Support grandmothers caring for post-COVID-19 affected children
• Improve food security, nutrition, and health status
• Enhance social and economic status of affected households

Key Components:
• Health Support
  - Access to healthcare services
  - Nutrition programs
  - Hygiene education
  - Mental health support

• Economic Empowerment
  - Income generation activities
  - Skills training
  - Financial management
  - Market access support

• Education Support
  - School fees assistance
  - Learning materials
  - Mentorship programs
  - Academic support

• Community Integration
  - Social support networks
  - Community awareness
  - Anti-stigma programs
  - Family strengthening',
    description = 'Supporting grandmothers caring for orphans and vulnerable children (OVC) affected by HIV/AIDS and post-COVID-19, focusing on improving food security, nutrition, health, and socio-economic status.'
WHERE slug = 'orphans-vulnerable-children';

-- Update Environment program
UPDATE programs
SET content = '2.3 Environment, Food Security, Resilience and Livelihood Program

Program Objectives:
The program seeks to increase resilience to environmental threats and improve food security through sustainable methods.

Key Outcomes:
• Sustainable Land Management
  - Implementation of conservation agriculture
  - Increased crop yields
  - Drought-resistant crop promotion
  - Soil conservation practices

• Income Generation
  - Stable income sources
  - Market access
  - Value addition
  - Agricultural entrepreneurship

• Natural Resource Management
  - Sustainable resource use
  - Environmental conservation
  - Community training
  - Resource monitoring

• Climate Resilience
  - Adaptation strategies
  - Climate-smart agriculture
  - Community preparedness
  - Environmental protection',
    description = 'Increasing resilience to environmental threats and improving food security through sustainable farming methods and conservation agriculture.'
WHERE slug = 'environment-food-security';

-- Update Agriculture and Technology program
UPDATE programs
SET content = '2.4 Agriculture and Information Technology

Program Objectives:
This project aims to enhance technology adoption and promote youth technical entrepreneurship participation.

Key Outcomes:
• Digital Agriculture
  - Smart farming solutions
  - Digital content transformation
  - Online agribusiness
  - Technology integration

• Youth Empowerment
  - Land access initiatives
  - Technical training
  - Entrepreneurship support
  - Digital skills development

• Online Networking
  - Digital platforms
  - Market connections
  - Information sharing
  - Community building

• Infrastructure Development
  - School technology integration
  - College facility enhancement
  - Digital resource centers
  - Training facilities',
    description = 'Enhancing technology adoption and promoting youth technical entrepreneurship in agriculture and infrastructure development.'
WHERE slug = 'agriculture-and-technology';

-- Update Soft Skills program
UPDATE programs
SET content = '2.5 Soft Skills Training and Leadership

Program Vision:
Supporting TVET and NITA graduates to redefine their identities and improve socio-economic situations.

Key Components:
• Business Skills
  - Start-up training
  - Financial management
  - Market analysis
  - Business planning

• Leadership Development
  - Visionary leadership
  - Decision making
  - Team management
  - Strategic thinking

• Creative Thinking
  - Innovation
  - Problem solving
  - Design thinking
  - Adaptability

• Resource Management
  - Mobilization strategies
  - Resource optimization
  - Sustainable practices
  - Project management',
    description = 'Supporting TVET and NITA graduates through comprehensive skills development and leadership training programs.'
WHERE slug = 'soft-skills-and-leadership';

-- Update project descriptions
UPDATE projects
SET description = 'Implementing comprehensive training programs and workshops to build capacity within communities through innovative approaches and sustainable methodologies.'
WHERE slug = 'community-training-initiative';

UPDATE projects
SET description = 'Supporting youth through education, mentorship, and outdoor activities to build essential life skills and enhance community engagement.'
WHERE slug = 'youth-development-program';

UPDATE projects
SET description = 'Improving school facilities and infrastructure to enhance the learning environment and create better educational opportunities for students.'
WHERE slug = 'school-infrastructure-support';

UPDATE projects
SET description = 'Improving access to clean water through sustainable infrastructure development and community-based management systems.'
WHERE slug = 'water-access-program';

UPDATE projects
SET description = 'Training students and community members in sustainable agricultural practices to enhance food security and economic opportunities.'
WHERE slug = 'agricultural-skills-development';