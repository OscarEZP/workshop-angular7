import {NgModule} from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import { ApiRestService } from '../../shared/_services/apiRest.service';
import {SharedModule} from '../../shared/shared.module';
import { DateUtil } from '../../shared/util/dateUtil';
import { ContingencyConfigService } from './_services/contingency.config.service';
import { ContingencySimplifiedListComponent } from './contingency-simplified-list.component/contingency-simplified-list.component';

import {OperationsComponent} from './operations.component';
import {ContingencyListComponent} from './contingency-list.component/contingency-list.component';
import {ContingencyFormComponent} from './contingency-form/contingency-form.component';
import {DialogService} from '../_services/dialog.service';
import {ContingencyService} from './_services/contingency.service';
import {LogService} from './_services/log.service';
import {ClockService} from '../../shared/_services/clock.service';
import {CancelComponent} from './cancel/cancel.component';
import { CloseContingencyComponent } from './close-contingency/close-contingency.component';
import { SearchHistoricalComponent } from './search-historical/search-historical.component';
import {PitStopListComponent} from './pit-stop-list/pit-stop-list.component';
import {RouterModule} from '@angular/router';
import {InfiniteScrollService} from './_services/infinite-scroll.service';
import {HistoricalSearchService} from './_services/historical-search.service';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        RouterModule
    ],
    declarations: [
        OperationsComponent,
        ContingencyListComponent,
        ContingencySimplifiedListComponent,
        ContingencyFormComponent,
        CancelComponent,
        CloseContingencyComponent,
        SearchHistoricalComponent,
        PitStopListComponent
    ],
    exports: [],
    providers: [
        DialogService,
        ContingencyService,
        ContingencyConfigService,
        LogService,
        ClockService,
        ApiRestService,
        InfiniteScrollService,
        HistoricalSearchService,
        {provide: MAT_DATE_LOCALE, useValue: 'es-CL'},
        DateUtil
    ],
    entryComponents: [
        CancelComponent,
        CloseContingencyComponent
    ]
})

export class OperationsModule {
}
