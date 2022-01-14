import postgress from 'pg';
import dotenv from 'dotenv'
const {Pool} = postgress;

dotenv.config()

const PG_URI = process.env.PG_URI

const pool = new Pool({
  connectionString: PG_URI
});

 export default {
  query: (text: string, params?: any, callback?: any) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};