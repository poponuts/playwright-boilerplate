## Usage with docker

```shell
# Setup
$ docker-compose build
$ docker-compose run frontend yarn
$ docker-compose run backend bin/rails db:create db:migrate

# Start
$ docker-compose up -d

# Open frontend
$ open http://localhost:80 # You'll see yaichi page, then click any app

# Check backend API
$ curl -H 'Host: backend.localhost' http://localhost/session
```

## Usage without docker

Running with docker will require a bit more work as you will need to make sure
you have a postgres database available. The following assumes a:

- default postgres installation
- ruby 3
- nodejs 14

```shell
# Setup backend
$ cd backend
$ bundle install
$ RAILS_DATABASE_HOST=postgres \
  RAILS_DATABASE_USER=postgres \
  RAILS_DATABASE_PASSWORD=password \
  bin/rails db:create db:migrate

# Setup frontend
$ cd frontend
$ npm install -g yarn #if yarn not already installed
$ yarn

# Start backend
$ cd backend
$ RAILS_DATABASE_HOST=postgres \
  RAILS_DATABASE_USER=postgres \
  RAILS_DATABASE_PASSWORD=password \
  bundle exec rails s -p 3000 -b '0.0.0.0'

# Start frontend
$ cd frontend
$ PORT=3001 BACKEND_API_URL=http://localhost:3000 yarn start

# Open frontend
$ open http://localhost:3001

# Check backend API
$ curl http://localhost:3000/session
```

# Test
Refer to this [link](./test/README.md)