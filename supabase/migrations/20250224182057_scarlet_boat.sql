/*
  # Insert Programs and Projects Data
  
  1. Programs
    - Inserts 5 main programs with detailed content
    - Each program has title, slug, description, and content
  
  2. Projects 
    - Inserts 5 key projects
    - Each project has title, slug, description and status
*/

-- First verify if data exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM programs LIMIT 1) THEN
    -- Insert programs if table is empty
    INSERT INTO programs (title, slug, description, content, status, created_at, updated_at) VALUES
    (
      'Gender Equality and Social Inclusion Program',
      'gender-equality-and-social-inclusion',
      'Promoting gender equity and equality as fundamental Human Rights and democratic principles. We empower local communities to address gender inequality and social inclusion through comprehensive training and support programs.',
      '• Women Land and Property Rights: Strengthening land rights to build opportunity and improve outcomes for rural women and men, with a focus on widows and women with disabilities.

• Women in and out of prisons: Supporting women affected by the justice system through socio-economic empowerment and rehabilitation services.

• Girls Education and Mentorship: Empowering girls from rural and urban poor schools through career development and mentorship to reduce teenage pregnancy and school dropout rates.

• Women in Leadership and Socio-economic Project: Promoting women''s participation in leadership, politics, and environmental positions to address gender disparities in governance.',
      'active',
      NOW(),
      NOW()
    ),
    (
      'Orphans/Vulnerable Children Project',
      'orphans-vulnerable-children',
      'Supporting grandmothers caring for orphans and vulnerable children (OVC) affected by HIV/AIDS and post-COVID-19, focusing on improving food security, nutrition, health, and socio-economic status.',
      '• Health Support: Providing healthcare access and support for affected families.

• Nutrition Programs: Ensuring proper nutrition for vulnerable children and their caregivers.

• Economic Empowerment: Creating sustainable income opportunities for grandmother-led households.

• Education Support: Facilitating access to education for orphans and vulnerable children.',
      'active',
      NOW(),
      NOW()
    ),
    (
      'Environment, Food Security, Resilience and Livelihood Program',
      'environment-food-security',
      'Increasing resilience to environmental threats and improving food security through sustainable farming methods and conservation agriculture.',
      '• Sustainable Land Management: Implementing sustainable farming practices and soil conservation techniques.

• Income Generation: Developing stable sources of income through agricultural activities.

• Natural Resource Management: Training communities in sustainable use of natural resources.

• Climate Resilience: Building community resilience against climate change impacts.',
      'active',
      NOW(),
      NOW()
    ),
    (
      'Agriculture and Information Technology',
      'agriculture-and-technology',
      'Enhancing technology adoption and promoting youth technical entrepreneurship in agriculture and infrastructure development.',
      '• Digital Agriculture: Implementing smart farming solutions and digital agricultural technologies.

• Youth Empowerment: Supporting youth participation in agricultural entrepreneurship.

• Online Networking: Improving livelihood through digital networking and online agribusiness.

• Infrastructure Development: Enhancing agricultural infrastructure in schools and colleges.',
      'active',
      NOW(),
      NOW()
    ),
    (
      'Soft Skills Training and Leadership',
      'soft-skills-and-leadership',
      'Supporting TVET and NITA graduates through comprehensive skills development and leadership training programs.',
      '• Business Start-up Skills: Training in essential business development and management skills.

• Entrepreneurial Mindset: Developing entrepreneurial thinking and opportunity recognition.

• Creative Thinking: Fostering innovation and problem-solving abilities.

• Visionary Leadership: Building leadership capabilities for community development.',
      'active',
      NOW(),
      NOW()
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM projects LIMIT 1) THEN
    -- Insert projects if table is empty
    INSERT INTO projects (title, slug, description, status, created_at, updated_at) VALUES
    (
      'Community Training Initiative',
      'community-training-initiative',
      'Implementing comprehensive training programs and workshops to build capacity within communities.',
      'ongoing',
      NOW(),
      NOW()
    ),
    (
      'Youth Development Program',
      'youth-development-program',
      'Supporting youth through education and outdoor activities to build life skills and community engagement.',
      'ongoing',
      NOW(),
      NOW()
    ),
    (
      'School Infrastructure Support',
      'school-infrastructure-support',
      'Improving school facilities and infrastructure to enhance the learning environment for students.',
      'ongoing',
      NOW(),
      NOW()
    ),
    (
      'Water Access Program',
      'water-access-program',
      'Improving access to clean water through infrastructure development and community management.',
      'ongoing',
      NOW(),
      NOW()
    ),
    (
      'Agricultural Skills Development',
      'agricultural-skills-development',
      'Training students and community members in sustainable agricultural practices.',
      'ongoing',
      NOW(),
      NOW()
    );
  END IF;
END $$;