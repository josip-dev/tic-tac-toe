import { PaginatedResponse } from '../models/paginated-response';

export interface TableColumn<T> {
    header: string;
    property: keyof T;
}

export interface TableProps<T> {
    data?: PaginatedResponse<T>;
    itemsPerPage: number;
    dataOffset: number;
    setDataOffset: (offset: number) => void;
    columns: TableColumn<T>[];
    keySelector: (item: T) => React.Key;
    itemDisplay: (item: T, column: keyof T) => React.ReactNode;
}

const Table = <T,>({
    data,
    itemsPerPage,
    dataOffset,
    setDataOffset,
    columns,
    keySelector,
    itemDisplay,
}: TableProps<T>) => {
    const numberOfPages = Math.ceil((data?.count || 0) / itemsPerPage);
    const currentPage = dataOffset / itemsPerPage + 1;

    return (
        <div>
            <table className="table-fixed border-collapse w-full border border-cyan-400 dark:border-cyan-500 bg-white dark:bg-cyan-800 text-sm shadow-sm">
                <thead className="bg-cyan-50 dark:bg-cyan-700">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.property.toString()}
                                className="border border-cyan-300 dark:border-cyan-600 font-semibold p-4 text-cyan-900 dark:text-cyan-200 text-left"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.results.length > 0 ? (
                        data.results.map((item) => (
                            <tr key={keySelector(item)}>
                                {columns.map((column) => (
                                    <td
                                        key={`item.${keySelector(
                                            item
                                        )}.${column.property.toString()}`}
                                        className="border border-cyan-300 dark:border-cyan-700 p-4 text-cyan-500 dark:text-cyan-400"
                                    >
                                        {itemDisplay(item, column.property)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="flex justify-center items-center"
                            >
                                <div>No data</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="m-4 flex justify-between items-center">
                <div>
                    <div>Total: {data?.count}</div>
                </div>

                <div className="gap-4 flex items-center">
                    <button
                        className="w-auto"
                        onClick={() => setDataOffset(dataOffset - itemsPerPage)}
                        disabled={!data?.previous}
                    >
                        Previous
                    </button>

                    <div>
                        Page {currentPage} / {numberOfPages}
                    </div>

                    <button
                        className="w-auto"
                        onClick={() => setDataOffset(dataOffset + itemsPerPage)}
                        disabled={!data?.next}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
