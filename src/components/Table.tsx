import {
    IconChevronLeft,
    IconChevronLeftPipe,
    IconChevronRight,
    IconChevronRightPipe,
} from '@tabler/icons-react';
import { PaginatedResponse } from '../models/paginated-response';
import Button from './Button';

export interface TableColumn<T> {
    header: string;
    property?: keyof T;
    render?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
    data?: PaginatedResponse<T>;
    itemsPerPage: number;
    dataOffset: number;
    setDataOffset: (offset: number) => void;
    columns: TableColumn<T>[];
    keySelector: (item: T) => React.Key;
}

const getColumnKey = <T,>(column: TableColumn<T>) => {
    return column.property?.toString() || column.header;
};

const renderColumn = <T,>(column: TableColumn<T>, item: T) => {
    if (column.render) {
        return column.render(item);
    }

    if (!column.property) {
        return JSON.stringify(item);
    }

    const propertyValue = item[column.property];
    return typeof propertyValue === 'object'
        ? JSON.stringify(propertyValue)
        : String(propertyValue);
};

const Table = <T,>({
    data,
    itemsPerPage,
    dataOffset,
    setDataOffset,
    columns,
    keySelector,
}: TableProps<T>) => {
    const numberOfPages = Math.ceil((data?.count || 0) / itemsPerPage);
    const currentPage = dataOffset / itemsPerPage + 1;

    return (
        <div>
            <table className="table-auto border-collapse w-full border border-cyan-400 bg-white text-sm shadow-sm">
                <thead className="bg-cyan-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={getColumnKey(column)}
                                className="border border-cyan-300 font-semibold p-4 text-cyan-900 text-left"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.results.length > 0 ? (
                        data.results.map((item) => {
                            return (
                                <tr key={keySelector(item)}>
                                    {columns.map((column) => (
                                        <td
                                            key={`item.${keySelector(
                                                item
                                            )}.${getColumnKey(column)}`}
                                            className="border border-cyan-300 p-4 text-cyan-600"
                                        >
                                            {renderColumn(column, item)}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={columns.length}>
                                <div className="flex justify-center items-center p-5">
                                    <div className="text-cyan-600">No data</div>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {data?.count ? (
                <div className="m-4 flex justify-between items-center">
                    <div>Total: {data?.count}</div>

                    <div className="gap-4 flex items-center">
                        <Button
                            onClick={() => setDataOffset(0)}
                            disabled={!data?.previous}
                            icon={<IconChevronLeftPipe />}
                        />

                        <Button
                            onClick={() =>
                                setDataOffset(dataOffset - itemsPerPage)
                            }
                            disabled={!data?.previous}
                            icon={<IconChevronLeft />}
                        />

                        <div>
                            Page {currentPage} / {numberOfPages}
                        </div>

                        <Button
                            onClick={() =>
                                setDataOffset(dataOffset + itemsPerPage)
                            }
                            disabled={!data?.next}
                            icon={<IconChevronRight />}
                        />

                        <Button
                            onClick={() =>
                                setDataOffset(
                                    (numberOfPages - 1) * itemsPerPage
                                )
                            }
                            disabled={!data?.next}
                            icon={<IconChevronRightPipe />}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Table;
