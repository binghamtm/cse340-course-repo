CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
'BrightFuture Builders',
'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
'info@brightfuturebuilders.org',
'brightfuture-logo.png'
),
(
'GreenHarvest Growers',
'An urban farming collective promoting food sustainability and education in local neighborhoods.',
'contact@greenharvest.org',
'greenharvest-logo.png'
),
(
'UnityServe Volunteers',
'A volunteer coordination group supporting local charities and service initiatives.',
'hello@unityserve.org',
'unityserve-logo.png'
);

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    date DATE NOT NULL
);

INSERT INTO service_projects
    (organization_id, title, description, location, date)
VALUES
    -- Organization 1
    (1, 'Math Tutoring Night', 'Help middle school students practice fractions and algebra.', 'Riverside Library', '2027-04-05'),
    (1, 'Classroom Supply Drive', 'Sort donated notebooks and pencils into classroom kits.', 'Lincoln Elementary School', '2027-04-08'),
    (1, 'Resume Workshop', 'Help high school seniors write a resume for their first summer job.', 'Community Learning Center', '2027-04-10'),
    (1, 'Reading Buddies', 'Read picture books with children and help them sound out new words.', 'Westside Library', '2027-04-13'),
    (1, 'Science Fair Prep', 'Help students rehearse presentations and assemble their display boards.', 'Valley Middle School', '2027-04-16'),

    -- Organization 2
    (2, 'Community Garden Planting', 'Plant peas and lettuce in garden beds reserved for the food pantry.', 'Maple Community Garden', '2027-04-06'),
    (2, 'Riverbank Cleanup', 'Collect litter along the river and record the types of waste found.', 'Willow Creek Trail', '2027-04-09'),
    (2, 'Spring Tree Planting', 'Plant native saplings and add mulch around each tree.', 'Cedar Park', '2027-04-12'),
    (2, 'Seed Swap', 'Label donated seed packets and help neighbors choose seeds for their gardens.', 'Grange Hall', '2027-04-15'),
    (2, 'Compost Bin Build', 'Assemble wooden compost bins for gardeners to share.', 'Northside Garden', '2027-04-17'),

    -- Organization 3
    (3, 'Food Pantry Packing', 'Pack shelf-stable groceries into boxes for local families.', 'Valley Food Pantry', '2027-04-07'),
    (3, 'Senior Tech Help', 'Help older adults practice making video calls on their phones.', 'Sunrise Senior Center', '2027-04-10'),
    (3, 'Neighborhood Coat Closet', 'Sort donated jackets by size and restock the clothing racks.', 'Oak Street Community Center', '2027-04-14'),
    (3, 'Blood Drive Welcome Team', 'Greet donors and guide them to the check-in desk.', 'Eastside Community Hall', '2027-04-16'),
    (3, 'Community Dinner', 'Set tables, serve meals, and clean up after a neighborhood dinner.', 'Main Street Fellowship Hall', '2027-04-18');

CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(150) NOT NULL
);

INSERT INTO categories 
	(category_name)
Values 
	('Education and Mentorship'), ('Environmental Conservation'), ('Community Support'), ('Community Outreach');

CREATE TABLE projects_categories (
	project_id INT REFERENCES service_projects(project_id),
	category_id INT REFERENCES categories(category_id),

	PRIMARY KEY (project_id, category_id)
);

INSERT INTO projects_categories
    (project_id, category_id)
VALUES
    -- Education and Mentorship (category_id = 1)
    (1, 1),  -- Math Tutoring Night
    (3, 1),  -- Resume Workshop
    (4, 1),  -- Reading Buddies
    (5, 1),  -- Science Fair Prep
    (12, 1), -- Senior Tech Help

    -- Environmental Conservation (category_id = 2)
    (6, 2),  -- Community Garden Planting
    (7, 2),  -- Riverbank Cleanup
    (8, 2),  -- Spring Tree Planting
    (9, 2),  -- Seed Swap
    (10, 2), -- Compost Bin Build

    -- Community Support (category_id = 3)
    (2, 3),  -- Classroom Supply Drive
    (11, 3), -- Food Pantry Packing
    (13, 3), -- Neighborhood Coat Closet

    -- Community Outreach (category_id = 4)
    (14, 4), -- Blood Drive Welcome Team
    (15, 4); -- Community Dinner