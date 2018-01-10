-- Once you have created the project-footprint database, use the following queries to create tables and populate the initial static tables:

CREATE TABLE "users" (
    "id" serial PRIMARY key NOT NULL,
    "username" varchar(50) NOT NULL UNIQUE,
    "password" varchar(240) NOT NULL,
    "organization" varchar(50) NOT NULL UNIQUE,
    "name" varchar (50),
    "position" varchar (50)
);

CREATE TABLE "countries" (
    "id" serial PRIMARY key NOT NULL,
    "name" varchar(50) NOT NULL UNIQUE
);

CREATE TABLE "types" (
    "id" serial PRIMARY key NOT NULL,
    "name" varchar(50) NOT NULL UNIQUE
);

CREATE TABLE "projects" (
    "id" serial PRIMARY key NOT NULL,
    "name" varchar(100) NOT NULL,
    "user_id" INT REFERENCES "users" ON DELETE CASCADE NOT NULL,
    "country_id" INT REFERENCES "countries" NOT NULL
);  

CREATE TABLE "project_type" (
    "id" serial PRIMARY KEY NOT NULL,
    "project_id" INT REFERENCES "projects" ON DELETE CASCADE NOT NULL,
    "type_id" INT REFERENCES "types" NOT NULL
);

CREATE TABLE "footprints" (
    "id" serial PRIMARY KEY NOT NULL,
    "period" date NOT NULL,
    "project_id" INT REFERENCES "projects" ON DELETE CASCADE NOT NULL
);

CREATE TABLE "living" (
    "id" serial PRIMARY key NOT NULL,
    "hotel" INT,
    "fuel" INT,
    "grid" INT,
    "propane" INT,
    "footprint_id" INT REFERENCES "footprints" ON DELETE CASCADE NOT NULL
);

CREATE TABLE "travel" (
    "id" serial PRIMARY key NOT NULL,
    "plane" INT,
    "car" INT,
    "train" INT,
    "footprint_id" INT REFERENCES "footprints" ON DELETE CASCADE NOT NULL
);

CREATE TABLE "shipping" (
    "id" serial PRIMARY key NOT NULL,
    "air" INT,
    "truck" INT,
    "sea" INT,
    "freight_train" INT,
    "footprint_id" INT REFERENCES "footprints" ON DELETE CASCADE NOT NULL
);

CREATE TABLE "trial_footprints" (
	  "id" serial PRIMARY KEY,
	  "organization" varchar(50),
    "plane" INT,
    "car" INT,
    "train" INT,
    "hotel" INT,
    "fuel" INT,
    "grid" INT,
    "propane" INT,
    "air" INT,
    "sea" INT,
    "truck" INT,
    "freight_train" INT
	);

INSERT INTO "types" ("name") VALUES ('Health');
INSERT INTO "types" ("name") VALUES ('Food/Nutrition');
INSERT INTO "types" ("name") VALUES ('Education');
INSERT INTO "types" ("name") VALUES ('Non-Food Items (NFI)');
INSERT INTO "types" ("name") VALUES ('Shelter');
INSERT INTO "types" ("name") VALUES ('Conflict');
INSERT INTO "types" ("name") VALUES ('Migration/Camp Management');
INSERT INTO "types" ("name") VALUES ('Faith-Based');
INSERT INTO "types" ("name") VALUES ('Research');
INSERT INTO "types" ("name") VALUES ('Governance');
INSERT INTO "types" ("name") VALUES ('Business/Entrepeneur');
INSERT INTO "types" ("name") VALUES ('Donor');


