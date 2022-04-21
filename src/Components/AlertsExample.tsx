import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import {
    AlertTypeOption,
    linkSuggestion,
    textSuggestion,
    timeLimitSuggestion,
    titleSuggestion,
} from '../data/suggestion-data';
import { AlertType } from '../interface/AlertStore.interface';
import { useAlertReducer } from './AlertManager';

export function AlertsExample() {
    const { dispatch: AlertReducer } = useAlertReducer();
    const onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            text: { value: string };
            link: { value: string };
            alertType: { value: AlertType };
            timeLimit: { value: number };
            alertTitle: { value: string };
        };
        AlertReducer({
            type: 'addAlert',
            payloads: {
                id: new Date().getTime().toString(),
                text: target.text.value,
                link: target.link.value,
                timeLimit: target.timeLimit.value * 1000,
                alertType: target.alertType.value,
                alertTitle: target.alertTitle.value,
                createdAt: Date.now(),
            },
        });
    };
    return (
        <form className="w-full h-full flex flex-col justify-center items-center text-black" onSubmit={onSubmit}>
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={titleSuggestion.map((option) => option)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="alertTitle"
                            label="Alert Title"
                            type="text"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={textSuggestion.map((option) => option)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="text"
                            label="Text"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={linkSuggestion.map((option) => option)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="link"
                            label="Link"
                            type="url"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={AlertTypeOption}
                    renderInput={(params) => <TextField {...params} label="Alert Type" name="alertType" />}
                />
                <Autocomplete
                    freeSolo
                    disableClearable
                    options={timeLimitSuggestion.map((option) => option)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="timeLimit"
                            label="Time Limit ( in seconds )"
                            type="number"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </Stack>
        </form>
    );
}
