# Top-Products-Extractor
An Object-oriented JavaScript application that handles data from a SQL database of products and returns the top 100s for each year/month/week of liked/sold/viewed product

## Installation
1. Clone the repository
2. Run `npm install` to install the dependencies

## Further improvements
- Fix bug that doesn't allow running both the functions inside app.js at once (for generateComparisons to run generateTops needs to be commented). Will fix it in the next commit;
- Using multiple threads to handle the data;
- Using pivot tables to store information about type top and type item to further increase the speed of the application;
- Further separation of concerns between the classes;
- Formating the SQL queries to be more readable;