import { Link, useParams } from "react-router-dom";
import { useDividends } from "../hooks/use-stock-data";

const StockDetail = () => {
  const params = useParams();
  const ticker = params.ticker ? decodeURIComponent(params.ticker) : undefined;
  const { data, loading, error, reload } = useDividends(ticker);

  return (
    <section>
      <header className="page-header">
        <div>
          <h1>{ticker ?? "Stock"}</h1>
          <p>Dividend history</p>
        </div>
        <div className="header-actions">
          <button onClick={reload} type="button">
            Refresh
          </button>
          <Link to="/">Back to overview</Link>
        </div>
      </header>

      {!ticker && <p>Select a stock to view dividends.</p>}
      {loading && <p>Loading dividends...</p>}
      {error && <p role="alert">{error}</p>}

      {ticker && (
        <table className="table">
          <thead>
            <tr>
              <th>Ex-Date</th>
              <th>Pay Date</th>
              <th>Amount</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dividend) => (
              <tr key={dividend.id}>
                <td>{new Date(dividend.exDate).toLocaleDateString()}</td>
                <td>{new Date(dividend.payDate).toLocaleDateString()}</td>
                <td>{dividend.amount.toFixed(4)}</td>
                <td>{dividend.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default StockDetail;
