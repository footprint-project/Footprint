# Project Footprint

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
* Passport.js

## Getting Started

1. Create your SQL database using an application such as Postico, you will find more detailed instructions about that under "installing".
2. Install the prerequisites listed below.
3. In your terminal, type and run "npm install"
4. Once install is complete, type and run "npm start" in your terminal.
5. In your browser navigate to "http://localhost:5000/"

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

### Installing

Create database called "project-footprint":

![footprint_database](https://user-images.githubusercontent.com/29472568/33998428-0db2bf72-e0ad-11e7-850d-934cda2397df.png)

Create SQL database tables:
See file datasetup.sql for queries.
This file also contains sample data that you may use to run a application test.

## Screen Shot

Home Page Preview
![home_page](https://raw.githubusercontent.com/footprint-project/Footprint/master/server/public/images/homepage.png)

Sample Modal Preview
![sample_modal](https://raw.githubusercontent.com/footprint-project/Footprint/master/server/public/images/sample_modal.png)

## Documentation

[user_orientation_document](https://docs.google.com/document/d/1Nf_hs8h83gzrjxEluDcDgb5RvnCmyt_C-7dLo2MXqXY/edit?usp=sharing)

### Completed Features

- [x] Secure registration and log-in
- [x] CSV Upload
- [x] Storing User data after parsing the csv
- [x] Multiple custom charts displaying user data
- [x] Admin feature displaying all user contact information

## Authors

* Zack Stout
* Blaze Fugina
* Jaffa Aharanov
* Holly Tuhake


## Acknowledgments

* Thank you to Prime Digital Academy for Passport local strategy base code.
