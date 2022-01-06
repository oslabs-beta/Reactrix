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