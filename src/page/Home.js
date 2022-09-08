import React from "react";
import Balance from "../components/Balance";
import Form from "../components/Form";
import Transactions from "../components/Transactions/Transactions";

export default function Home() {
    return (
        <>
            <Balance />
            <Form />
            <Transactions home={true} />
        </>
    );
}
