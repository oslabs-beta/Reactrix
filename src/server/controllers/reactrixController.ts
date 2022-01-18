import { networkInterfaces } from 'os';
import db from '../models/reactrixModels';
//query for all of a users info

// for handleLogin:
const findUserQueryString = 'SELECT * FROM users WHERE username = $1;';
const createUser = 'INSERT into users (provider, username) VALUES ($1, $2);';

// for getReusableComponent:
const findReusableComponents = 'SELECT * FROM users RIGHT JOIN reusable_components ON users._id = reusable_components.users_id WHERE users.username = $1;';

const findUserName = 'SELECT _id FROM users WHERE username = $1;';
const insertReusableComponents = 'INSERT INTO reusable_components (label, url, state, hook, users_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;'
const checkReusableComponents = 'SELECT label FROM reusable_components WHERE users_id = $1;'
// const updateReusableComponents = 'UPDATE reusable_components SET component_name = $1, api_call_url = $2, state = $3, users_id = $4'
const deleteReusableComponentQuery = 'DELETE FROM reusable_components WHERE users_id = $1 AND label = $2;';

const dbController = {
  handleLogin: async (req: any, res?: any, next?: any): Promise<any> => {
    // const user = req;
    // seems like all of req is the object with user info
    console.log('handleLogin', req.user)
    const params = [req.user.provider, req.user.username];
    const userData: any = await db.query(findUserQueryString, [params[1]]);
    // console.log('this is the userData from handleLogin', userData);
    if (userData.rows.length>= 1) {
      console.log('line 37 first conditional passed');
      // iterate through the array value from the property with the key of rows,
      res.locals.username = params[1];
      res.locals.provider = params[0];
      return next();
    } else {
      await db.query(createUser, params);
      res.locals.provider = params[0];
      res.locals.username = params[1];
      return next();
    }
  },

  getReusableComponents: async (req: any, res?: any, next?: any): Promise<any> => {
    // console.log('reactrixController GetReusableComponents', req.user);
    const params = [req.user.username];
    const userReusableComponents: any = await db.query(findReusableComponents, [params[0]]);
    // console.log('coming from getReusableComponents DB QUERY', userReusableComponents);
    if (userReusableComponents) {
      // iterate through the array value from the property with the key of rows,
      // // const { label, url, state, hook } = userReusableComponents.rows[1]
      res.locals.reusableComponents = userReusableComponents.rows;
      res.locals.provider = req.user.provider
      res.locals.username = req.user.username
      return next();
    } else {
      console.log (`getReusableComponents error`)
      return next();
    }
  },

  insertReusableComponents: async (req: any, res?: any, next?: any): Promise<any> => {

    // insertReusableComponents: async (req: any, res?: any, next?: any): Promise<any> => {
      // console.log('this is req.body from insertReusableComponents', req.body);
    if(req.body.reusableComponents.length < 1){
      res.locals.message = 'Hello'
      return next();
    };
    const userId: any = await db.query(findUserName, [req.body.user]);
    const realID = userId.rows[0]?._id;
    const doesExist: any = await db.query(checkReusableComponents, [realID]);
    // console.log(doesExist);
    for (let i= 0; i< doesExist.rows.length; i++ ){
      if (doesExist.rows[i].label === req.body.reusableComponents[req.body.reusableComponents.length-1].label){
        res.locals.message = `the label ${req.body.reusableComponents[req.body.reusableComponents.length-1].label} already exists`;
        return next();
      }
    }

    const params = [req.body.reusableComponents[req.body.reusableComponents.length-1].label, req.body.reusableComponents[req.body.reusableComponents.length-1].url, req.body.reusableComponents[req.body.reusableComponents.length-1].state, req.body.reusableComponents[req.body.reusableComponents.length-1].hook, realID];
    const newReusableComponents: any = await db.query(insertReusableComponents, params);
    if (newReusableComponents){
      res.locals.message = 'successfully saved!'
      return next();
    } else {
      console.log('error during inserting reusable components')
      return next();
    }
  },

  //const findUserName = 'SELECT _id FROM users WHERE username = $1;'
  //const checkReusableComponents = 'SELECT label FROM reusable_components WHERE users_id = $1;'
  // const deleteReusableComponentQuery = 'DELETE FROM reusable_components WHERE users_id = $1 & label = $2;';
  deleteReusableComponents: async (req: any, res?: any, next?: any): Promise<any> => {
    // console.log('this is req.body from deleteReusableComponents', req.body);
    // if(req.body.reusableComponents.length < 1){
    //   res.locals.message = 'Hello'
    //   return next();
    // };
    // find userId
    const userId: any = await db.query(findUserName, [req.body.user]);
    const realID = userId.rows[0]?._id;
    // check if the reusable component where id = the queried id 
    const doesExist: any = await db.query(checkReusableComponents, [realID]);
    // console.log(doesExist);

    // const params = [req.body.reusableComponents[req.body.reusableComponents.length-1].label, req.body.reusableComponents[req.body.reusableComponents.length-1].url, req.body.reusableComponents[req.body.reusableComponents.length-1].state, req.body.reusableComponents[req.body.reusableComponents.length-1].hook, realID];
    const params = [req.body.reusableComponents[req.body.reusableComponents.length-1]._id, req.body.reusableComponents[req.body.reusableComponents.length-1].label]
    const deleteReusableComponents: any = await db.query(deleteReusableComponentQuery, params);
    if (deleteReusableComponents){
      res.locals.message = 'successfully deleted!'
      return next();
    } else {
      console.log('error during deleting reusable components')
      return next();
    }
  }

};

export default dbController;


