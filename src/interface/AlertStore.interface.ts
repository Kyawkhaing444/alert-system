import { Dispatch } from 'react';

export type AlertStoreReducerType = 'addAlert' | 'removeAlert';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface IAlertStoreStates {
        timeLimit: number;
        text: string;
        link: string;
        alertType: AlertType;
        id: string;
        alertTitle: string;
}

export interface AlertStoreActionType {
        type: AlertStoreReducerType;
        payloads: IAlertStoreStates;
}

export interface IAlertStoreType {
        state: IAlertStoreStates[];
        dispatch: Dispatch<AlertStoreActionType>;
}

export type AlertStoreReducer = (state: IAlertStoreStates, action: AlertStoreActionType) => IAlertStoreStates;
