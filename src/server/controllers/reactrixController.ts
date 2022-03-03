import db from '../models/reactrixModels';
import passport from 'passport';

const findUserQueryString = 'SELECT * FROM users WHERE username = $1;';
const createUser = 'INSERT into users (provider, username) VALUES ($1, $2);';

const findReusableComponents = 'SELECT * FROM users RIGHT JOIN reusable_components ON users._id = reusable_components.users_id WHERE users.username = $1;';

const findUserName = 'SELECT _id FROM users WHERE username = $1;';
const insertReusableComponents = 'INSERT INTO reusable_components (label, url, state, hook, users_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;'
const checkReusableComponents = 'SELECT label FROM reusable_components WHERE users_id = $1;'
const deleteReusableComponents = 'DELETE FROM reusable_components WHERE label = $1;'


const dbController = {
  handleLogin: async (req?: any, res?: any, next?: any): Promise<any> => {
    if (!req.user) return next();
    const params = [req.user.username];
    const userData: any = await db.query(findUserQueryString, [params[0]]);
    if (userData.rows.length>= 1) {
      res.locals.username = params[0];
      res.locals.provider = 'github';
      return next();
    } else {
      db.query (createUser, [params,'github']);
      res.locals.provider = params[1];
      res.locals.username = params[0];
      return next();
    }
  },

  getReusableComponents: async (req?: any, res?: any, next?: any): Promise<any> => {
    if (!req){
      return next();
    }
    const userName = res.locals.username;
    const params = [userName];
    const userReusableComponents: any = await db.query(findReusableComponents, [params[0]]);
    if (userReusableComponents) {
      res.locals.reusableComponents = userReusableComponents.rows;
      return next();
    } else {
      console.log (`getReusableComponents error`)
      return next();
    }
  },

  insertReusableComponents: async (req: any, res?: any, next?: any): Promise<any> => {
    if (!req){
      return next();
    }
    if(req.body.reusableComponents.length < 1){
      return next();
    };
    const userId: any = await db.query(findUserName, [req.body.user.user]);
    const realID = userId.rows[0]?._id;
    const doesExist: any = await db.query(checkReusableComponents, [realID]);
    for (let i= 0; i< doesExist.rows.length; i++ ){
      if (doesExist.rows[i].label === req.body.reusableComponents[req.body.reusableComponents.length-1].label){
        res.locals.message = `the label ${req.body.reusableComponents[req.body.reusableComponents.length-1].label} already exists`;
        return next();
      }
    }

    const params = [req.body.reusableComponents[req.body.reusableComponents.length-1].label, req.body.reusableComponents[req.body.reusableComponents.length-1].url, req.body.reusableComponents[req.body.reusableComponents.length-1].state, req.body.reusableComponents[req.body.reusableComponents.length-1].hook, realID];
    const newReusableComponents: any = await db.query(insertReusableComponents, params);
    if (newReusableComponents){
      return next();
    } else {
      console.log('insertReusableComponents error')
      return next();
    }
  },

  deleteReusableComponents: async (req: any, res?: any, next?: any): Promise<any> => {
    console.log('req', req.body)
    const userId: any = await db.query(findUserName, [req.body.user.user]);
    const realID = userId.rows[0]?._id;
    const doesExist: any = await db.query(checkReusableComponents, [realID]);
    for (let i= 0; i< doesExist.rows.length; i++ ){
      if (doesExist.rows[i].label === req.body.reusableComponents){
        await db.query(deleteReusableComponents, [req.body.reusableComponents])
        console.log('this worked in line 83')
        return next();
      }
    }
  },
};

export default dbController;


