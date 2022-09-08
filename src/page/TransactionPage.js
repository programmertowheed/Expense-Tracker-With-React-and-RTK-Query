import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Balance from "../components/Balance";
import Form from "../components/Form";
import Transactions from "../components/Transactions/Transactions";

export default function TransactionPage() {
    const { editing } = useSelector((state) => state.transaction) || {};

    const [viewForm, setViewForm] = useState(false);

    // listen for edit mode active
    useEffect(() => {
        if (editing && editing.id) {
            setViewForm(true);
        } else {
            setViewForm(false);
        }
        window.scrollTo(0, 0);
    }, [editing]);
    return (
        <>
            <Balance />
            {viewForm && <Form />}
            <Transactions />
        </>
    );
}
