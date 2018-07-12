export const environment = {
    production: false,
    envName: 'local',
    apiUrl: 'http://localhost',
    hotjarConfig: {
        id: '000000',
        enabled: false
    },
    paths: {
        aircrafts: ':9002/api/v1/contingencies/configurations/aircrafts',
        aircraftsSearch: ':9005/api/v1/configurations/aircrafts/_search',
        areas: ':9002/api/v1/contingencies/pendings/areas',
        ataByFleet: ':9005/api/v1/configurations/atas/groups',
        authorities: ':9015/api/v1/management/authorities',
        close: ':9002/api/v1/contingencies/_close',
        configMaxStatus: ':9005/api/v1/configurations/status/max',
        configStatus: ':9005/api/v1/configurations/status/_search',
        configTypes: ':9005/api/v1/configurations/types/groupNames',
        confirmForgotPassword: ':9001/api/security/users/_confirmforgotpassword',
        contingencyList: ':9002/api/v1/contingencies',
        contingencySearch: ':9002/api/v1/contingencies/_search',
        contingencySearchCount: ':9002/api/v1/contingencies/_search/count',
        dateTime: ':9001/api/security/currentdatetime',
        flights: ':9005/api/v1/configurations/flights/_search',
        followUp: ':9002/api/v1/contingencies/status/_followUp',
        forgotPassword: ':9001/api/security/users/_forgotpassword',
        locations: ':9005/api/v1/configurations/locations',
        login: ':9001/api/security/users/_login',
        mails : ':9005/api/v1/configurations/mails',
        managementUsers: ':9015/api/v1/management/users',
        managementUsersLoad: ':9015/api/v1/management/users/_load',
        managementUsersSearch: ':9015/api/v1/management/users/_search',
        managementUsersSearchCount: ':9015/api/v1/management/users/_search/count',
        meetings: ':9002/api/v1/contingencies/meetings',
        operator: ':9005/api/v1/configurations/operators/',
        pendingResolve: ':9002/api/v1/contingencies/pendings/_resolve',
        pendingSearch: ':9002/api/v1/contingencies/pendings/_search',
        plannedFlights: '9002/api/v1/configurations/planned-flights/_search',
        safetyEvent: ':9005/api/v1/configurations/safetyEvents',
        types: ':9005/api/v1/configurations/types',
        taskDetail: ':9006/api/v1/tasks/_detail',
        tasksFleethealthRelatedSearch: ':9006/api/v1/tasks/fleethealth/related-tasks/_search',
        tasksFleethealthAnalysis: ':9006/api/v1/tasks/fleethealth/analysis',
        tasksFleethealthDone: ':9006/api/v1/tasks/fleethealth/manualstate/_apply',
        tasksFleethealthSearchCount: ':9006/api/v1/tasks/fleethealth/_search/count',
        tasksFleethealthSearch: ':9006/api/v1/tasks/fleethealth/_search',
        technicalAnalysisSearch: ':9015/api/v1/management/tech-analysis/_search',
        technicalAnalysisUserSearch: ':9015/api/v2/management/tech-analysis/_search',
        technicalAnalysisSaveAll:  ':9015/api/v1/management/tech-analysis/_save-all',
        technicalConfiguredAuthoritySearch: ':9015/api/v1/management/tech-station/configured-authority/_search',
        technicalDefaultConfig: ':9015/api/v1/management/default-tech-analysis',
        technicalNotConfiguredAuthoritySearch: ':9015/api/v1/management/tech-station/not-configured-authority/_search',
        technicalStationSearch: ':9015/api/v1/management/tech-station/_search',
        aircraftOnGroundSearch: ':9016/api/aircraft-on-ground/v1/aircraft-on-ground/_search',
        aircraftOnGroundCount: ':9016/api/aircraft-on-ground/v1/aircraft-on-ground/_count',
    }
};
