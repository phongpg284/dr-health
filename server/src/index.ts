// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import 'reflect-metadata';
import { DB_NAME, DB_URL, JWT_KEY, PORT } from './config';
import { logger } from './config/logger';

import { createServer } from 'http';
import express from 'express';
import ws from 'ws';
import { MongoClient } from 'mongodb';
import { verify } from 'jsonwebtoken';
import path from 'path';

import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import { graphqlUploadExpress } from 'graphql-upload';
import { Accounts } from './resolvers/Account';
import { Devices } from './resolvers/Devices';
import { PubSub } from 'graphql-subscriptions';
import { handleMessageMqtt } from './mqtt/handler';

const main = async (mongoClient: MongoClient | undefined) => {
    try {
        Container.set('pubSub', new PubSub());
        if (mongoClient) {
            Container.set('db', mongoClient.db(DB_NAME));
            Container.set('Accounts', Accounts);
            Container.set('Devices', Devices);
        }
    } catch (error) {
        console.error("Error MONGODB: ", error);
        throw new Error(error);
    }
    handleMessageMqtt(Container.get('db'));
    const app = express();

    const httpServer = createServer(app);

    app.use((req, res, next) => {
        const token = req.headers.authenticate;
        if (!token) return next();
        try {
            const user = verify(token as string, JWT_KEY);
            (req as any).user = user;
        } catch (error) {
            logger.error(error);
        }
        next();
    });

    const schema = await buildSchema({
        resolvers: [__dirname + '**/resolvers/**.{ts,js}'],
        container: Container,
        pubSub: Container.get('pubSub')
    });

    const apolloServer = new ApolloServer({
        schema,
        plugins: [process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageGraphQLPlayground()]
    });

    await apolloServer.start();
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    apolloServer.applyMiddleware({ app });

    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.get('/game-files/:accountId/:gameId/:fileName', (req, res) => {
        const file = path.join(__dirname, `../games/${req.params.accountId}/Game_${req.params.gameId}/${req.params.fileName}`);
        res.sendFile(file);
        // const filename = path.basename(file);
        // const mimetype = (mime as any).getType(file);

        // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        // res.setHeader('Content-type', mimetype);

        // const filestream = createReadStream(file);
        // filestream.pipe(res);
    });

    const server = httpServer.listen(PORT, () => {
        logger.info(`Server is running at port ${PORT}`);
        const wsServer = new ws.Server({
            server,
            path: '/graphql'
        });
        useServer({ schema }, wsServer);
    });
};

MongoClient.connect(DB_URL, (err, mongoClient) => {
    if (err) {
        logger.error(err.message);
        process.exit(1);
    }
    logger.info(`Connected successfully to database at: ${DB_URL}`);
    main(mongoClient);
});
