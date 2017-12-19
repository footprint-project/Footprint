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
    "user_id" INT REFERENCES "users" NOT NULL,
    "country_id" INT REFERENCES "countries" NOT NULL
);  

CREATE TABLE "project_type" (
    "id" serial PRIMARY KEY NOT NULL,
    "project_id" INT REFERENCES "projects" NOT NULL,
    "type_id" INT REFERENCES "types" NOT NULL
);

CREATE TABLE "footprints" (
    "id" serial PRIMARY KEY NOT NULL,
    "period" date NOT NULL,
    "project_id" INT REFERENCES "projects" NOT NULL
);

CREATE TABLE "living" (
    "id" serial PRIMARY key NOT NULL,
    "hotel" INT,
    "fuel" INT,
    "grid" INT,
    "propane" INT,
    "footprint_id" INT REFERENCES "footprints" NOT NULL
);

CREATE TABLE "travel" (
    "id" serial PRIMARY key NOT NULL,
    "plane" INT,
    "car" INT,
    "train" INT,
    "footprint_id" INT REFERENCES "footprints" NOT NULL
);

CREATE TABLE "shipping" (
    "id" serial PRIMARY key NOT NULL,
    "air" INT,
    "truck" INT,
    "sea" INT,
    "freight_train" INT,
    "footprint_id" INT REFERENCES "footprints" NOT NULL
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

-- The following is dummy data, please use in order to demo the application.
-- *IMPORTANT* Before inserting the following, Create 4 users using the application.

INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('test1', 2, 1);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('test2', 21,4);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('test3', 19, 1);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Protect the Lions', 15, 3);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Safe Tiger', 16, 3);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Bears, Bears, Bears!', 104, 3);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Whale of a Project', 92, 2);
INSERT INTO "projects" ("name", "country_id", "user_id") VALUES ('Clean the Ocean', 100, 2);

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
INSERT INTO "footprints" ("project_id", "period") VALUES (4,'2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-08-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-08-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-02-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (2, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-10-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-02-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4,'2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-10-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-08-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-07-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-07-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-10-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (3, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-06-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-06-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-06-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (8, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-10-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-12-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-04-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (5, '2016-05-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (4, '2016-11-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (7, '2016-09-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-05-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-03-01');
INSERT INTO "footprints" ("project_id", "period") VALUES (6, '2016-04-01');


INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 4);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (350, 40, 100, 13, 8);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (380, 40, 100, 13, 9);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 10);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (370, 40, 100, 13,11);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 141, 100, 13, 12);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 4, 100, 13, 13);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 543, 100, 13, 14);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 234, 100, 13, 15);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 43, 100, 13, 16);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 7666, 543, 13, 17);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 67, 100, 13, 18);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 234, 13, 19);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 55, 13, 20);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 21);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 433, 13, 22);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 23);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (432, 40, 100, 13, 24);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (55, 543, 100, 13, 25);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 26);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 27);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (350, 40, 100, 13, 28);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (380, 40, 100, 13, 29);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 30);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (370, 40, 100, 13, 31);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 141, 100, 13, 32);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 4, 100, 13, 33);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 543, 100, 13, 34);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 234, 100, 13, 35);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 43, 100, 13, 36);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 7666, 543, 13, 37);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 67, 100, 13, 38);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 234, 13, 39);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 55, 13, 40);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 41);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 433, 13, 42);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 40, 100, 13, 43);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (432, 40, 100, 13, 44);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (55, 543, 100, 13, 45);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 132, 46);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 432, 13, 47);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 22, 13, 48);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 49);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 543, 13, 50);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 543, 13, 51);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 52);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 34, 13, 53);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 54, 13, 54);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 55);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 34, 13, 56);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (45, 23, 100, 13, 57);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 58);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 1123, 13, 59);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 60);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (43, 3, 32, 13, 61);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 432, 13, 62);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 324, 100, 13, 63);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 654, 64);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 65);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (543, 23, 432, 13, 66);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 654, 100, 4, 67);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 68);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 324, 100, 13, 69);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 654, 70);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 71);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (543, 23, 432, 13, 72);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 654, 100, 4, 73);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 74);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 75);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 5);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 6);
INSERT INTO "living" ("hotel", "fuel", "grid", "propane", "footprint_id") VALUES (30, 23, 100, 13, 7);


INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (45, 40, 13, 23, 4);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 432, 3, 5);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (534, 54, 76, 143, 6);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 342, 7);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 34, 13, 65, 8);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 3, 654, 9);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 543, 13, 12, 10);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 32, 11);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 432, 12);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (12, 54, 87, 23, 13);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 54, 14);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 432, 432, 234, 15);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (3320, 40, 13, 54, 16);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 3, 13, 543, 17);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (3320, 40, 13,23, 18);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 405, 13, 66, 19);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 23, 20);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 43, 21);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (43, 40, 13, 54, 22);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 33, 23);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 654, 22, 24);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (543, 34, 13, 44, 25);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 153, 54, 26);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 34, 27);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (350, 40, 153, 22,28);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 5, 39);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (350, 450, 13, 34, 40);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 5, 41);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (350, 40, 13, 3, 42);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (330, 40, 13, 0, 43);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 143, 0, 44);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 22, 45);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (350, 4340, 13, 59, 46);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 133, 33, 47);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 543, 13, 55, 48);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 66, 49);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 234, 213, 3, 50);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 423, 13, 54, 51);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 43, 33, 52);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (234, 40, 13, 22, 53);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 543, 13, 11, 54);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 5, 55);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 4, 56);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 45, 66, 57);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (65, 40, 13, 33, 58);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 654, 45, 2, 59);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 55, 60);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 444, 61);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (76, 877, 13, 22, 62);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 11, 645, 55, 63);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 11, 64);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 44, 65);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (55, 44, 654, 22, 66);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 54, 18, 67);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 4, 13, 22, 68);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (654, 40, 13, 11, 69);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 456, 13, 44, 70);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 82, 71);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (45, 40, 13, 22, 72);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 654, 11, 73);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 5, 74);
INSERT INTO "shipping" ("air", "truck", "sea", "freight_train", "footprint_id") VALUES (30, 40, 13, 8, 75);


INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 4);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 45, 163, 5);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (654, 40, 13, 6);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 7);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 65, 8);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 9);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (430, 654, 13, 10);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 440, 13, 11);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 123, 12);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 450, 13, 13);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 153, 14);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (360, 40, 13, 15);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 16);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (306, 40, 153, 17);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 18);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (543, 40, 13, 19);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 543, 13, 20);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 987, 13, 21);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 22);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (654, 40, 34, 23);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 987, 13, 24);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (78, 40, 13, 25);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (32, 432, 13, 26);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 113, 43);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 543, 13, 28);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 444, 29);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 432, 13, 30);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (360, 40, 13, 31);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 87, 13, 32);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 21, 32, 33);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 43, 34);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (760, 6, 13, 35);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 4, 36);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (305, 40, 13, 37);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (21, 40, 13, 38);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (380, 876, 13, 39);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 321, 40);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (1, 40, 12, 41);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 645, 42);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (530, 40, 13, 43);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 44);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (330, 40, 13, 45);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 45, 13, 46);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (23, 40, 654, 47);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 48);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (430, 654, 13, 49);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 65, 13, 50);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 23, 51);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (432, 23, 13, 52);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 53);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 54);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 23, 432, 55);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (532, 40, 13, 56);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 57);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 43, 432, 58);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (23, 40, 13, 59);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 543, 13, 60);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (222, 40, 13, 61);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 65, 13, 62);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (432, 40, 13, 63);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 64);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 54, 13, 65);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 432, 66);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 32, 67);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (432, 40, 13, 68);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 69);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (23, 40, 43, 70);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 34, 13, 71);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 72);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (432, 40, 23, 73);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 40, 13, 74);
INSERT INTO "travel" ("plane", "car", "train", "footprint_id") VALUES (30, 423, 13, 75);