INSERT INTO "countries" ("name") VALUES ('Algeria');
INSERT INTO "countries" ("name") VALUES ('Angola');
INSERT INTO "countries" ("name") VALUES ('Benin');
INSERT INTO "countries" ("name") VALUES ('Botswana');
INSERT INTO "countries" ("name") VALUES ('Burkina Faso');
INSERT INTO "countries" ("name") VALUES ('Burundi');
INSERT INTO "countries" ("name") VALUES ('Cameroon');
INSERT INTO "countries" ("name") VALUES ('Cape Verde');
INSERT INTO "countries" ("name") VALUES ('Central African Republic');
INSERT INTO "countries" ("name") VALUES ('Chad');
INSERT INTO "countries" ("name") VALUES ('Comoros');
INSERT INTO "countries" ("name") VALUES ('Congo - Brazzaville');
INSERT INTO "countries" ("name") VALUES ('Congo - Kinshasa');
INSERT INTO "countries" ("name") VALUES ('Cote dIvoire');
INSERT INTO "countries" ("name") VALUES ('Djibouti');
INSERT INTO "countries" ("name") VALUES ('Egypt');
INSERT INTO "countries" ("name") VALUES ('Equatorial Guinea');
INSERT INTO "countries" ("name") VALUES ('Eritrea');
INSERT INTO "countries" ("name") VALUES ('Ethiopia');
INSERT INTO "countries" ("name") VALUES ('Gabon');
INSERT INTO "countries" ("name") VALUES ('Gambia');
INSERT INTO "countries" ("name") VALUES ('Ghana');
INSERT INTO "countries" ("name") VALUES ('Guinea');
INSERT INTO "countries" ("name") VALUES ('Guinea-Bissau');
INSERT INTO "countries" ("name") VALUES ('Kenya');
INSERT INTO "countries" ("name") VALUES ('Lesotho');
INSERT INTO "countries" ("name") VALUES ('Liberia');
INSERT INTO "countries" ("name") VALUES ('Libya');
INSERT INTO "countries" ("name") VALUES ('Madagascar');
INSERT INTO "countries" ("name") VALUES ('Malawi');
INSERT INTO "countries" ("name") VALUES ('Mali');
INSERT INTO "countries" ("name") VALUES ('Mauritania');
INSERT INTO "countries" ("name") VALUES ('Mauritius');
INSERT INTO "countries" ("name") VALUES ('Mayotte');
INSERT INTO "countries" ("name") VALUES ('Morocco');
INSERT INTO "countries" ("name") VALUES ('Mozambique');
INSERT INTO "countries" ("name") VALUES ('Namibia');
INSERT INTO "countries" ("name") VALUES ('Niger');
INSERT INTO "countries" ("name") VALUES ('Nigeria');
INSERT INTO "countries" ("name") VALUES ('Rwanda');
INSERT INTO "countries" ("name") VALUES ('Reunion');
INSERT INTO "countries" ("name") VALUES ('Saint Helena');
INSERT INTO "countries" ("name") VALUES ('Senegal');
INSERT INTO "countries" ("name") VALUES ('Seychelles');
INSERT INTO "countries" ("name") VALUES ('Sierra Leone');
INSERT INTO "countries" ("name") VALUES ('Somalia');
INSERT INTO "countries" ("name") VALUES ('South Africa');
INSERT INTO "countries" ("name") VALUES ('Sudan');
INSERT INTO "countries" ("name") VALUES ('Swaziland');
INSERT INTO "countries" ("name") VALUES ('Sao Tome and Principe');
INSERT INTO "countries" ("name") VALUES ('Tanzania');
INSERT INTO "countries" ("name") VALUES ('Togo');
INSERT INTO "countries" ("name") VALUES ('Tunisia');
INSERT INTO "countries" ("name") VALUES ('Uganda');
INSERT INTO "countries" ("name") VALUES ('Western Sahara');
INSERT INTO "countries" ("name") VALUES ('Zambia');
INSERT INTO "countries" ("name") VALUES ('Zimbabwe');
INSERT INTO "countries" ("name") VALUES ('Anguilla');
INSERT INTO "countries" ("name") VALUES ('Antigua and Barbuda');
INSERT INTO "countries" ("name") VALUES ('Argentina');
INSERT INTO "countries" ("name") VALUES ('Aruba');
INSERT INTO "countries" ("name") VALUES ('Bahamas');
INSERT INTO "countries" ("name") VALUES ('Barbados');
INSERT INTO "countries" ("name") VALUES ('Belize');
INSERT INTO "countries" ("name") VALUES ('Bermuda');
INSERT INTO "countries" ("name") VALUES ('Bolivia');
INSERT INTO "countries" ("name") VALUES ('Brazil');
INSERT INTO "countries" ("name") VALUES ('British Virgin Islands');
INSERT INTO "countries" ("name") VALUES ('Canada');
INSERT INTO "countries" ("name") VALUES ('Cayman Islands');
INSERT INTO "countries" ("name") VALUES ('Chile');
INSERT INTO "countries" ("name") VALUES ('Columbia');
INSERT INTO "countries" ("name") VALUES ('Costa Rica');
INSERT INTO "countries" ("name") VALUES ('Cuba');
INSERT INTO "countries" ("name") VALUES ('Dominica');
INSERT INTO "countries" ("name") VALUES ('Dominican Republic');
INSERT INTO "countries" ("name") VALUES ('Ecuador');
INSERT INTO "countries" ("name") VALUES ('El Salvador');
INSERT INTO "countries" ("name") VALUES ('Falkland Islands');
INSERT INTO "countries" ("name") VALUES ('French Guiana');
INSERT INTO "countries" ("name") VALUES ('Greenland');
INSERT INTO "countries" ("name") VALUES ('Grenada');
INSERT INTO "countries" ("name") VALUES ('Guadeloupe');
INSERT INTO "countries" ("name") VALUES ('Guatemala');
INSERT INTO "countries" ("name") VALUES ('Guyana');
INSERT INTO "countries" ("name") VALUES ('Haiti');
INSERT INTO "countries" ("name") VALUES ('Honduras');
INSERT INTO "countries" ("name") VALUES ('Jamaica');
INSERT INTO "countries" ("name") VALUES ('Martinique');
INSERT INTO "countries" ("name") VALUES ('Mexico');
INSERT INTO "countries" ("name") VALUES ('Montserrat');
INSERT INTO "countries" ("name") VALUES ('Netherlands Antilles');
INSERT INTO "countries" ("name") VALUES ('Nicaragua');
INSERT INTO "countries" ("name") VALUES ('Panama');
INSERT INTO "countries" ("name") VALUES ('Paraguay');
INSERT INTO "countries" ("name") VALUES ('Peru');
INSERT INTO "countries" ("name") VALUES ('Puerto Rico');
INSERT INTO "countries" ("name") VALUES ('Saint Barthelemy');
INSERT INTO "countries" ("name") VALUES ('Saint Kitts and Nevis');
INSERT INTO "countries" ("name") VALUES ('Saint Lucia');
INSERT INTO "countries" ("name") VALUES ('Saint Martin');
INSERT INTO "countries" ("name") VALUES ('Saint Pierre and Miquelon');
INSERT INTO "countries" ("name") VALUES ('Saint Vincent and the Grenadines');
INSERT INTO "countries" ("name") VALUES ('Suriname');
INSERT INTO "countries" ("name") VALUES ('Trinidad and Tobago');
INSERT INTO "countries" ("name") VALUES ('Turks and Caicos Islands');
INSERT INTO "countries" ("name") VALUES ('U.S. Virgin Islands');
INSERT INTO "countries" ("name") VALUES ('United States');
INSERT INTO "countries" ("name") VALUES ('Uruguay');
INSERT INTO "countries" ("name") VALUES ('Venezuela');
INSERT INTO "countries" ("name") VALUES ('Afghanistan');
INSERT INTO "countries" ("name") VALUES ('Armenia');
INSERT INTO "countries" ("name") VALUES ('Azerbaijan');
INSERT INTO "countries" ("name") VALUES ('Bahrain');
INSERT INTO "countries" ("name") VALUES ('Bangladesh');
INSERT INTO "countries" ("name") VALUES ('Bhutan');
INSERT INTO "countries" ("name") VALUES ('Brunei');
INSERT INTO "countries" ("name") VALUES ('Cambodia');
INSERT INTO "countries" ("name") VALUES ('China');
INSERT INTO "countries" ("name") VALUES ('Cyprus');
INSERT INTO "countries" ("name") VALUES ('Georgia');
INSERT INTO "countries" ("name") VALUES ('Hong Kong SAR China');
INSERT INTO "countries" ("name") VALUES ('India');
INSERT INTO "countries" ("name") VALUES ('Indonesia');
INSERT INTO "countries" ("name") VALUES ('Iran');
INSERT INTO "countries" ("name") VALUES ('Iraq');
INSERT INTO "countries" ("name") VALUES ('Israel');
INSERT INTO "countries" ("name") VALUES ('Japan');
INSERT INTO "countries" ("name") VALUES ('Jordan');
INSERT INTO "countries" ("name") VALUES ('Kazakhstan');
INSERT INTO "countries" ("name") VALUES ('Kuwait');
INSERT INTO "countries" ("name") VALUES ('Kyrgyzstan');
INSERT INTO "countries" ("name") VALUES ('Laos');
INSERT INTO "countries" ("name") VALUES ('Lebanon');
INSERT INTO "countries" ("name") VALUES ('Macau SAR China');
INSERT INTO "countries" ("name") VALUES ('Malaysia');
INSERT INTO "countries" ("name") VALUES ('Maldives');
INSERT INTO "countries" ("name") VALUES ('Mongolia');
INSERT INTO "countries" ("name") VALUES ('Myanmar [Burma]');
INSERT INTO "countries" ("name") VALUES ('Nepal');
INSERT INTO "countries" ("name") VALUES ('Neutral Zone');
INSERT INTO "countries" ("name") VALUES ('North Korea');
INSERT INTO "countries" ("name") VALUES ('Oman');
INSERT INTO "countries" ("name") VALUES ('Pakistan');
INSERT INTO "countries" ("name") VALUES ('Palestinian Territories');
INSERT INTO "countries" ("name") VALUES ('Peoples Democratic Republic of Yemen');
INSERT INTO "countries" ("name") VALUES ('Philippines');
INSERT INTO "countries" ("name") VALUES ('Qatar');
INSERT INTO "countries" ("name") VALUES ('Saudi Arabia');
INSERT INTO "countries" ("name") VALUES ('Singapore');
INSERT INTO "countries" ("name") VALUES ('South Korea');
INSERT INTO "countries" ("name") VALUES ('Sri Lanka');
INSERT INTO "countries" ("name") VALUES ('Syria');
INSERT INTO "countries" ("name") VALUES ('Taiwan');
INSERT INTO "countries" ("name") VALUES ('Tajikistan');
INSERT INTO "countries" ("name") VALUES ('Thailand');
INSERT INTO "countries" ("name") VALUES ('Timor-Leste');
INSERT INTO "countries" ("name") VALUES ('Turkey');
INSERT INTO "countries" ("name") VALUES ('Turkmenistan');
INSERT INTO "countries" ("name") VALUES ('United Arab Emirates');
INSERT INTO "countries" ("name") VALUES ('Uzbekistan');
INSERT INTO "countries" ("name") VALUES ('Vietnam');
INSERT INTO "countries" ("name") VALUES ('Yemen');
INSERT INTO "countries" ("name") VALUES ('Albania');
INSERT INTO "countries" ("name") VALUES ('Andorra');
INSERT INTO "countries" ("name") VALUES ('Austria');
INSERT INTO "countries" ("name") VALUES ('Belarus');
INSERT INTO "countries" ("name") VALUES ('Belgium');
INSERT INTO "countries" ("name") VALUES ('Bosnia and Herzegovina');
INSERT INTO "countries" ("name") VALUES ('Bulgaria');
INSERT INTO "countries" ("name") VALUES ('Croatia');
INSERT INTO "countries" ("name") VALUES ('Czech Republic');
INSERT INTO "countries" ("name") VALUES ('Denmark');
INSERT INTO "countries" ("name") VALUES ('East Germany');
INSERT INTO "countries" ("name") VALUES ('Estonia');
INSERT INTO "countries" ("name") VALUES ('Faroe Islands');
INSERT INTO "countries" ("name") VALUES ('Finland');
INSERT INTO "countries" ("name") VALUES ('France');
INSERT INTO "countries" ("name") VALUES ('Germany');
INSERT INTO "countries" ("name") VALUES ('Gibraltar');
INSERT INTO "countries" ("name") VALUES ('Greece');
INSERT INTO "countries" ("name") VALUES ('Guernsey');
INSERT INTO "countries" ("name") VALUES ('Hungary');
INSERT INTO "countries" ("name") VALUES ('Iceland');
INSERT INTO "countries" ("name") VALUES ('Ireland');
INSERT INTO "countries" ("name") VALUES ('Isle of Man');
INSERT INTO "countries" ("name") VALUES ('Italy');
INSERT INTO "countries" ("name") VALUES ('Jersey');
INSERT INTO "countries" ("name") VALUES ('Latvia');
INSERT INTO "countries" ("name") VALUES ('Liechtenstein');
INSERT INTO "countries" ("name") VALUES ('Lithuania');
INSERT INTO "countries" ("name") VALUES ('Luxembourg');
INSERT INTO "countries" ("name") VALUES ('Macedonia');
INSERT INTO "countries" ("name") VALUES ('Malta');
INSERT INTO "countries" ("name") VALUES ('Metropolitan France');
INSERT INTO "countries" ("name") VALUES ('Moldova');
INSERT INTO "countries" ("name") VALUES ('Monaco');
INSERT INTO "countries" ("name") VALUES ('Montenegro');
INSERT INTO "countries" ("name") VALUES ('Netherlands');
INSERT INTO "countries" ("name") VALUES ('Norway');
INSERT INTO "countries" ("name") VALUES ('Poland');
INSERT INTO "countries" ("name") VALUES ('Portugal');
INSERT INTO "countries" ("name") VALUES ('Romania');
INSERT INTO "countries" ("name") VALUES ('Russia');
INSERT INTO "countries" ("name") VALUES ('San Marino');
INSERT INTO "countries" ("name") VALUES ('Serbia');
INSERT INTO "countries" ("name") VALUES ('Serbia and Montenegro');
INSERT INTO "countries" ("name") VALUES ('Slovakia');
INSERT INTO "countries" ("name") VALUES ('Slovenia');
INSERT INTO "countries" ("name") VALUES ('Spain');
INSERT INTO "countries" ("name") VALUES ('Svalbard and Jan Mayen');
INSERT INTO "countries" ("name") VALUES ('Sweden');
INSERT INTO "countries" ("name") VALUES ('Switzerland');
INSERT INTO "countries" ("name") VALUES ('Ukraine');
INSERT INTO "countries" ("name") VALUES ('Union of Soviet Socialist Republics');
INSERT INTO "countries" ("name") VALUES ('United Kingdom');
INSERT INTO "countries" ("name") VALUES ('Vatican City');
INSERT INTO "countries" ("name") VALUES ('Aland Islands');
INSERT INTO "countries" ("name") VALUES ('American Samoa');
INSERT INTO "countries" ("name") VALUES ('Antarctica');
INSERT INTO "countries" ("name") VALUES ('Australia');
INSERT INTO "countries" ("name") VALUES ('Bouvet Island');
INSERT INTO "countries" ("name") VALUES ('British Indian Ocean Territory');
INSERT INTO "countries" ("name") VALUES ('Christmas Island');
INSERT INTO "countries" ("name") VALUES ('Cocos [Keeling] Islands');
INSERT INTO "countries" ("name") VALUES ('Cook Islands');
INSERT INTO "countries" ("name") VALUES ('Fiji');
INSERT INTO "countries" ("name") VALUES ('French Polynesia');
INSERT INTO "countries" ("name") VALUES ('French Southern Territories');
INSERT INTO "countries" ("name") VALUES ('Guam');
INSERT INTO "countries" ("name") VALUES ('Heard Island and McDonald Islands');
INSERT INTO "countries" ("name") VALUES ('Kiribati');
INSERT INTO "countries" ("name") VALUES ('Marshall Islands');
INSERT INTO "countries" ("name") VALUES ('Micronesia');
INSERT INTO "countries" ("name") VALUES ('Nauru');
INSERT INTO "countries" ("name") VALUES ('New Caledonia');
INSERT INTO "countries" ("name") VALUES ('New Zealand');
INSERT INTO "countries" ("name") VALUES ('Niue');
INSERT INTO "countries" ("name") VALUES ('Norfolk Island');
INSERT INTO "countries" ("name") VALUES ('Northern Mariana Islands');
INSERT INTO "countries" ("name") VALUES ('Palau');
INSERT INTO "countries" ("name") VALUES ('Papua New Guinea');
INSERT INTO "countries" ("name") VALUES ('Pitcairn Islands');
INSERT INTO "countries" ("name") VALUES ('Samoa');
INSERT INTO "countries" ("name") VALUES ('Solomon Islands');
INSERT INTO "countries" ("name") VALUES ('South Georgia and the South Sandwich Islands');
INSERT INTO "countries" ("name") VALUES ('Tokelau');
INSERT INTO "countries" ("name") VALUES ('Tonga');
INSERT INTO "countries" ("name") VALUES ('Tuvalu');
INSERT INTO "countries" ("name") VALUES ('U.S. Minor Outlying Islands');
INSERT INTO "countries" ("name") VALUES ('Vanuatu');
INSERT INTO "countries" ("name") VALUES ('Wallis and Futuna');

