export const environment = {
    production: true,
    envName: 'prod',
    apiUrl: 'https://mcp.maintenix.ifs.cloud',
    hotjarConfig: {
        id: '750858',
        enabled: true
    },
    paths: {
        aircrafts: '/api/v1/configurations/aircrafts',
        aircraftsSearch: '/api/v1/configurations/aircrafts/_search',
        areas: '/api/v1/contingencies/pendings/areas',
        ataByFleet: '/api/v1/configurations/atas/groups/',
        close: '/api/v1/contingencies/_close',
        configMaxStatus: '/api/v1/configurations/status/max',
        configStatus: '/api/v1/configurations/status/_search',
        configTypes: '/api/v1/configurations/types/groupNames',
        confirmForgotPassword: '/api/security/users/_confirmforgotpassword',
        contingencyList: '/api/v1/contingencies',
        contingencySearch: '/api/v1/contingencies/_search',
        contingencySearchCount: '/api/v1/contingencies/_search/count',
        dateTime: '/api/security/currentdatetime',
        flights: '/api/v1/configurations/flights/_search',
        followUp: '/api/v1/contingencies/status/_followUp',
        forgotPassword: '/api/security/users/_forgotpassword',
        locations: '/api/v1/configurations/locations',
        login: '/api/security/users/_login',
        mails : '/api/v1/configurations/mails',
        meetings: '/api/v1/contingencies/meetings',
        operator: '/api/v1/configurations/operators/',
        pendingResolve: '/api/v1/contingencies/pendings/_resolve',
        pendingSearch: '/api/v1/contingencies/pendings/_search',
        safetyEvent: '/api/v1/configurations/safetyEvents',
        tasks: '/api/v1/tasks/',
        tasksCorrection: '/api/v1/tasks/_correction',
        tasksSearch: '/api/v1/tasks/_search',
        tasksSearchCount: '/api/v1/tasks/_search/count',
        types: '/api/v1/configurations/types',
        taskRelationsSearch: '/api/v1/tasks/relations/_search'
    }
};
