import db from '../models/reactrixModels';
//query for all of a users info

//for all of a reusable component's details?
 
// grabs all information (users.id, users.username, users.password, snapshots_id) from users table and adds in snapshots where snapshots_id = snapshots.id 
// "SELECT users.id, users.username, users.password, snapshots_id FROM users RIGHT OUTER JOIN snapshots ON snapshots_id = snapshots.id;"

// interface IdbController {
//     username: string 
//     findUserQueryString: string
// }



const findUserQueryString = 'SELECT * FROM users WHERE username = $1;'

const createUser = 'INSERT into users (provider, username) VALUES ($1, $2);'

const dbController = {
    handleLogin : async (req: any, res?: any, next?: any): Promise<any> => {
        const user = req;
        // console.log('line 23', user);
        // console.log('dbController req is', req)
        // seems like all of req is the object with user info
        const params = [user.provider, user.username];
        // console.log(params)
        // console.log('line 25 in controller: user.username', user.username)
        // console.log('line 26 in controller: user.provider', user.provider)
    // res = db.query(findUserQueryString, params)
        const userData: any = await db.query(findUserQueryString, [params[1]]);
        // .then(response => console.log('it works'))
        // console.log('line 30 this is res: ', res)
        // console.log('line 30 on controller')
        // .then(response => {
            // console.log('response line 33');
            console.log(userData)
            // if (userData.username?: any  == params[1]){
            if (userData.rows[0]?.username == user.username) {
                console.log('line 37 first conditional passed', userData)
                // iterate through the array value from the property with the key of rows,
                res.username = userData.username;
                return;
            } else {
            await db.query (createUser, params)
            res.provider = params[0];
            res.username = params[1];
            return;
            } 
    // } catch (error) {
    //     console.log(`error in handleLogin: ${error}`);
    // }
            return next();
    // finally{}

}
}

export default dbController;


// private getPostById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
//     const id = request.params.id;
//     const post = await this.postRepository.findOne(id);
//     if (post) {
//       response.send(post);
//     } else {
//       next(new PostNotFoundException(id));
//     }
//   }
