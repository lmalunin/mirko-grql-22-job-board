import {ApolloServer} from 'apollo-server-express'

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import db, {User} from '../server/db.js';
import {readFile} from 'fs/promises';
import {resolvers} from './resolvers.js';

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(cors(), bodyParser.json(), expressJwt({
    secret: jwtSecret,
    credentialsRequired: false
}));

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = User.findOne((user) => user.email === email).then(user1 => {
        if (!(user1 && user1.password === password)) {
            res.sendStatus(401);
            return;
        }
        const token = jwt.sign({sub: user.id}, jwtSecret);
        res.send({token});
    });

});

const typeDefs = await readFile('./schema.graphql', 'utf8');
const apolloServer = new ApolloServer({typeDefs, resolvers});
await apolloServer.start();
apolloServer.applyMiddleware({app, path: '/graphql'});

app.listen({port}, () => {
    console.info(`Server started on port ${port}`);
    console.log(`GraphQL endpoint: http:localhost:${port}/graphql`);
});
