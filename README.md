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
    "organization" varchar(50) UNIQUE
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
    "user_id" INT REFERENCES "users" NOT NULL
);  

CREATE TABLE "footprints" (
    "id" serial PRIMARY KEY NOT NULL,
    "period" date NOT NULL,
    "project_id" INT REFERENCES "projects" NOT NULL,
    "country_id" INT REFERENCES "countries" NOT NULL,
    "type_id" INT REFERENCES "types" NOT NULL
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
