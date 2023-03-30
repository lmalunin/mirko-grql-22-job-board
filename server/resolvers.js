import * as db from './db.js';

export const resolvers = {
    Query: {
        jobs: async () => db.store.collection('jobs').list(),
    }
};