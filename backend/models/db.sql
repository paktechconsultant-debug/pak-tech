-- Admin users table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100),
  excerpt TEXT,
  content TEXT NOT NULL,
  read_time VARCHAR(20),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  initials VARCHAR(5),
  industry VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  bio TEXT,
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  email VARCHAR(100),
  initials VARCHAR(5),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert existing clients
INSERT INTO clients (name, initials, industry, display_order) VALUES
('Mac Construction Services', 'MC', 'Construction', 1),
('Shoukat and Sons Construction Services', 'SS', 'Construction', 2),
('Structural Designs Engineering Services', 'SD', 'Engineering', 3),
('Fainomch Engineer Services', 'FE', 'Engineering', 4),
('Learn_Swimming SMC Private Limited', 'LS', 'Education', 5),
('Geomax Services', 'GS', 'Services', 6),
('ATS Solutions', 'AT', 'Technology', 7),
('Ayznq Solutions', 'AY', 'Technology', 8),
('Prime Constructions Services', 'PC', 'Construction', 9),
('Sheikh Brothers', 'SB', 'Construction', 10)
ON CONFLICT DO NOTHING;

-- Insert team members
INSERT INTO team_members (name, title, bio, phone, whatsapp, initials, display_order, is_active) VALUES
('Mr. Abbas Ali', 'Chief Executive Officer', 'Mr. Abbas Ali leads Pak-Tech with a strong vision for engineering excellence and technology-driven consultancy. His strategic leadership drives the firm''s growth and commitment to client success.', '+923219637215', '923219637215', 'AA', 1, true),
('Awais Madni', 'Director', 'Awais oversees operations and client delivery at Pak-Tech, ensuring every project is executed with precision, professionalism, and measurable results.', '', '923709440611', 'AM', 2, true)
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, category, excerpt, content, read_time, is_published) VALUES
('The Future of Engineering Consultancy in Pakistan', 'future-engineering-consultancy-pakistan', 'Engineering', 'As Pakistan infrastructure landscape evolves rapidly, engineering consultancy firms are playing an increasingly vital role in shaping the nation''s development.', 'The engineering consultancy sector in Pakistan is undergoing a remarkable transformation. With growing investments in infrastructure, urbanization, and industrial development, the demand for professional engineering services has never been higher. Our firm is at the forefront of this revolution, providing cutting-edge solutions to complex engineering challenges. We believe the future lies in sustainable, technology-driven approaches that balance economic growth with environmental responsibility. Our team is committed to delivering excellence in every project we undertake.', '5 min read', true),
('Why Every Business Needs a Mobile App in 2025', 'why-business-needs-mobile-app-2025', 'Technology', 'Mobile applications have moved from a luxury to a necessity for businesses of all sizes looking to remain competitive.', 'In today''s digital landscape, having a mobile app is no longer optional—it''s essential. Customers expect seamless access to services through their smartphones. A well-designed mobile app can significantly enhance customer engagement, streamline operations, and open new revenue streams. Whether you''re in engineering, retail, or services, a mobile presence is critical. At Pak-Tech, we help businesses develop robust, user-friendly applications that drive growth and customer satisfaction. Our approach combines innovative design with solid technical implementation.', '4 min read', true),
('Infrastructure Development Trends in Islamabad', 'infrastructure-development-trends-islamabad', 'Infrastructure', 'Islamabad is undergoing a significant urban transformation with multiple new development projects reshaping the city landscape.', 'Islamabad is experiencing unprecedented growth in infrastructure development. Major projects including new transportation networks, commercial hubs, and residential complexes are transforming the city. The government''s emphasis on sustainable development and smart city initiatives has attracted both domestic and international investors. Engineering consultants like Pak-Tech play a crucial role in ensuring these projects meet international standards while addressing local needs. We are proud to contribute to Islamabad''s development through our expertise in project planning, design, and execution.', '6 min read', true)
ON CONFLICT DO NOTHING;
