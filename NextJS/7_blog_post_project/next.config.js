const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            reactStrictMode: true,
            env: {
                mongodb_username: "user2",
                mongodb_password: "Plo4J9c0fuBXAn2h",
                mongodb_clustername: "cluster0",
                mongodb_database: "my-site-dev",
            },
        };
    }

    return {
        env: {
            mongodb_username: "user2",
            mongodb_password: "Plo4J9c0fuBXAn2h",
            mongodb_clustername: "cluster0",
            mongodb_database: "my-site",
        },
    };
};
