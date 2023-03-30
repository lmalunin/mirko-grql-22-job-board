import {DataStore} from 'notarealdb';

export const store = new DataStore('./data');

export default {
    companies: store.collection('companies'),
    jobs: store.collection('jobs'),
    users: store.collection('users')
};
