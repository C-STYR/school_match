# School Match Challenge

## Objectives

Broadly, "The system should efficiently allocate teachers to principals' queues while considering geographical location, desired subjects, grades, and teacher credentials."

### Technical Objectives

1. Match teachers with principals based on these criteria:

- geography/location
- valid credential (must be "Active")
- principal has an open role with subject/grade that the teacher teaches

2. Teachers may not match with more than `n` principals

### How to install and run the application

THIS APPLICATION RUNS ON NODE v20

1. on the command line run `git clone https://github.com/C-STYR/school_match.git` or the SSH version `git@github.com:C-STYR/school_match.git`
2. `cd` into the `school_match` directory and run `npm i`
3. the application is currently hard-coded to run against the `sample_data.json` file provided; process the data by running `npm run match`. The results will print to the console.

### How to run tests

1. The test suite is written in Typescript (controversial!) and can be run using `npm test`. Coverage is included.

## Notes

1. The max number of matches a teacher can have is set as an env var: `MATCH_LIMIT`; change this value to `1` (make sure the `.env` file is saved if your IDE doesn't save automatically) and you will see a difference in the output.

2. I chose not to configure the app to ingest/output to a file, due to time constraints, although I am capable of doing so!

3. I chose not to configure the application as a server or a CLI (I initially planned the latter for fun). This is process that could be deployed in a number of ways.

4. I DID NOT optimize this algorithm for two reasons:

- optimization is a LONG process, full of benchmarking and incremental change and using huge datasets
- optimization introduces significant complexity and makes for poor readability

### Design Choices, briefly (I will struggle not to write a novel)

Validation and normalization are determined by external factors - how tightly coupled the app and source are, whether systems like `tRPC` are in place, etc. It's hard to see the source data coming from someplace other than a DB in a real-world implementation. As a consequence, I included token functions but they are only a sketch.

The basic premise of the algorithm is to improve efficiency by creating a hashmap of open roles by location and then filtering against teachers without a location match. Although this requires an additional pass through the `teachers` array, I think it makes subsequent handling a bit more straightforward - but this is only a first-step sort of optimization. I chose location as the index for no other reason than it appealed to me - it could also have been by subject and grade. I would guess that more familiarity with the actual production systems would make that chose more obvious.

Looping through the teachers array, the teacher's location is checked against the hashmap entry for that location. Teachers don't need to be compared against roles in any other location. This is a more efficient process because hashmap lookup is very fast, and also obviates the need for 1:1 comparison with all teachers/roles.

The fast-lookup theme is continue in a choice of Map and Set data structures elsewhere, as well as the improved handling and security these DSs provide over POJOs and arrays. But the benefits of this efficiency are almost certainly not ascertainable unless dealing with very large datasets.

I created unit tests for each function, providing good test coverage. I did not create integration tests due to time constraints. My testing strategy in production would have also included integration and E2E tests, depending on the existing infra and CI pipeline.
