import { useRouter } from 'next/router';

function PortfolioProjectPage() {
    const router = useRouter();

    // ? Tells the page routing path
    console.log(router.pathname);
    // ? Tells the dynamic value
    console.log(router.query);

    return (
        <div>
            <h1>The Portfolio Dynamic Product Page</h1>
        </div>
    );
}

export default PortfolioProjectPage;