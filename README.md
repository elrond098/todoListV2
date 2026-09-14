
# TodoListApp

This is my first completed small project. Its a common todo list app that many people build. I hope this will make me be a greater programmer in the future.

If you want to use this or want to build this, read what in the below

## Requirements

Before running this project, make sure you have the following installed:

1. PostgreSQL
2. Node.js
3. npm

The required Node.js dependencies are already included in the `package.json` files.

To install the dependencies, go to the `client` and `server` folders and run:

### Client

```bash
cd client
npm install
```

### Server

```bash
cd server
npm install
```

`npm install` will automatically install all dependencies listed in each `package.json` file.

## PostgreSQL Setup

Create a PostgreSQL database, then run the following SQL commands.

### 1. Create the `containers` Table

```sql
CREATE TABLE containers (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
```

### 2. Create the `todolist` Table

```sql
CREATE TABLE todolist (
    id BIGSERIAL PRIMARY KEY,
    container_id BIGINT NOT NULL,
    task VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    position INTEGER,

    CONSTRAINT fk_todolist_containers
        FOREIGN KEY (container_id)
        REFERENCES containers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

### 3. Create the Function

The following function automatically sets the position of a new Todo item based on the existing items in the same container.

```sql
CREATE OR REPLACE FUNCTION set_todolist_position()
RETURNS TRIGGER AS $$
BEGIN
    SELECT COALESCE(MAX(position), -1) + 1
    INTO NEW.position
    FROM todolist
    WHERE container_id = NEW.container_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 4. Create the Trigger

This trigger runs the function before a new Todo item is inserted.

```sql
CREATE TRIGGER trigger_set_todolist_position
BEFORE INSERT ON todolist
FOR EACH ROW
EXECUTE FUNCTION set_todolist_position();
```

## Environment Variables

This project uses environment variables to store the PostgreSQL database configuration.

Create a `.env` file in the appropriate server directory with the following format:

```env
DB_USER=
DB_HOST=localhost
DB_NAME=
DB_PASSWORD=
DB_PORT=5432
```

Enter your own PostgreSQL credentials and database name.

The environment variables are used in:

```text
server/src/db.js
```

### Example

```env
DB_USER=your_username
DB_HOST=localhost
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432
```

> **Important:** Do not commit your `.env` file to GitHub. Add `.env` to your `.gitignore` file to keep your database credentials private.

##### Oke Done, may it helpful for you

