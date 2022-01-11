import db from '../models/reactrixModels';
//query for all of a users info
const usersInfo = `SELECT * FROM users WHERE username  = ${req.body.username}`

//for all of a reusable component's details?

//




// grabs all information (users.id, users.username, users.password, snapshots_id) from users table and adds in snapshots where snapshots_id = snapshots.id 
// "SELECT users.id, users.username, users.password, snapshots_id FROM users RIGHT OUTER JOIN snapshots ON snapshots_id = snapshots.id;"







const dbController = {
}



export default dbController;



// starWarsController.addCharacter = (req, res, next) => {
//   // write code here
//   console.log(req.body);
//   //we're going to update our createQuery's values with the values we extracted from the body of the request at run time
//   //use a forin to iterate through the body and push into the sql query values, which we will use db query on after it is updated
//   for (const property in req.body){
//     if (property !== 'species' && property !== 'homeworld' && property !== 'films')
//       createQuery.values.push(req.body[property]);
//   }
//   //then we're going to run the updated sql createQuery on our db, (INSERT INTO)
//   db.query(createQuery)
//     .then (res2 => {
//       //console.log some message confirming the update
//       console.log(createQuery.values);
//       //clear values at the end
//       createQuery.values = [];
//       next();
//     })
//     .catch(err=> console.log(err.stack));
//   //error handling
//   next();
// };
