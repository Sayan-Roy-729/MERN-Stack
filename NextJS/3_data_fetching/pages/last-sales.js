import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales);

    const { data, error } = useSWR(
        "https://demoproject-f-default-rtdb.firebaseio.com/sales.json"
    );

    useEffect(() => {
        if (data) {
            const transformSales = [];
            for (const key in data) {
                transformSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }

            setSales(transformSales);
        }
    }, [data]);

    if (error) {
        return <p>Failed to load</p>;
    }

    if (!data && !sales) {
        return <p>Loading...</p>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    );
};

export async function getStaticProps() {
    const response = await fetch(
        "https://demoproject-f-default-rtdb.firebaseio.com/sales.json"
    );
    const data = await response.json();
    const transformSales = [];
    for (const key in data) {
        transformSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return { props: { sales: transformSales }, revalidate: 10 };
}

export default LastSalesPage;
