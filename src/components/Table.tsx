import { useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

interface Iprops {
  columns: any;
  data: any;
  clickRedirectURL?: string;
  trClickHandler?: any;
}

function Table({
  columns: COLUMNS,
  data: DATA,
  clickRedirectURL,
  trClickHandler,
}: Iprops) {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => DATA, [DATA]);
  const history = useHistory();
  const tableInstance: any = useTable(
    { columns, data, initialState: { hiddenColumns: ["id"] } },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;
  const GlobalFilter = useCallback(({ filter, setFilter }: any) => {
    return (
      <div className="table-search-box">
        <span>
          Search:
          <input
            type="text"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
          />
        </span>
      </div>
    );
  }, []);
  let clickHandler: any;
  if (trClickHandler) {
    clickHandler = trClickHandler;
  } else if (clickRedirectURL) {
    clickHandler = (event: React.MouseEvent<HTMLElement>) => {
      const id = event.currentTarget.firstChild?.textContent;
      if (clickRedirectURL && id) {
        history.push(clickRedirectURL + id);
      }
    };
  }else{
    clickHandler = undefined;
  }

  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <tr
                onClick={clickHandler}
                {...row.getRowProps()}
              >
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
