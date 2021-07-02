import { useRouter } from "next/router";

const SelectedClientProjectPage = () => {
    const router = useRouter();
    console.log(router.query);
    return (
        <div>
            <h1>The Project Page for a specific project for a selected client</h1>
        </div>
    );
};

export default SelectedClientProjectPage;