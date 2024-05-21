# School Match Challenge

## Objectives

Broadly, "The system should efficiently allocate teachers to principals' queues while considering geographical location, desired subjects, grades, and teacher credentials."

### Technical Objectives

1. Match teachers with principals based on these criteria

- geography/location
- valid credential (must be "Active")
- principal has an open role with subject/grade that the teacher teaches

2. Teachers may not match with more than `n` principals

## How to install and run the application

1. on the command line run ``
2. cd into the `school_match` directory and run `npm i`
3. the application is currently hard-coded to run against the `sample_data.json` file provided; process the data by running `npm run match`. The results will print to the console.

## How to run tests

1. The test suite is written in typescript (controversial!) and can be run using `npm test`. Coverage is included.

Notes:

1. The number of max matches a teacher can have is set as an env var: `MATCH_LIMIT`; change this value to `1` (make sure the `.env` file is saved) and you will see a difference in the output.
2. I chose not to configure the app to ingest/output to a file, due to time constraints, although I am capable of doing so!
3. I DID NOT optimize this algorithm for two reasons:

- optimization is a LONG process, full of benchmarking and incremental change
- optimization introduces significant complexity and makes for poor readability
