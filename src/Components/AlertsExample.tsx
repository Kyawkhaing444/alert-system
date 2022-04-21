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
        };
        AlertReducer({
            type: 'addAlert',
            payloads: {
                id: new Date().getTime().toString(),
                text: target.text.value,
                link: target.link.value,
                timeLimit: target.timeLimit.value,
                alertType: target.alertType.value,
                alertTitle: 'Alert Title',
            },
        });
    };
    return (
        <form className="w-full h-full flex flex-col justify-center items-center text-black" onSubmit={onSubmit}>
            <input placeholder="text" type="text" name="text" />
            <input placeholder="link" type="text" name="link" />
            <input placeholder="alertType" type="text" name="alertType" />
            <input placeholder="timeLimit" type="number" name="timeLimit" />
            <button type="submit">Submit</button>
        </form>
    );
}
