import * as React from "react";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import {ClientStateResponse} from "../../../server/src/model/dto/ClientState";
import {parseRules} from "../util/Rules";
import RulesList from "./RulesList";
import AllowDeny from "./AllowDeny";

export interface ClientRowProps {
    data: ClientStateResponse
}

enum Default {
    inbound = 0,
    outgoing = 1,
    routed = 3,
}

const defaultsChange = (id: number, value: "allow" | "deny") => {

}

function ClientRowComponent(props: ClientRowProps) {
    const {data} = props;

    return (
        <Card>
            <Stack sx={{m: 3}} spacing={5}>
                <Typography component="h3" variant="h6">
                    {data.id}
                </Typography>

                <div>
                    <Typography component="h3" variant="h6">
                        State
                    </Typography>
                    {data.status}
                </div>
                <div>
                    <Typography component="h3" variant="h6">
                        Defaults
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <AllowDeny
                            id={Default.inbound}
                            title={"Inbound"}
                            value={data.default.incoming}
                            onChange={defaultsChange}
                        />
                        <AllowDeny
                            id={Default.outgoing}
                            title={"Outbound"}
                            value={data.default.outgoing}
                            onChange={defaultsChange}/>

                        <AllowDeny
                            id={Default.routed}
                            title={"Routed"}
                            value={data.default.routed}
                            onChange={defaultsChange}/>
                    </Stack>
                </div>

                <div>
                    <Typography component="h3" variant="h6" color="secondary" gutterBottom>
                        Rules
                    </Typography>
                    <RulesList {...{rules: parseRules(data)}} />
                </div>
                <Stack direction="row" spacing={2}>
                    <Button variant="text">Add</Button>
                </Stack>
            </Stack>
        </Card>
    )
}

export default function ClientRow(clientState: ClientStateResponse) {
    return <ClientRowComponent data={clientState}/>
}