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
                timeLimit: target.timeLimit.value,
                alertType: target.alertType.value,
                alertTitle: target.alertTitle.value,
                createdAt: Date.now(),
            },
        });
    };
    return (
        <form className="w-full h-full flex flex-col justify-center items-center text-black" onSubmit={onSubmit}>
            <input placeholder="text" type="text" name="text" />
            <input placeholder="link" type="url" name="link" />
            <input placeholder="alertType" type="text" name="alertType" />
            <input placeholder="timeLimit" type="number" name="timeLimit" />
            <input placeholder="alertTitle" type="text" name="alertTitle" />
            <button type="submit">Submit</button>
        </form>
    );
}
