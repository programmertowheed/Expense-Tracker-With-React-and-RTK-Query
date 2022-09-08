import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./page/Home";
import TransactionPage from "./page/TransactionPage";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/transaction" element={<TransactionPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
