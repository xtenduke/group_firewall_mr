import * as React from "react";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export interface AllowDenyProps {
    title: string,
    value: string,
    id: number,
    onChange: (id: number, value: "allow" | "deny") => void
}

function AllowDenyComponent(props: AllowDenyProps) {
    let [value, setValue] = React.useState(props.value);
    
    const handleChange = (event: SelectChangeEvent) => {
        const res = event.target.value as "allow" | "deny";
        setValue(res);
        props.onChange(props.id, res);
    }

    return (
        <div>
            <InputLabel>{props.title}</InputLabel>
            <Select
                value={value}
                onChange={handleChange}
            >
                <MenuItem value={"allow"}>Allow</MenuItem>
                <MenuItem value={"deny"}>Deny</MenuItem>
            </Select>
        </div>
    )
}

export default function AllowDeny(props: AllowDenyProps) {
    return <AllowDenyComponent {...props}/>
}