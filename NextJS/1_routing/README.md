# Routing:
In Next.js, the routing system is based on file based.
```js
pages
  |--- about
  |     |--- index.js                    // site.com/about
  |--- blog
  |     |--- [...slug].js                // site.com/blog/2020/12  2020/12 it's a slug or date
  |--- clients
  |     |--- [id]
  |     |     |--- [clientprojectid].js  // site.com/client/sayan/project1
  |     |     |--- index.js              // site.com/client/sayan
  |     |--- index.js                    // site.com/client
  |--- portfolio
  |     |--- index.js                   // site.com/portfolio
  |     |--- list.js                    // site.com/portfolio/list
  |     |--- [id].js                    // site.com/portfolio/4
  |--- _app.js
  |--- 404.js                           // For 404 page not found page
  |--- index.js                         // site.com/
```
## Access the dynamic routing data like `site.com/portfolio/4`:

```jsx
import { useRouter } from 'next/router';
// import { withRouter } from 'next/router';  This is for class based components

const PortfolioProjectPage = () => {
    const router = useRouter();
    console.log(router.pathname); // Get the path or route name
    console.log(router.query.id); // Get the dynamic routing data, defined inti folder structure
    return (
        <div>
            <h1>Portfolio Project Page</h1>
        </div>
    );
};

export default PortfolioProjectPage;
```

## Navigate from the one page to another:
### `Link`:
Example - 1:
```jsx
import Link from 'next/link';

const HomePage = () => {
    return (
        <div>
            <h1>The Home Page</h1>
            <ul>
                <li><Link href = '/portfolio'>Portfolio</Link></li>
                <li><Link href = '/clients'>Clients</Link></li>
            </ul>
        </div>
    );
};

export default HomePage;
```
Example - 2:
```jsx
import Link from "next/link";

const ClientsPage = () => {
    const clients = [
        { id: "sayan", name: "Sayan" },
        { id: "roy", name: "Roy" },
    ];
    return (
        <div>
            <h1>The Clients Page</h1>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        <Link href={`/clients/${client.id}`}>
                            {client.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientsPage;
```

But if the routing path is long, then to write again and again, is very conversion. So there is also a solution.
```jsx
import Link from "next/link";

const ClientsPage = () => {
    const clients = [
        { id: "sayan", name: "Sayan" },
        { id: "roy", name: "Roy" },
    ];
    return (
        <div>
            <h1>The Clients Page</h1>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        {/* define links in this way */}
                        <Link href={{
                            pathname: '/clients/[id]',
                            query: {id: client.id},
                        }}>
                            {client.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientsPage;
```

### Navigate Programmatically:
```jsx
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
```