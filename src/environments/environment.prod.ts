export const environment = {
    production: true,
    envName: 'prod',
    apiUrl: 'https://mcp.maintenix.ifs.cloud',
    hotjarConfig: {
        id: '750858',
        enabled: true
    },
    paths: {
        aircraftOnGround: '/api/aircraft-on-ground/v1/aircraft-on-ground',
        aircraftOnGroundFollowUpSearch: '/api/aircraft-on-ground/v1/aircraft-on-ground/follow-up/_search',
        aircraftOnGroundSearch: '/api/aircraft-on-ground/v1/aircraft-on-ground/_search',
        aircraftOnGroundSearchCount: '/api/aircraft-on-ground/v1/aircraft-on-ground/_search/_count',
        aircrafts: '/api/v1/configurations/aircrafts',
        aircraftsSearch: '/api/v1/configurations/aircrafts/_search',
        areas: '/api/v1/contingencies/pendings/areas',
        ataByFleet: '/api/v1/configurations/atas/groups/',
        authorities: '/api/v1/management/authorities',
        close: '/api/v1/contingencies/_close',
        configMaxStatus: '/api/v1/configurations/status/max',
        configStatus: '/api/v1/configurations/status/_search',
        configTypes: '/api/v1/configurations/types/groupNames',
        confirmForgotPassword: '/api/security/users/_confirmforgotpassword',
        contingency: '/api/v1/contingencies',
        contingencySearch: '/api/v1/contingencies/_search',
        contingencySearchCount: '/api/v1/contingencies/_search/count',
        dateTime: '/api/security/currentdatetime',
        editReasonAircraftOnGround: '/api/aircraft-on-ground/v1/aircraft-on-ground/_reason',
        editReasonContingency: '/api/v1/contingencies/_reason',
        flights: '/api/v1/configurations/flights/_search',
        followUp: '/api/v1/contingencies/status/_followUp',
        followUpAog: '/api/aircraft-on-ground/v1/aircraft-on-ground/follow-up',
        forgotPassword: '/api/security/users/_forgotpassword',
        locations: '/api/v1/configurations/locations',
        login: '/api/security/users/_login',
        mails : '/api/v1/configurations/mails',
        managementUsers: '/api/v1/management/users',
        managementUsersLoad: '/api/v1/management/users/_load',
        managementUsersSearch: '/api/v1/management/users/_search',
        managementUsersSearchCount: '/api/v1/management/users/_search/count',
        meetings: '/api/v1/contingencies/meetings',
        operator: '/api/v1/configurations/operators/',
        pendingResolve: '/api/v1/contingencies/pendings/_resolve',
        pendingSearch: '/api/v1/contingencies/pendings/_search',
        plannedFlights: '/api/v1/configurations/planned-flights/_search',
        safetyEvent: '/api/v1/configurations/safetyEvents',
        taskDetail: '/api/v1/tasks/_detail',
        tasksFleethealthRelatedSearch: '/api/v1/tasks/fleethealth/related-tasks/_search',
        tasksFleethealthRelatedHistoricalSearch: '/api/v1/tasks/fleethealth/related-tasks/_historical',
        tasksFleethealthAnalysis: '/api/v1/tasks/fleethealth/analysis',
        tasksFleethealthDone: '/api/v1/tasks/fleethealth/manualstate/_apply',
        tasksFleethealthSearch: '/api/v1/tasks/fleethealth/_search',
        technicalAnalysisSearch: '/api/v1/management/tech-analysis/_search',
        technicalAnalysisUserSearch: '/api/v2/management/tech-analysis/_search',
        technicalAnalysisSaveAll:  '/api/v1/management/tech-analysis/_save-all',
        technicalConfiguredAuthoritySearch: '/api/v1/management/tech-station/configured-authority/_search',
        technicalDefaultConfig: '/api/v1/management/default-tech-analysis',
        technicalNotConfiguredAuthoritySearch: '/api/v1/management/tech-station/not-configured-authority/_search',
        technicalStationSearch: '/api/v1/management/tech-station/_search',
        types: '/api/v1/configurations/types',
        closeAog: '/api/aircraft-on-ground/v1/aircraft-on-ground/_close',
        recoveryStage: '/api/v1/management/recovery-plan/recovery-stage',
        recoveryPlan: '/api/aircraft-on-ground/v1/recovery-plan/recovery-stage',
        recoveryPlanSearch: '/api/aircraft-on-ground/v1/recovery-plan/recovery-stage/_search'
    }
};
