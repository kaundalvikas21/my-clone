import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import auth from "@/features/auth/server/route";

const app = new Hono().basePath('/api');

const routes = app 
.route("/auth",auth);


// .get("/hello", (c)=>{
//     return c.json({message: "world"})
// })

// .get("/project/:projectId", (c) => {
//     const {projectId} = c.req.param();

//     return c.json({project: projectId});
// });

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;