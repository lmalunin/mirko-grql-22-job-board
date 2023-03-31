import {useParams} from "react-router-dom";
import {useCompany} from "./graphql/hooks.js";

export const CompanyDetail = () => {
    const {companyId} = useParams();
    const {company, loading} = useCompany(companyId);

    return (
        <div>
            <h1 className="title">{company?.name}</h1>
            <div className="box">{company?.description}</div>
        </div>
    );

}
