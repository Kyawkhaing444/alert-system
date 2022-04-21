import { Alert, AlertTitle } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { IAlertStoreStates } from '../interface/AlertStore.interface';
import { useAlertReducer } from './AlertManager';

export function AlertComponent() {
    const { state: alerts, dispatch: AlertReducer } = useAlertReducer();
    const removeAlertHandler = useCallback(
        (alert: IAlertStoreStates) => {
            AlertReducer({
                type: 'removeAlert',
                payloads: alert,
            });
        },
        [AlertReducer]
    );
    useEffect(() => {
        const now = Date.now();
        const timeouts = alerts.map((alert) => {
            const durationLeft = (alert.timeLimit || 0) - (now - alert.createdAt);

            if (durationLeft < 0) {
                removeAlertHandler(alert);
                return;
            }
            return setTimeout(() => removeAlertHandler(alert), durationLeft);
        });

        return () => {
            timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
        };
    }, [alerts, removeAlertHandler]);
    return (
        <div className="absolute top-5 right-5 flex flex-col justify-center items-center h-auto gap-4">
            {alerts.map((alert, index) => (
                <Alert
                    onClick={() => {
                        if (alert.link) {
                            window.location.href = alert.link;
                        }
                    }}
                    className={alert.link ? 'cursor-pointer' : ''}
                    severity={alert.alertType}
                    key={index}
                >
                    {alert.alertTitle && <AlertTitle>{alert.alertTitle}</AlertTitle>}
                    {alert.text}
                </Alert>
            ))}
        </div>
    );
}
