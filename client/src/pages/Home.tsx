import { Link } from "react-router-dom";
import { useStocks } from "../hooks/use-stock-data";

const Home = () => {
  const { data, loading, error, reload } = useStocks();

  return (
    <section>
      <header className="page-header">
        <div>
          <h1>Portfolio Overview</h1>
          <p>Track dividend stocks across markets.</p>
        </div>
        <button onClick={reload} type="button">
          Refresh
        </button>
      </header>

      {loading && <p>Loading stocks...</p>}
      {error && <p role="alert">{error}</p>}

      <ul className="card-list">
        {data.map((stock) => (
          <li key={stock.id} className="card">
            <h2>{stock.name}</h2>
            <p>{stock.ticker}</p>
            <p>
              {stock.currency}{" "}
              {stock.lastPrice !== null && stock.lastPrice !== undefined
                ? stock.lastPrice.toFixed(2)
                : "N/A"}
            </p>
            <Link to={`/stocks/${encodeURIComponent(stock.ticker)}`}>
              View dividends
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
