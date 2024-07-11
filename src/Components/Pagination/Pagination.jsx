import "./Pagination.scss";

const Pagination = ({ page, setPage, data }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1 ? true : false}
      >{`<`}</button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={data.length >= 15 ? false : true}
      >{`>`}</button>
    </div>
  );
};

export default Pagination;
