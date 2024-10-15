# IT LAB MANAGER
IT Lab Manager is a web application for schools to manage laboratory materials, allowing teachers and staff to monitor inventory and handle material requests.


## Technologies used
- **Frontend & Backend**: Svelte/SvelteKit
- **Database**: MySQL


## How to run this project
1. Clone the repo: `git clone <repository-url>`

Once you've downloaded the project and installed dependencies with `npm install` (or `npm i`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building
To create a production version of your app:
```bash
npm run build
```

## How to set up the database
Requirements: mysql

After installing mysql, log into the shell as root and enter your password:
```bash
mysql -u [user] -p
```

Create the database and exit:
```mysql
CREATE DATABASE it_lab_manager;
```
```mysql
EXIT;
```

Import the example's queries into the database with:
```bash
mysql -u [user] -p it_lab_manager < database.sql
```