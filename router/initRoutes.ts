// This file exists to force init of the endpoint files, after the router is initialised

await import("./endpoints/posts.ts");
await import("./endpoints/users.ts");
