import './App.css';
import ReactPaginate from 'react-paginate';

function App() {
  return (
    <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            pageRangeDisplayed={3}
            pageCount={20}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
  );
}

export default App;
