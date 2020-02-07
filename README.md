# Warehop

  

A browser-based warehouse management and invoicing application for small businesses.

  

## Set up development environment

  

1. Install PostgreSQL and create a database.

2. Create a `.env` file for database details, JWT secret and Google login details.

*  `cd warehop-ts/packages/api`

*  `touch .env`

* Add the following variables:
	```
	DB_NAME=database_name
	DB_USER=database_user
	DB_PASSWORD=database_password
	DB_HOST=database_host

	JWT_SECRET=secret_key

	GOOGLE_CLIENT_ID=your_google_client_id
	GOOGLE_CLIENT_SECRET=your_google_client_secret
	```
3. Do the initial compilation of `packages/shared` and `packages/api`:
	```
	cd packages/shared
	yarn build
	cd ../api
	yarn build
	```	
4. Install dependencies and start the application.
	```
	cd [path-to-root-folder]
	yarn install
	yarn watch
	```
5. Access the application at http://localhost:3000.