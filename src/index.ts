import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from './mikro-orm.config';
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import {
    ApolloServerPluginLandingPageGraphQLPlayground
  } from "apollo-server-core";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        }),
        plugins: [
          ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app })

    // just creates a REST api for get request
    // app.get('/', (_, res) => {
    //     res.send("hello")
    // })

    app.listen(4001, () => {
        console.log('server started on localhost:4001')
    })


    // const post = orm.em.create(Post, {title: 'my first post'});
    // await orm.em.persistAndFlush(post);

    // const posts = await orm.em.find(Post, {});
    // console.log(posts)
}

main();

// console.log("Hello orld!");