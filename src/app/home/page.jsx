import { Suspense } from "react";
import Counter from "./Counter";
import List from "./List";
import Loading from "./loading";

export default async function HomePage () {
    return(
        <div>
            <p>The home page</p>
            <Counter/>

            <Suspense fallback={<Loading/>}>
                <List/>
            </Suspense>
        </div>
    );
}