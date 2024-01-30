import React from 'react';

type TableActionsProps = {
    page: number;
    pages: number;
    setPage: (page: number) => void;
    setRowsPerPage: (rowsPerPage: number) => void;
    setFilterValue: (value: string) => void;
}

const useTableActions = ({
                             page,
                             pages,
                             setPage,
                             setRowsPerPage,
                             setFilterValue
                         }: TableActionsProps) => {
    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        onNextPage,
        onPreviousPage,
        onRowsPerPageChange,
        onSearchChange,
        onClear
    }
};

export default useTableActions;
