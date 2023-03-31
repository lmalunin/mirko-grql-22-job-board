import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useJob} from "./graphql/hooks";

export const JobDetail = () => {

    const {jobId} = useParams();
    const {job, loading} = useJob(jobId);

    return (
        <div>
            <h1 className="title">{job?.title}</h1>
            <h2 className="subtitle">
                <Link to={`/companies/${job?.company?.id}`}>{job?.company?.name}</Link>
            </h2>
            <div className="box">{job?.description}</div>
        </div>
    );

}
