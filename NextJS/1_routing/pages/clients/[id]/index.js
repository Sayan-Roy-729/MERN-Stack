import { useRouter } from "next/router";

const ClientProjects = () => {
    const router = useRouter();
    console.log(router.query);

    const loadProjectHandler = () => {
        // router.push('/clients/sayan/projecta');
        router.push({
            pathname: '/clients/[id]/[clientprojectid]',
            query: {id: 'sayan', clientprojectid: 'projecta'},
        });
    };

    return (
        <div>
            <h1>The projects of a Given CLient</h1>
            <button onClick={loadProjectHandler}>Load Project A</button>
        </div>
    );
};

export default ClientProjects;