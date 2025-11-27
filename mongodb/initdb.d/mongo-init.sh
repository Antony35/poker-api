set -e

mongosh <<EOF
use $MONGO_INITDB_DATABASE

db.createUser({
  user: '$MONGO_INITDB_USER',
  pwd: '$MONGO_INITDB_PWD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
})

db.createCollection("tables_collection")

db.tables_collection.insertMany([
  {
    name: "noobs",
    small_blind: 10,
    big_blind: 20
  },
  {
    name: "rookies",
    small_blind: 20,
    big_blind: 40
  },
  {
    name: "masters",
    small_blind: 100,
    big_blind: 200
  }
])

EOF
