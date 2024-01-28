"use client"

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
} from "@nextui-org/react";
import {ChevronDownIcon, Edit, Printer, StarIcon} from "lucide-react";
import {SearchIcon} from "@nextui-org/shared-icons";
import 'moment/locale/ka';
import Link from "next/link";
import {Avatar} from "@nextui-org/avatar";
import {cn} from "@/lib/utils";
import CarColumn from "@/components/administration/tables/carsColumn";


const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "სახელი", uid: "name", sortable: true},
    {name: "მგზავრობები", uid: "rides", sortable: true},
    {name: "ავტომობილი", uid: "cars"},
    {name: "რეიტინგი", uid: "ratings", sortable: true},
    {name: "როლი", uid: "role", sortable: true},
    // {name: "გაჩერებები", uid: "stops.count()", sortable: true},
    // {name: "სტატუსი", uid: "status", sortable: true},
    {name: "მოქმედება", uid: "actions"},
];

const statusOptions = [
    {name: "მომხმარებელი", uid: "USER"},
    {name: "ადმინისტრატორი", uid: "ADMIN"},
];


export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const statusColorMap: Record<string, ChipProps["color"]> = {
    USER: "warning",
    ADMIN: "success",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "rides", "cars", "ratings", "role", "actions"];

interface UserTablesProps {
    users: any
}

const CompanyTables = ({users}: UserTablesProps) => {

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "createdAt",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                // user.name.toLowerCase().includes(filterValue.toLowerCase()),
                user.email.toLowerCase().includes(filterValue.toLowerCase()) || user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredUsers;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: UserTablesProps, b: UserTablesProps) => {
            const first = a[sortDescriptor.column as keyof UserTablesProps] as number;
            const second = b[sortDescriptor.column as keyof UserTablesProps] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((user: any, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof UserTablesProps];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-row gap-4">
                        <Avatar isBordered radius="sm" src={user.image}/>
                        <div className="flex flex-col">
                            <p className="text-bold text-small capitalize">
                                <Link href={`/user/${user.id}`}>{cellValue}</Link>
                            </p>
                            <p className="text-bold text-tiny capitalize text-default-400">{user.email}</p>
                        </div>
                    </div>
                );
            case "rides":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-xs capitalize">სულ: <span>{cellValue.map((ride: any) => ride).length}</span>
                        </p>
                        <p className="text-bold text-tiny capitalize text-default-400">
                            დასრულებული: {user.rides.filter((ride: any) => ride.status === "COMPLETED").length}
                        </p>
                    </div>
                );
            case "cars":
                return (
                    <div className="flex flex-col">
                        <CarColumn cars={cellValue}/>
                    </div>
                );
            case "ratings":
                return (
                    <div className="flex flex-col gap-1">
                        <span
                            className="text-bold text-xs capitalize">{cellValue.map((rating: any, index: number) => (
                            <div key={index} className="flex items-center">
                                {[0, 1, 2, 3, 4].map((r) => (
                                    <StarIcon
                                        key={r}
                                        className={cn(
                                            rating.rating > r ? 'text-yellow-400' : 'text-gray-200',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                        ))}</span>
                        <span
                            className="text-bold text-tiny capitalize text-default-400">შეფასებები: {user.ratings.length}</span>
                    </div>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <span
                            className={cn("px-1 py-0.5 rounded-md text-xs text-center", cellValue === "ADMIN" ? "bg-danger-100 text-danger-700" : "bg-amber-100 text-amber-700")}>{cellValue}</span>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Button variant="flat" color="default" size="sm">
                            <Edit width={14}/>
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="მოძებნე სახელის მიხედვით..."
                        startContent={<SearchIcon/>}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                    როლი
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                    სვეტები
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" endContent={<Printer/>}>
                            ამობეჭდვა
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">სულ {users.length} მომხმარებელი</span>
                    <label className="flex items-center text-default-400 text-small">
                        რიგები თითო გვერდზე:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        users.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
              ? "ყველა მონიშნულია"
              : `${filteredItems.length}-დან ${selectedKeys.size} მონიშნული`}
        </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        წინა
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        შემდეგი
                    </Button>
                </div>
            </div>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="მომხმარებლები"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-auto shadow-none border border-default-100 rounded-xl",
            }}
            selectedKeys={selectedKeys}
            selectionMode="none"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns} className="shadow-none">
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                        className="shadow-none border-0 bg-gray-100"
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"მომხმარებელი ვერ მოიძებნა"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>
                            {renderCell(item, columnKey)}
                        </TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
};

export default CompanyTables;
