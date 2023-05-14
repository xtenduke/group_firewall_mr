import * as React from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import {ClientStateResponse} from "../../../server/src/model/dto/ClientState";
import ClientRow from "./ClientRow";

const baseURL = "http://fedora.local:3000/clients/all"

function ClientsListComponent() {
    let [list, setList] = React.useState<ClientStateResponse[]>([]);
    
    React.useEffect(() => {
        axios.get<ClientStateResponse[]>(baseURL).then((response: any) => {
            setList(response.data);
        });
    }, [])
    
    if (list.length === 0) return null;
    if (list.length === 1) {
        // duplicate data for ui
        list.push(list[0]);
        list.push(list[0]);
        list.push(list[0]);
    }
    
    return (
        <div>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Clients ({list.length})
            </Typography>
            {list.map((item) => {
                return <ClientRow {...item} />
            })}
        </div>
    )
}

export default function ClientsList() {
    return <ClientsListComponent/>
}