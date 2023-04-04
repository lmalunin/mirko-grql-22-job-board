import {Company, Job} from './db.js';

function rejectIf(condition) {
    if (condition) {
        throw new Error('Unauthorized');
    }
}

export const resolvers = {
    Query: {
        company: (_root, {id}) => Company.findById(id),
        job: (_root, {id}) => Job.findById(id),
        jobs: () => Job.findAll(),
    },

    Company: {
        jobs: (company) => Job.findAll((job) => {
            return job.companyId == company.id;
        })
    },

    Job: {
        company: (job) => Company.findById(job.companyId)
    },

    Mutation: {
        createJob: (_root, {input}, {user}) => {
            rejectIf(!user);
            return Job.create({...input, companyId: user.companyId});
        },
        deleteJob: async (_root, {id}, {user}) => {
            rejectIf(!user);
            const job = await Job.findById(id);
            rejectIf(job.companyId !== user.companyId);
            return Job.delete(id);
        },
    }
};