INSERT INTO "users" ("username", "password", "organization", "name", "position") VALUES ('will@footprintproject.org','$2a$10$rIu3wsOUycXc9Jn1Jp8ZfeZsJhYvQ4XcsUKL5n/xhw6GUSOI/betC', 'Footprint', 'Will Heegaard', 'CEO and Founder');

-- The following is dummy data, please use in order to demo the application. 
-- All User passwords are what is in the following quotes, "1"

INSERT INTO "users" ("username", "password", "organization", "name", "position") VALUES ('mark@arc.org','$2a$10$ZbLZG3j66euD1LQY2dRx0ef/lBG/z8OgJa.EVKu.fuZDJOvKbZeje', 'American Refugee Committee', 'Mark Johnson', 'Monitoring Evaluation Coordinator');
INSERT INTO "users" ("username", "password", "organization", "name", "position") VALUES ('mara@housebuilders.org','$2a$10$ZbLZG3j66euD1LQY2dRx0ef/lBG/z8OgJa.EVKu.fuZDJOvKbZeje', 'House Builders', 'Mara Michealson', 'Coordinator');
INSERT INTO "users" ("username", "password", "organization", "name", "position") VALUES ('sally@makingwaves.org','$2a$10$ZbLZG3j66euD1LQY2dRx0ef/lBG/z8OgJa.EVKu.fuZDJOvKbZeje', 'Making Waves', 'Sally Samuelson', 'Accountant');

INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Pure Water', 2, 1);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Healthy People', 21,4);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Better Health', 19, 1);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Educating All', 15, 3);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Making Shelter', 16, 3);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Policy Advocate', 104, 3);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Uncover Cures', 92, 2);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Eco Recover', 100, 2);

INSERT INTO "project_type" ("project_id", "type_id") VALUES (1, 3);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (2, 7);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (3, 5);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (4, 4);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (5, 2);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (6, 1);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (7, 6);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (8, 8);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (2, 9);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (6, 10);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (4, 11);
INSERT INTO "project_type" ("project_id", "type_id") VALUES (1, 12);


INSERT INTO "footprints" ("project_id", "period") VALUES (1,'2016-08-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (2, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (3, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-08-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-10-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-02-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-06-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-07-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-08-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-05-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-06-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-10-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-05-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-10-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-10-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-07-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-04-01');


INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 1);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (350, 40, 100, 13, 2);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (380, 40, 100, 13, 3);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 4);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (370, 40, 100, 13, 5);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 141, 100, 13, 6);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 4, 100, 13, 7);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 543, 100, 13, 8);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 234, 100, 13, 9);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 43, 100, 13, 10);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 7666, 543, 13, 11);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 67, 100, 13, 12);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 234, 13, 13);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 55, 13, 14);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 15);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 433, 13, 16);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 17);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (432, 40, 100, 13, 18);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (55, 543, 100, 13, 19);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 20);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 21);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (350, 40, 100, 13, 22);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (380, 40, 100, 13, 23);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 24);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (370, 40, 100, 13, 25);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 141, 100, 13, 26);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 4, 100, 13, 27);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 543, 100, 13, 28);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 234, 100, 13, 29);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 43, 100, 13, 30);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 7666, 543, 13, 31);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 67, 100, 13, 32);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 234, 13, 33);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 55, 13, 34);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 35);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 433, 13, 36);



INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (45, 40, 13, 23, 1);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 432, 3, 2);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (534, 54, 76, 143, 3);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 342, 4);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 34, 13, 65, 5);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 3, 654, 6);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 543, 13, 12, 7);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 32, 8);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 432, 9);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (12, 54, 87, 23, 10);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 54, 11);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 432, 432, 234, 12);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (3320, 40, 13, 54, 13);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 3, 13, 543, 14);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (3320, 40, 13,23, 15);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 405, 13, 66, 16);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 23, 17);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 43, 18);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (43, 40, 13, 54, 19);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 33, 20);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 654, 22, 21);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (543, 34, 13, 44, 22);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 153, 54, 23);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 34, 24);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (350, 40, 153, 22, 25);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 5, 26);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (350, 450, 13, 34, 27);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 5, 28);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (350, 40, 13, 3, 29);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (330, 40, 13, 0, 30);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 143, 0, 31);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 22, 32);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (350, 4340, 13, 59, 33);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 133, 33, 34);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 543, 13, 55, 35);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 66, 36);

INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 1);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 45, 163, 2);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (654, 40, 13, 3);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 4);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 65, 5);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 6);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (430, 654, 13, 7);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 440, 13, 8);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 123, 9);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 450, 13, 10);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 153, 11);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (360, 40, 13, 12);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 13);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (306, 40, 153, 14);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 15);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (543, 40, 13, 16);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 543, 13, 17);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 987, 13, 18);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 19);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (654, 40, 34, 20);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 987, 13, 21);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (78, 40, 13, 22);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (32, 432, 13, 23);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 113, 24);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 543, 13, 25);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 444, 26);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 432, 13, 27);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (360, 40, 13, 28);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 87, 13, 29);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 21, 32, 30);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 43, 31);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (760, 6, 13, 32);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 4, 33);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (305, 40, 13, 34);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (21, 40, 13, 35);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (380, 876, 13, 36);

