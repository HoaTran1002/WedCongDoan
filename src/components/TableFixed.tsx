import React, { useState, ReactNode } from 'react';
import {
    Box,
    SxProps,
    Pagination
} from '@mui/material'

export interface ColumnsProps {
    headerName?: string | null,
    field: string,
    type?: string,
    getActions?: (params?: any) => JSX.Element[];
}
interface TableWithFixedColumnProps {
    columns: ColumnsProps[];
    rows: string[];
    maxWidth?: number;
    maxHeight?: number;
    numberItems?: number;
}
export const TableWithFixedColumn: React.FC<TableWithFixedColumnProps> = ({
    columns,
    rows,
    maxWidth,
    maxHeight,
    numberItems
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxWidthTable, setMaxWidthTable] = useState<number>(maxWidth || 700);
    const [maxHeightTable, setMaxHeightTable] = useState<number>(maxHeight || 500);
    const actionsColumn = columns.find((column) => column.type === 'actions');
    const fixed = actionsColumn ? true : false;
    const page = numberItems ? true : false;
    const productsPerPage = numberItems || 0;
    const totalPages = Math.ceil(rows.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentItems = rows.slice(startIndex, endIndex);
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
        setCurrentPage(page);
    };
    console.log('width', maxWidthTable, 'height', maxHeightTable)
    return (
        <>
            {

                page ? (
                    <Box
                        sx={{
                            border: "1px solid #cacaca",
                            borderRadius: "5px",
                            overflow: "hidden",
                            mb:5
                        }}
                    >
                        <Box
                            sx={{
                                ...table_container,
                                width: `${maxWidthTable}px`,
                                height: `${maxHeightTable}px`,
                                '&::-webkit-scrollbar': {
                                    height: "8px",
                                    width: '0px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#35a1ff',
                                    borderRadius: ' 4px',
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    ...scrollable_x,
                                }}
                            >
                                <Box component='table' sx={{ borderCollapse: 'collapse', width: "100%" }}>
                                    <Box
                                        component='thead'
                                    >
                                        <tr>
                                            {columns.filter(r => r.field !== 'actions').map((row, index) => (
                                                <Box
                                                    component='td'
                                                    key={index}
                                                    sx={itemsColumnsHeader}
                                                >
                                                    {row.headerName}
                                                </Box>
                                            ))}
                                        </tr>
                                    </Box>
                                    <tbody>
                                        {currentItems.map((row, index: number) => (
                                            <tr key={index}>
                                                {columns.filter(r => r.field !== 'actions').map((column: any, columnIndex: number) => (
                                                    <Box
                                                        component='td'
                                                        sx={itemsColumnsRows}
                                                        key={columnIndex}
                                                    >
                                                        {row[column.field]}
                                                    </Box>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    ...fixed_column,
                                }}
                            >

                                <Box component='table' sx={{ borderCollapse: 'collapse', backgroundColor: "white" }}>
                                    <thead>
                                        <tr>
                                            <Box
                                                component='td'
                                                sx={itemsColumnsHeader}
                                            >
                                                {
                                                    actionsColumn?.headerName ? actionsColumn.headerName : (
                                                        <span style={{ color: "transparent" }}>.</span>
                                                    )
                                                }
                                            </Box>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <Box
                                                    component='th'
                                                    sx={{
                                                        ...itemsColumnsRows,
                                                        display: "flex",
                                                        gap: '10px',
                                                        alignItems: "center",
                                                        padding: "0 10px 0 20px",
                                                        margin: "0px !important"
                                                    }}
                                                >
                                                    {columns.map((column, columnIndex) => (
                                                        <React.Fragment key={columnIndex}>
                                                            {column.getActions && typeof column.getActions === 'function' && column.getActions(row).map((action, actionIndex) => (
                                                                <span key={actionIndex}>
                                                                    {action}
                                                                </span>
                                                            ))}
                                                        </React.Fragment>
                                                    ))}
                                                </Box>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Box>
                            </Box>

                        </Box>
                        <Box
                            sx={{
                                
                                padding: "10px 35px"
                            }}
                        >
                            <Pagination
                                count={totalPages}
                                color="primary"
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </Box>
                    </Box>
                ) : (
                    fixed ?
                        (
                            <Box
                                sx={{
                                    ...table_container,
                                    width: `${maxWidthTable}px`,
                                    height: `${maxHeightTable}px`,
                                    border: "1px solid #cacaca",
                                    borderRadius: "5px",
                                    '&::-webkit-scrollbar': {
                                        height: "8px",
                                        width: '0px'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: '#35a1ff',
                                        borderRadius: ' 4px',
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        ...scrollable_x,
                                    }}
                                >
                                    <Box component='table' sx={{ borderCollapse: 'collapse', width: "100%" , mb:5}}>
                                        <Box
                                            component='thead'
                                        >
                                            <tr>
                                                {columns.filter(r => r.field !== 'actions').map((row, index) => (
                                                    <Box
                                                        component='td'
                                                        key={index}
                                                        sx={itemsColumnsHeader}
                                                    >
                                                        {row.headerName}
                                                    </Box>
                                                ))}
                                            </tr>
                                        </Box>
                                        <tbody >
                                            {rows.map((row, index: number) => (
                                                <tr key={index}>
                                                    {columns.filter(r => r.field !== 'actions').map((column: any, columnIndex: number) => (
                                                        <Box
                                                            component='td'
                                                            sx={itemsColumnsRows}
                                                            key={columnIndex}
                                                        >
                                                            {row[column.field]}
                                                        </Box>
                                                    ))}
                                                </tr>
                                            ))}
                                            <tr
                                                style={{
                                                    height:"50px"
                                                }}
                                            >

                                            </tr>
                                        </tbody>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        ...fixed_column,
                                    }}
                                >

                                    <Box component='table' sx={{ borderCollapse: 'collapse', backgroundColor: "white" }}>
                                        <thead>
                                            <tr>
                                                <Box
                                                    component='td'
                                                    sx={itemsColumnsHeader}
                                                >
                                                    {
                                                        actionsColumn?.headerName ? actionsColumn.headerName : (
                                                            <span style={{ color: "transparent" }}>.</span>
                                                        )
                                                    }
                                                </Box>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <Box
                                                        component='th'
                                                        sx={{
                                                            ...itemsColumnsRows,
                                                            display: "flex",
                                                            gap: '10px',
                                                            alignItems: "center",
                                                            padding: "0 10px 0 20px",
                                                            margin: "0px !important"
                                                        }}
                                                    >
                                                        {columns.map((column, columnIndex) => (
                                                            <React.Fragment key={columnIndex}>
                                                                {column.getActions && typeof column.getActions === 'function' && column.getActions(row).map((action, actionIndex) => (
                                                                    <span key={actionIndex}>
                                                                        {action}
                                                                    </span>
                                                                ))}
                                                            </React.Fragment>
                                                        ))}
                                                    </Box>
                                                </tr>
                                            ))}
                                            <tr></tr>
                                        </tbody>
                                    </Box>
                                </Box>

                            </Box>
                        ) :
                        (
                            <Box
                                sx={{
                                    ...table_container,
                                    width: { maxWidthTable },
                                    mb:5
                                }}
                            >
                                <Box
                                    sx={{
                                        ...scrollable_x,
                                        mb:10
                                    }}
                                >
                                    <table>
                                        <thead>
                                            <tr>
                                                {columns.map((row, index) => (
                                                    <td key={index}>{row.headerName}</td>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, index: number) => (
                                                <tr key={index}>
                                                    {columns.map((column: any, columnIndex: number) => (
                                                        <td key={columnIndex}>{row[column.field]}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </Box>
                            </Box>
                        )
                )
            }
        </>
    );
};


const table_container: SxProps = {
    display: "flex",
    position: "relative",
    overflow: "scroll"
}
const scrollable_x: SxProps = {
    display: 'inline-block',
    mb:5
}

const fixed_column: SxProps = {
    position: 'sticky',
    left: 0,
    right: 0,
    width: 'fit-content',
}

const itemsColumnsHeader: SxProps = {
    padding: '0px 35px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: "bold",
    fontSize: "14px",
    height: '70px',
    mb:5

}

const itemsColumnsRows: SxProps = {
    padding: "0 35px",
    borderTop: '1px solid #ccc',
    whiteSpace: 'nowrap',
    fontSize: "14px",
    textOverflow: 'ellipsis',
    cursor: "default",
    height: "70px",

}
