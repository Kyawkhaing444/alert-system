import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';
import { AlertStoreActionType, IAlertStoreStates, IAlertStoreType } from '../interface/AlertStore.interface';

const initialContext: IAlertStoreStates[] = [];

const AlertStore = createContext<IAlertStoreType>({ state: initialContext, dispatch: () => null });

AlertStore.displayName = `Alert Manager Context Store`;

function AlertReducer(state: IAlertStoreStates[], { type, payloads }: AlertStoreActionType): IAlertStoreStates[] {
        switch (type) {
                case 'addAlert': {
                        return state.concat(payloads);
                }
                case 'removeAlert': {
                        return state.filter((alert: IAlertStoreStates) => alert.id !== payloads.id);
                }
                default: {
                        throw new Error(`Unhandled action type: ${type as string}`);
                }
        }
}

export const AlertManager: React.FunctionComponent<{ children: ReactNode[] }> = ({ children }) => {
        const [state, dispatch] = useReducer(AlertReducer, initialContext);

        const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

        return <AlertStore.Provider value={value}>{children}</AlertStore.Provider>;
};

export function useAlertReducer() {
        const context = useContext(AlertStore);
        if (context === undefined) {
                throw new Error(`useAlert must be used within a AlertStore.Provider`);
        }
        return context.dispatch;
}

export function useAlerts() {
        const context = useContext(AlertStore);
        if (context === undefined) {
                throw new Error(`useAlert must be used within a AlertStore.Provider`);
        }
        return context.state;
}
