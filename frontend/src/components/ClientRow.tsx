import * as React from "react";
import axios from "axios";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';

import {ClientStateResponse} from "../../../server/src/model/dto/ClientState";
import {parseRules} from "../util/Rules";

export interface ClientRowProps {
    data: ClientStateResponse
}

function ClientRowComponent(props: ClientRowProps) {
    const [isOpen, setIsOpen] = React.useState<ClientStateResponse[]>([]);
    
    const {data} = props;

    return (
        <Card>
            <Stack spacing={2}>
                <Typography component="h3" variant="h6" color="secondary" gutterBottom>
                   {data.id} 
                </Typography>
                <div>State: {data.status}</div>
                <Typography component="h3" variant="h6" color="secondary" gutterBottom>
                    Defaults 
                </Typography>
                <div>incoming: {data.default.incoming}</div>
                <div>outgoing: {data.default.outgoing}</div>
                <div>routed: {data.default.routed}</div>
                <Typography component="h3" variant="h6" color="secondary" gutterBottom>
                    Rules
                </Typography>
                {parseRules(data).map((item) => {
                    return <div>{item.rule} - {item.ver}</div>
                })}   
            </Stack>
        </Card>
    )
}

export default function ClientRow(clientState: ClientStateResponse) {
    return <ClientRowComponent data={clientState}/>
}