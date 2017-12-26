import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { DetailsService } from '../../../details/_services/details.service';
import { Contingency } from '../../../shared/_models/contingency';
import { DataService } from '../../../shared/_services/data.service';
import { DialogService } from '../../_services/dialog.service';
import { CloseContingencyComponent } from '../close-contingency/close-contingency.component';
import {ActivatedRoute} from '@angular/router';
import {HistoricalSearchService} from '../_services/historical-search.service';
import {ContingencyService} from '../_services/contingency.service';
import {InfiniteScrollService} from '../_services/infinite-scroll.service';
import {Moment} from "moment";

@Component({
    selector: 'lsl-contingency-list',
    templateUrl: './contingency-list.component.html',
    styleUrls: ['./contingency-list.component.scss'],
    providers: [DialogService]
})

export class ContingencyListComponent implements OnInit, OnDestroy {

    private _messageSubscriptions: Subscription;
    private _reloadSubscription: Subscription;
    public contingencyList: Contingency[];
    public progressBarColor: string;
    public currentUTCTime: number;
    public itemsCount: number;

    constructor(
        private messageData: DataService,
        private dialogService: DialogService,
        public translate: TranslateService,
        public detailsService: DetailsService,
        private route: ActivatedRoute,
        private historicalSearchService: HistoricalSearchService,
        public contingencyService: ContingencyService,
        private _infiniteScrollService: InfiniteScrollService,
    ) {
        translate.setDefaultLang('en');
        this.contingencyList = [];
        this.itemsCount = 0;
    }

    ngOnInit() {
        this.currentUTCTime = 0;
        this.progressBarColor = 'primary';
        this._messageSubscriptions = this.messageData.currentNumberMessage.subscribe(message => this.currentUTCTime = message);
        this._reloadSubscription = this.messageData.currentStringMessage.subscribe(message => this.reloadList(message));
        this.route.data.subscribe((data: any) => {
            this.historicalSearchService.active = data.historical;
        });
        this.getContingences();
    }

    openDetails(contingency: Contingency, section: string) {
        this.detailsService.contingency = contingency;
        this.detailsService.openDetails(section);
    }

    ngOnDestroy() {
        this._messageSubscriptions.unsubscribe();
        this._reloadSubscription.unsubscribe();
    }

    public openCloseContingency(contingency: any) {
        this.dialogService.openDialog(CloseContingencyComponent, {
            data: contingency,
            hasBackdrop: true,
            disableClose: true,
            height: '536px',
            width: '500px'
        });
    }

    public reloadList(message) {
        if (message === 'reload') {
            this.getContingences();
        }
    }

    private getContingences() {
        if (!this.historicalSearchService.active) {
            this.contingencyService.getContingencies().subscribe(data => this.itemsCount = data.length);
        } else {
            const search = {
                from: {
                    epochTime: this.historicalSearchService.fromTS
                },
                to: {
                    epochTime: this.historicalSearchService.toTS
                },
                offSet: this._infiniteScrollService.offset,
                limit: this._infiniteScrollService.pageSize
            };
            this.contingencyService.postHistoricalSearch(search).subscribe(data => {
                this.itemsCount = data.length;
                data.forEach((item, i) => {
                    const diff = (item.close.closeDate.epochTime - item.creationDate.epochTime)/(1000*60);
                    const percentage = (diff / 180) * 100;
                    item.closePercentage = percentage > 100 ? 100 : percentage;
                    console.log(item, item.close.closeDate.label, item.creationDate.label);
                });
            });
        }
    }

    public getTimeAverage(creationDate: any, duration: any, remain: boolean, limit: number) {
        const actualTime = this.currentUTCTime;
        let average: number;
        const valueNumber = creationDate - actualTime;
        let warning = false;

        if (valueNumber > 0) {
            if (valueNumber <= limit) {
                warning = true;
            }
            const minutesConsumed = duration - ((valueNumber / 1000) / 60);

            average = Math.round((minutesConsumed * 100) / duration);
        } else {
            warning = true;
            average = 100;
        }

        return remain ? warning : average;
    }

}
