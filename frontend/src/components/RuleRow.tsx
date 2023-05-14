import * as React from "react";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {Rule} from "../../../server/src/model/dto/ClientState";

export interface RuleRowProps {
    data: Rule
}

function RuleRowComponent(props: RuleRowProps) {
    let [rule, setRule] = React.useState(props.data);

    return (
        <div>
            <Stack direction="row" spacing={2}>
                <Typography variant="body1">
                    {rule.rule}
                </Typography>
                <Typography variant="body1">
                    Protocol: {rule.ver}
                </Typography>
            </Stack>
            <Divider/>
        </div>
    )
}

export default function RuleRow(rule: Rule) {
    return <RuleRowComponent data={rule}/>
}