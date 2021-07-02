import { useRouter } from 'next/router';
// import { withRouter } from 'next/router';  This is for class based components

const PortfolioProjectPage = () => {
    const router = useRouter();

    console.log(router.pathname);
    console.log(router.query);
    
    return (
        <div>
            <h1>Portfolio Project Page</h1>
        </div>
    );
};

export default PortfolioProjectPage;