import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";

export default function Transactions({ home }) {
    const dispatch = useDispatch();

    const { transactions, isLoading, isError } = useSelector(
        (state) => state.transaction
    );

    const [filterType, setFilterType] = useState("all");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [parPage, setParPage] = useState(10);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(parPage);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
        setStart(0);
        setEnd(parPage);
    }, [filterType, parPage, search]);

    const handleFilter = (t) => {
        if (filterType !== "all") {
            return t.type === filterType;
        }
        return t;
    };

    const handleSearch = (t) => {
        if (search !== "") {
            return t.name.toLowerCase().includes(search.toLowerCase());
        }
        return t;
    };

    const newArr = transactions.filter(handleFilter).filter(handleSearch);

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading...</p>;

    if (!isLoading && isError)
        content = <p className="error">There was an error occured</p>;

    if (!isLoading && !isError && transactions?.length > 0) {
        if (home) {
            content = transactions
                .slice(transactions.length - 5, transactions.length)
                .map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        transaction={transaction}
                    />
                ));
        } else {
            content = newArr
                .slice(start, end)
                .map((transaction) => (
                    <Transaction
                        key={transaction.id}
                        transaction={transaction}
                    />
                ));
        }
    }

    if (!isLoading && !isError && transactions?.length === 0) {
        content = <p>No transactions found!</p>;
    }

    const handlePaginate = (currPage) => {
        setCurrentPage(currPage);
        setStart(currPage * parPage - parPage);
        setEnd(currPage * parPage);
    };

    let pageArray = [];

    if (newArr.length > parPage) {
        const totalPage = Math.ceil(newArr.length / parPage);
        for (let i = 1; i <= totalPage; i++) {
            pageArray.push(i);
        }
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            {!home && (
                <div className="searchFilterDiv">
                    <div className="filterDiv">
                        <div className="radio_group">
                            <input
                                required
                                id="all"
                                type="radio"
                                value="all"
                                name="type"
                                checked={filterType === "all"}
                                onChange={(e) => setFilterType("all")}
                            />
                            <label htmlFor="all">All</label>
                        </div>
                        <div className="radio_group">
                            <input
                                required
                                id="income"
                                type="radio"
                                value="income"
                                name="type"
                                checked={filterType === "income"}
                                onChange={(e) => setFilterType("income")}
                            />
                            <label htmlFor="income">Income</label>
                        </div>
                        <div className="radio_group">
                            <input
                                type="radio"
                                id="expense"
                                value="expense"
                                name="type"
                                placeholder="Expense"
                                checked={filterType === "expense"}
                                onChange={(e) => setFilterType("expense")}
                            />
                            <label htmlFor="expense">Expense</label>
                        </div>
                    </div>
                    <div className="searchDiv">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            )}

            <div className="conatiner_of_list_of_transactions">
                <ul>{content}</ul>
                {!home && !isLoading && (
                    <div className="pagination">
                        {pageArray?.map((page) => (
                            <div
                                key={page}
                                className={
                                    currentPage === page
                                        ? "page active cursor-pointer"
                                        : "page cursor-pointer"
                                }
                                onClick={() => handlePaginate(page)}
                            >
                                {page}
                            </div>
                        ))}
                    </div>
                )}
                {!home && (
                    <Link to="/" className="btn viewAllBtn">
                        {"< Back Home"}
                    </Link>
                )}
                {home && transactions?.length > 5 && (
                    <Link to="/transaction" className="btn viewAllBtn">
                        View all
                    </Link>
                )}
            </div>
        </>
    );
}
