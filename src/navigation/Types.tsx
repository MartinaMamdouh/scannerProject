import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { string } from 'yup';

export type RootStackParamList = {
    Home: undefined;
    Scan: {direction:string};
    CameraScanner:{direction:string};
    Reader:{direction:string};
    In:undefined;
    Login: undefined;
    Signup: undefined;
    Details : {
        result:boolean;
        errors: [];
    ticket: {
        id: Int32Array;
        tckt_ID: string;
        onlineUserFakeTktID: string;
        tckt_Barcode: string;
        tckt_TrnsID: string;
        attend: string;
        attendDate: string;
        creationDate: string;
        lastStatus: string;
        eventStartDate:string;
        eventEndDate:string;
        eusr_FirstName: string;
        eusr_LastName: string;
        eusr_Email: string;
        eusr_NationalID: string;
        evnt_Name: string;
    }
        username: string;
        ticketNumber: string;
        isEntered: boolean;
        direction:string;
     } ;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = {
    navigation: NavigationProp<RootStackParamList, T>;
};

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type ScanScreenRouteProp = RouteProp<RootStackParamList, 'Scan'>;
export type CameraScreenRouteProp = RouteProp<RootStackParamList, 'CameraScanner'>;
export type ReaderScreenRouteProp = RouteProp<RootStackParamList, 'Reader'>;