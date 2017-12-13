# Name of Project

The Footprint humanitarian responder environmental impact calculator is a full-stack application that will give organizations the opportunity to upload their data and view a timeline-based breakdown of the environmental impacts.
The data is broken down into three categories: travel, living, and shipping. To upload their information into the application, users will enter the website on the home screen and have an option to download an Excel spreadsheet template. Once the Excel spreadsheet is filled out, the information will be uploaded to the application as a CSV.
Once the data is uploaded, users will be directed to the user dashboard where they will see a breakdown of the organization’s carbon footprint. Initially, the environmental impact data is broken down organization-wide. Options will also exist to break down the data by project type, country or mission. Organizations will be compelled to create an account with the Footprint humanitarian responder environmental impact calculator to view a timeline-based breakdown of their data.
The Footprint Project describes itself as a new startup that “combines sustainability consulting with clean energy deployment to help humanitarian responders truly fulfill their commitment to first do no harm.” Footprint has deployed a beta version of this calculator (footprintproject.io), but the organization is seeking an updated application that will give organization more information about their environmental impacts.


## Built With

* Node.js
* Express.js
* Angular.js
* Angular Material
* PostgreSQL
* Heroku
* Chart.js
* Moment.js
* js-xls (Excel-uploading library)
* Passport.js

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)

### Installing

Create database called "project-footprint"

Create SQL database tables:
```sql
CREATE TABLE "users" (
    "id" serial PRIMARY key NOT NULL,
    "username" varchar(50) NOT NULL UNIQUE,
    "password" varchar(240) NOT NULL,
    "organization" varchar(50) UNIQUE,
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
    "country_id" INT REFERENCES "countries" NOT NULL,
);  

CREATE TABLE "project_type" (
    "id" serial PRIMARY KEY NOT NULL,
    "project_id" INT REFERENCES "projects" NOT NULL,
    "type_id" INT REFERENCES "types" NOT NULL
);

CREATE TABLE "footprints" (
    "id" serial PRIMARY KEY NOT NULL,
    "period" date NOT NULL,
    "project_id" INT REFERENCES "projects" NOT NULL,
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
    "footprint_id" INT REFERENCES "footprints" NOT NULL
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


```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [ ] CSV Upload
- [ ] Charts for user data

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Zack Stout
* Blaze Fugina
* Jaffa Aharanov
* Holly Tuhake


## Acknowledgments

* Hat tip to anyone who's code was used
