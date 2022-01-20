import pg from 'pg';
import dotenv from 'dotenv'
const {Pool} = pg;

dotenv.config()

const pool = new Pool({
  connectionString: process.env.PG_URI
});

 export default {
  query: (text: string, params?: any, callback?: any) => {
    return pool.query(text, params, callback);
  }
};