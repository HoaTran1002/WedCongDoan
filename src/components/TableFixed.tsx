import React, { useState, ReactNode } from 'react';
import {
    Box,
    SxProps
} from '@mui/material'

export interface ColumnsProps {
    headerName?: string | null,
    field: string,
    width?: number,
    type?: string,
    getActions?: (params?: any) => JSX.Element[];
}
interface TableWithFixedColumnProps {
    columns: ColumnsProps[];
    rows: string[];
    maxWidth?: number;

}
export const TableWithFixedColumn: React.FC<TableWithFixedColumnProps> = ({
    columns,
    rows,
    maxWidth,
}) => {
    const [maxWidthTable, setMaxWidthTable] = useState<number>(maxWidth ? maxWidth : 700)
    const actionsColumn = columns.find((column) => column.type === 'actions');
    const fixed = actionsColumn ? true : false;
    return (
        <>
            {
                fixed ?
                    (
                        <Box
                            sx={{
                                ...table_container,
                                width: `${maxWidthTable}px`
                            }}
                        >
                            <Box
                                sx={{
                                    ...scrollable_x,
                                }}
                            >
                                <Box component='table' sx={{ borderCollapse: 'collapse',height:"100%" }}>
                                    <thead>
                                        <tr>
                                            {columns.filter(r=>r.field !=='actions').map((row, index) => (
                                                <Box
                                                    component='td'
                                                    key={index}
                                                    sx={itemsColumnsHeader}
                                                >
                                                    {row.headerName}
                                                </Box>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index: number) => (
                                            <tr key={index}>
                                                {columns.filter(r=>r.field !=='actions').map((column: any, columnIndex: number) => (
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
                                <Box component='table' sx={{ borderCollapse: 'collapse',height:"100%" }}>
                                    <thead>
                                        <Box
                                            component='td'
                                            sx={itemsColumnsHeader}
                                        >
                                            {
                                                actionsColumn?.headerName ? actionsColumn.headerName : (
                                                    <span style={{color:"transparent"}}>.</span>
                                                )
                                            }
                                        </Box>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <Box
                                                    component='td'
                                                    sx={{
                                                        ...itemsColumnsRows,
                                                        display:"flex"
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
                    ) :
                    (
                        <Box
                            sx={{
                                ...table_container,
                                width: { maxWidthTable },
                            }}
                        >
                            <Box
                                sx={{
                                    ...scrollable_x,
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
            }
        </>
    );
};


const table_container: SxProps = {
    display: "flex",
    border:"1px solid #cacaca",
    borderRadius:"5px",
    position:"relative"
}
const scrollable_x: SxProps = {
    overflowX: 'scroll',
    display: 'inline-block',
    '&::-webkit-scrollbar':{
        position:"absolute",
        bottom:"-10px",
        display:"block",
        height:"4px"
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#35a1ff',
        borderRadius:' 4px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
    }
}

const fixed_column: SxProps = {
    position: 'sticky',
    left: 0,
    width: 'fit-content',
    mb:"4px"
}

const itemsColumnsHeader:SxProps={
    padding: '15px 35px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight:"bold",
    fontSize:"14px"
    
}

const itemsColumnsRows:SxProps={
    padding: '15px 35px',
    borderTop: '1px solid #ccc',
    whiteSpace: 'nowrap',
    fontSize:"14px",
    textOverflow: 'ellipsis',
    cursor:"default"
}
