import React from 'react';
import {JobList} from './JobList';
import {useJobs} from "./graphql/hooks.js";

export const JobBoard = () => {

    const {jobs, loading, error} = useJobs();

    return (
        <div>
            <h1 className="title">Job Board</h1>
            <JobList jobs={jobs}/>
        </div>
    );
}
