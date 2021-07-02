function UserProfilePage(props) {
    return (
        <h1>{props.username}</h1>
    );
}

export default UserProfilePage;

export async function getServerSideProps(context) {
    // These request and response are default node server-side objects
    const { params, req, res } = context;
    console.log(req);
    console.log(res);

    return {
        props: {
            username: 'Sayan'
        },
    };
}