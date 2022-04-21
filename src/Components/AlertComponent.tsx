import { useAlertReducer } from './AlertManager';

export function AlertComponent() {
    const { state: alerts } = useAlertReducer();
    return (
        <div className="absolute top-5 right-5 flex flex-col justify-center items-center h-auto gap-4">
            {alerts.map((alert, index) => (
                <div key={index} className="bg-gray-500 flex flex-col justify-center items-center">
                    <div className="text-white text-center text-xl">{alert.text}</div>
                </div>
            ))}
        </div>
    );
}
