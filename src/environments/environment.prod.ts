export const environment = {
    production: true,
    envName: 'prod',
    apiUrl: 'https://mcp.maintenix.ifs.cloud',
    hotjarConfig: {
        id: '000000',
        enabled: false
    },
    paths: {
        aircrafts: '/api/v1/contingencies/configurations/aircrafts',
        aircraftsSearch: '/api/v1/contingencies/configurations/aircrafts/_search',
        close: '/api/v1/contingencies/_close',
        configStatus: '/api/v1/contingencies/configurations/status',
        confirmForgotPassword: '/api/security/users/_confirmforgotpassword',
        contingencyList: '/api/v1/contingencies',
        contingencySearch: '/api/v1/contingencies/_search',
        dateTime: '/api/security/currentdatetime',
        flights: '/api/v1/contingencies/configurations/flights',
        followUp: '/api/v1/contingencies/_followUp',
        forgotPassword: '/api/security/users/_forgotpassword',
        locations: '/api/v1/contingencies/configurations/locations',
        login: '/api/security/users/_login',
        safetyEvent: '/api/v1/contingencies/configurations/safetyEvents',
        types: '/api/v1/contingencies/configurations/types'
    }
};
