import postgress from 'pg';
const {Pool} = postgress;

const PG_URI = 'postgres://cvynjnqp:UeqiAkUctJ3-AvnF_NlRF5dI03oDRIwi@kashin.db.elephantsql.com/cvynjnqp'

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};


// CREATE TABLE users (
// 	id SERIAL PRIMARY KEY,
// 	username varchar(255) NOT NULL,
// 	password varchar(255) NOT NULL,
// 	snapshots_id varchar(255) NOT NULL,
// );

// CREATE TABLE `snapshots` (
// 	`id` numeric NOT NULL AUTO_INCREMENT,
// 	PRIMARY KEY (`id`)
// );

// ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`snapshots_id`) REFERENCES `snapshots`(`id`);


