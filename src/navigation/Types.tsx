import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    Scan: undefined;
    CameraScanner: undefined;
    Reader:undefined;
    In:undefined;
    Login: undefined;
    Signup: undefined;
    Details : {
        username: string;
        ticketNumber: string;
        isEntered: boolean;
     } ;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = {
    navigation: NavigationProp<RootStackParamList, T>;
};

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;