import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import config from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/Hello';
import { PostResolver } from './resolvers/Post';
import { UserResolver } from './resolvers/User';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import session from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import { MyContext } from './Types';
import cors from 'cors';

const main = async () => {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();
  orm.getMigrator().up();

  const RedisStore = connectRedis(session);
  const redisClient = createClient();

  const app = express();
  // app.set('trust proxy', 1);
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }))
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', //csrf protection
        secure: __prod__, // cookies only works in https
      },
      saveUninitialized: false,
      secret: 'keyboardcat',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({req, res}): MyContext => ({ em, req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('Started listening on localhost:4000');
  });
};

main().catch((err) => console.log('error: ', err));
