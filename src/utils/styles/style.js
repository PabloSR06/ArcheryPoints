import { StyleSheet } from 'react-native';

export const UserEditSyle = {
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
};

export const HomeStyle = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5FCFF',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    fileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        marginBottom: 8,
    },
};


export const UserListStyle = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff', // Fondo blanco
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userName: {
        fontSize: 18,
        marginLeft: 8, // Espacio entre el icono y el nombre
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333', // Color de texto oscuro
    },
};

