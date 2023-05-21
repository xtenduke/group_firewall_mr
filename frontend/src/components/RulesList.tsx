import * as React from "react";
import {Rule} from "../../../server/src/model/dto/ClientState";
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

export interface RulesListProps {
    rules: Rule[];
}

const columns: GridColDef[] = [
    {
        field: 'rule',
        headerName: 'Rule',
        flex: 1,
        valueGetter: (params: GridValueGetterParams) => params.row.rule
    },
    {
        field: 'protocol',
        headerName: 'Protocol',
        flex: 1,
        valueGetter: (params: GridValueGetterParams) => {
            return params.row.ver
        }
    },
];

function RulesListComponent(props: RulesListProps) {
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={props.rules.map((item) => {
                    return {
                        id: item.index,
                        rule: item.rule,
                        ver: item.ver
                    }
                })}
                columns={columns}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}

export default function RulesList(props: RulesListProps) {
    return <RulesListComponent {...props}/>
}