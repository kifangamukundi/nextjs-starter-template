async function getData() {
    const res = await fetch('http://localhost:5000/api/products', { next: { revalidate: 30 } });
    // { cache: 'no-store' }
    // { next: { revalidate: 10 } }
    // The return value is *not* serialized

    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
}

export default async function List () {
    const data = await getData();
    return(
        <div>
            <p>This is list data from server</p>
            <div>{JSON.stringify(data)}</div>
        </div>
    );
}