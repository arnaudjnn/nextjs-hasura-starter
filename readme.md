# nextjs-hasura-cloud-starterkit

## Requirements

1. [Node.js](https://nodejs.org/)
2. [npm](https://www.npmjs.com/)

## Setup
### 1. **Setup your [Hasura Cloud](https://cloud.hasura.io/) first**

### 2. **Run Scheme bellow on your hasura console**

```sh
CREATE TABLE accounts (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	compound_id varchar NOT NULL,
	user_id uuid NOT NULL,
	provider_type varchar NOT NULL,
	provider_id varchar NOT NULL,
	provider_account_id varchar NOT NULL,
	refresh_token text NULL,
	access_token text NULL,
	access_token_expires timestamptz NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT accounts_pkey PRIMARY KEY (id)
);


CREATE TABLE feeds (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	author_id uuid NOT NULL,
	body text NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT feeds_pkey PRIMARY KEY (id)
);


CREATE TABLE sessions (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	user_id int4 NOT NULL,
	expires timestamptz NOT NULL,
	session_token varchar NOT NULL,
	access_token varchar NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT sessions_pkey PRIMARY KEY (id)
);


CREATE TABLE users (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	"name" varchar NULL,
	email varchar NOT NULL,
	email_verified timestamptz NULL,
	image varchar NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


CREATE TABLE verification_requests (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	identifier varchar NOT NULL,
	"token" varchar NOT NULL,
	expires timestamptz NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT verification_requests_pkey PRIMARY KEY (id)
);


CREATE UNIQUE INDEX compound_id
  ON accounts(compound_id);

CREATE INDEX provider_account_id
  ON accounts(provider_account_id);

CREATE INDEX provider_id
  ON accounts(provider_id);

CREATE INDEX user_id
  ON accounts(user_id);

CREATE UNIQUE INDEX session_token
  ON sessions(session_token);

CREATE UNIQUE INDEX access_token
  ON sessions(access_token);

CREATE UNIQUE INDEX email
  ON users(email);

CREATE UNIQUE INDEX token
  ON verification_requests(token);
```

## Installation

### 1. **Clone the application**

```sh
git clone https://github.com/brotherbarz/next-auth-hasura-cloud-starterkit.git
```

### 2. **Install necessary dependencies for the application**

```sh
yarn install
```

### 3. **Create a .env file and copy the contents from .env.example (present in frontend directory)**

### 4. **Generate the RSA keys**

```sh
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout > public.pem
```

### 5. **Print the keys in the escaped format**

```sh
awk -v ORS='\\n' '1' private.pem
```

### 6. **Copy the value of the key into the AUTH_PRIVATE_KEY key (in the .env file)**

The **AUTH_PRIVATE_KEY** should look like the following:

```sh
AUTH_PRIVATE_KEY='{"type":"RS256", "key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA0U3NR0eyMehHBlx6DK5sJ+Pys9dTWf558kpKVeQvL2oIZEY3\nLvS3/jdrIm/dU4WrIGPki1r/AWXQAyBZ2FKnZROcUWN0IqdmxrC5zTDymuscqhKX\nqxjSwrwOVWHc+zWWmXCQGmDdoCokXd9ZW66nA0BN66MdMC2+d5GrZdKUF305dpzT\nUdzDE12/XwOEUalCM0703eGu8zFwutLYc3+vf2CFOQ1z+rvDQD4N2aZABKTxZRtE\nkMHljnoyKlF9rljNzT/5N8YQE7qn4pBh6CMa1zcSilk9nhgl55n/Kjn2xMieWdIa\nlaOEKw1LqqIjiT1ESkAKfPaIoSSnmTaYy78gbwIDAQABAoIBAF+3t+AYLqraMdj7\n46j2/2lCupR6LZkjYntmdBZRky6YzBunbMchjR9KEsmd5Na0c20NodAFHkdyWy2C\n1vOx4PG9hShHVi4e5kaJPX9UGi60xNgWRpwtbv01aUysw5VyjVvAeXZGxDPh8d2o\nLcJa3fADsV7IqqmE0ez2hi67nZQbkbEUbKs7aGfCE6srCfjCfOadfNnto9+7qDjJ\nnd4rK18H1rBSLTqj4T7wd1K8THgo25vjEuVRbGsEVrNB/B1Dz0pdOqhqukzixfcS\nVL/7uYDXehLasmUQu2VtMFsLqDpAbQgvpoNnzeZuB0WARvygSi/n4t+pCi84hXXe\na1m/01kCgYEA6+i5FwJAPxe2oCc0iignHjA20itTalyUhgJrLa8tTs721GJ3ku0A\n/EJVgmoNOLCQnZMldWvEDGmf6QuaWitq8ZWK/0BmHrEjbDA7m1fPdf3hrNx6eH/i\nazxjAoWA/u0yZg6QvUC7hSOO6WEpFYGuc2+/mHlnm5RLdL3QNIlHyyUCgYEA4yEI\n2deZ9MgmxbnFc76u7VhT1lc1MHpuAcDR3hqKT9xH2fTBaTDpVqeFbQJR5Hu+ZqgT\nL3+zV5kzIz3RaNMGN1IaxDEEx+tDnL9aw8sqawauWZtp7W2EeFvtP8uhHiBWpqVl\nvus6Gpl6hpNg6X96vHRcW+mB13I/h5YWA25EEwMCgYA5YbkrvJNuBVGZsQ+Zj1y8\nfhPHmVxH4c8KranuSc7mfXcSgAT/ywBTW7s65prisCfs/C6/WgAs2MBZykW4Kxlv\nO+W8Yqi0THgGR9En3vsKgz+ScWqkxs6HMQAQS/LtjzqUEnToY8d5AgYwBD8fCRUq\n5QKgjt9Bu5eDBOyQ6td4tQKBgBtDrOdRfTaoDBdyHGSvgBoXn0C8iTL/j1MAjXDG\n6NF7VNiyC8GP0ILJazfRrnjp7cou5Nav0pxyVHQniIq3wihD39irNbK16BDZ25Bj\nQ/1C+Qzing2VNvCnwEwHKpkOMrigZB1N6VSmFdIvwNNmrRoQMcIKvr5ZBY1GE/Bn\nfR53AoGBAIXaWIoDW5d9XwFa8HdxkgMPyLlizckZKyXASYEGWD2VU8P1NwA/bZ1t\nymioQPRJymTBfUL6E44Ebwx25DezjYEun1yqouZ+WZBlsEYtssffzTs2IocZ6aCN\nYfzt3orUEI/rWbRSqYFEuOntzzf3a7r3MtDU41e7iXcNkRSxCAIV\n-----END RSA PRIVATE KEY-----\n"}'
```

### 7. **Create and copy the Facebook client credentials**

Create a new [Facebook OAuth Client](https://developers.facebook.com/apps/) and copy the credentials (Client ID and Client Secret) in your .env file.

### 8. **Start the frontend application**

From the frontend directory, we can run the following command to start our Next.js frontend application:

```sh
yarn dev
```

The above command will start the frontend application on [http://localhost:3000/](http://localhost:3000).

### 9. **Add JWT_SECRET to your hasura cloud**

```sh
awk -v ORS='\\n' '1' public.pem
```

Copy your secret after run above command and go to your Hasura cloud project and add New Env Var :

![Add JWT_SECRET](https://i.postimg.cc/d3fJKrkH/jwt-secret.jpg)

### 10. **Add ADMIN_SECRET to your hasura cloud**

![Add JWT_SECRET](https://i.postimg.cc/J4K2tMp8/admin-secret.jpg)


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
