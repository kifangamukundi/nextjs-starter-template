export default async function ProductPage ({params}) {
    const id = params.id;
    return(
        <div>Single product: {id}</div>
    );
}