import {useParams} from "react-router-dom";
import {useCompany, useJobs} from "./graphql/hooks.js";
import {JobList} from "./JobList.js";

export const CompanyDetail = () => {
    const {companyId} = useParams();
    const {company, companyLoading} = useCompany(companyId);

    return (
        <div>
            <h1 className="title">{company?.name}</h1>
            <div className="box">{company?.description}</div>
            <h5 className="title is-5">
                Jobs at {company?.name}
                <JobList jobs={company?.jobs}/>
            </h5>
        </div>
    );

}
