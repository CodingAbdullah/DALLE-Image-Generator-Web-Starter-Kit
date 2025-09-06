# DALL·E Image Generator
#### A handy template for a full stack website that supports all CRUD operations for AI image generation using the DALL·E 3 API.

<br />

OpenAI released their beta version of the image generation API, DALL·E 3. **Create, store and retrieve AI generated images with this site**. 

All the source code for creating the site from the ground up, front to back, can be found here. For further documentation, please refer to the relevant section on technologies used.

<b><u><i>Use this open-source template as a guide for modification according to your needs.</b></u></i>

<br />

#### `The Process`
- Type what you desire as a search
- Size of the image you desire (small/medium/large, the only options supported)
- DALLE 3 generates the desired image using the prompt and size request

<br />

#### `Additional Features`

- User signin/login/logout supported using **Clerk.js**
- Security enhanced with salting/hashing passwords using **bcryptjs**
- Important routes are protected through **Clerk.js**
- Searching and saving images to database supported
- Fetching past images supported
- Validating appropriate emails to be registered to database
- Forgot password feature enabled using the **Resend** package
- Verification codes for verifying password resets are provided by **uuid.v4**

<br />

#### `Tech`

The site uses several technologies and tools. **The project is complete, but more features will be added from time to time to this site**:

- [**AWS**] - AWS services for deploying objects to the cloud (`AWS S3`)
- [**BcryptJS**] - Resourceful library that helps with salting and hashing passwords prior to database storage
- [**ClerkJS**] - Authentication framework useful for authenticating users and protecting routes
- [**Drizzle**] - ORM useful for working with relational databases such as Supabase
- [**GIT**] - Project version control
- [**NextJS**] - Full stack framework used for building out the entire web application
- [**OpenAI**] - API services for imaging provided, validated through the use of keys
- [**ReactJS**] - UI library for creating front-end pages/components, using the latest features
- [**Resend**] - Email NPM package used for sending out emails containing verification codes
- [**Supabase**] - Scalable, relational PostGres SQL database for storing data
- [**TailwindCSS**] - CSS framework for ready-made components

<br />

### `Dockerfile`
Attached within the server folders are Dockerfiles needed to Dockerize the servers and run as standalone containers. This will essentially, allow users to containerize the applications by generating an image to represent the servers and run them as containers.

<br />

### `Scripts`
For basic project setup, scripts for each operating system (MAC/WINDOWS) have been provided as bash, powershell scripts respectively.

<br />

### `License`

MIT