import { Request, Response, NextFunction, request} from 'express';
// import { request } from 'http';
// import superagent from 'superagent';

// // https://github.com/login/oauth/authorize?client_id=d223334a158fd98423d8

// // const clientId= 'd223334a158fd98423d8';
// // const clientSecret = '5201648e266bf4a28fc225e84a7d4db9d04cec0316ff85a93ecd5a711d340f35e1d3b69503197ff1';

const login = (req: Request, res: Response, next: NextFunction) => {
    
    const { query } = req;

    const { code } = query;

    if (!code){
        return res.send({
            success: false,
            message: 'Error: no code'
        });
    }
    return next();
};

export default { login };
// // const auth = (req: Request, res: Response, next: NextFunction) => {
// //     const { query } = req;

// //     const { code } = query;

//     superagent
//         .post('https://github.com/login/oauth/access_token')
//         .send({
//             client_id: 'd223334a158fd98423d8',
//             client_secret: '5201648e266bf4a28fc225e84a7d4db9d04cec0316ff85a93ecd5a711d340f35e1d3b69503197ff1',
//             code: code
//         })
//         .set('Accept', 'application/json')
//         .then(function(result) {
//             const data = result.body;
//             res.send(data);
//         });


//     return next();
// };

// const auth = (req: Request, res: Response, next: NextFunction) => {
//     const accessToken = req.body;

//     superagent
//         .get('https://api.github.com/user')
//         .set('Authorization', 'token' + accessToken)
//         .then(function(result) {
//             res.send(result.body);
//         });

//     return next();
// }

