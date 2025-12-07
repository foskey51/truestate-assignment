# Sales dashboard (truestate assignment)
The Retail Sales Dashboard is a React-based analytics interface designed to view, filter, sort, and explore retail sales data efficiently. It supports both API-powered data fetching and local dummy data fallback.

>Live link: https://foskey51.github.io/truestate-assignment

## Tech stack
- reactJS + tailwind
- fuseJS (for searching)
- axios (for api call)

## Search impl summary
The project uses fuzzy search powered by fuseJS, so the data can be searched even with typo's, misspellings

## Filter impl summary
Filtering is done with simple javascript inbuilt method
```
data.filter(() => ...)
```

## Sorting impl summary
Sorting is done with simple javascript 
```
arrays.sort(data);
```
## Pagination impl summary 
The pagination can be added in the backend with few checks and using `.skip() ` in mongoDB or like with `OFFSET` in postgresql, since the project is for demo purpose I've use a similar logic for frontend only using `arrays.slice()` where offset is controlled by setPage() state.

## SETUP

### 1. clone the project 
```
https://github.com/foskey51/truestate-assignment.git
```

### 2. install and run the project
```
npm i && npm run dev
```

