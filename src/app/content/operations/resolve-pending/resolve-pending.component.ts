import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DialogService} from '../../_services/dialog.service';
import {TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {StorageService} from '../../../shared/_services/storage.service';
import {MessageService} from '../../../shared/_services/message.service';
import {DataService} from '../../../shared/_services/data.service';
import {ApiRestService} from '../../../shared/_services/apiRest.service';
import {Subscription} from 'rxjs/Subscription';
import {Contingency} from '../../../shared/_models/contingency/contingency';
import {PendingSearch} from '../../../shared/_models/pending/pendingSearch';
import {Pending} from '../../../shared/_models/pending/pending';
import {Resolve} from '../../../shared/_models/pending/resolve';
import {Validation} from '../../../shared/_models/validation';
import {CancelComponent} from '../cancel/cancel.component';

@Component({
    selector: 'lsl-resolve-pending',
    templateUrl: './resolve-pending.component.html',
    styleUrls: ['./resolve-pending.component.scss']
})
export class ResolvePendingComponent implements OnInit, OnDestroy {

    private static SEARCH_ENDPOINT = 'pendingSearch';
    private static RESOLVE_ENDPOINT = 'pendingResolve';
    private snackBarMessage: string;
    private _resolveForm: FormGroup;
    private _pendingsSubscription: Subscription;
    private _resolvesSubscription: Subscription;
    private _messageSubscription: Subscription;
    private _groupPendingByArea: any[];
    private _resolves: Resolve[];
    private _contingencyId: number;
    private _username: string;
    private _validations: Validation;
    private _currentContingency: Contingency;

    constructor(private _dialogService: DialogService,
                private _translate: TranslateService,
                private _storageService: StorageService,
                private _messageService: MessageService,
                private _dataService: DataService,
                private _apiRestService: ApiRestService,
                private _fb: FormBuilder,
                private translate: TranslateService,
                @Inject(MAT_DIALOG_DATA) private _contingency: Contingency
    ) {
        this._translate.setDefaultLang('en');

        this.username = this._storageService.getCurrentUser().username;

        this.currentContingency = this._contingency;
        this.contingencyId = this._contingency.id;

        this.snackBarMessage = '';
        this.resolves = [];
        this.validations = Validation.getInstance();

        this.resolveForm = this._fb.group({});


    }


    ngOnInit() {
        this._pendingsSubscription = this.searchPendings(this.contingencyId);
    }

    ngOnDestroy() {
        if (this._pendingsSubscription) {
            this._pendingsSubscription.unsubscribe();
        }
        if (this._resolvesSubscription) {
            this._resolvesSubscription.unsubscribe();
        }
        if (this._messageSubscription) {
            this._messageSubscription.unsubscribe();
        }
    }

    public resolvePending(pending: Pending, checked: boolean) {
        if (checked === true) {
            this.addResolve(pending.id);
        } else {
            this.deleteResolve(pending.id);
        }
    }

    public countResolves(resolveGroup: Pending[]): number {
        let count = 0;
        resolveGroup.forEach((r1) => {
            this.resolves.forEach(r2 => {
                count = r1.id === r2.pendingId ? count + 1 : count;
            });
        });
        return count;
    }

    /**
     * Method for regroup pending list items
     */
    private reloadPendings(pendings: Pending[]): Pending[] {
        return this.groupBy(pendings, 'area');
    }
    /**
     * Group a collection by attribute
     * @param collection
     * @param property
     * @return {Array}
     */
    private groupBy(collection: any[], property: string) {
        let i = 0, val, index;
        const values = [], result = [];
        for (; i < collection.length; i++) {
            val = collection[i][property];
            index = values.indexOf(val);
            if (index > -1) {
                result[index].push(collection[i]);
            } else {
                values.push(val);
                result.push([collection[i]]);
            }
        }
        return result;
    }
    private searchPendings(contingencyId: number): Subscription {
        const pendingSearch: PendingSearch = PendingSearch.getInstance();
        pendingSearch.isResolve = false;
        pendingSearch.contingencyId = contingencyId;

        return this._apiRestService.search<Pending[]>(ResolvePendingComponent.SEARCH_ENDPOINT, pendingSearch)
            .subscribe(rs => {
                const res = rs;
                this.groupPendingByArea = this.reloadPendings(res);
            });

    }

    public addResolve(pendingId: number): void {
        this.resolves.push(new Resolve(this.contingencyId, pendingId, this.username));
    }

    public deleteResolve(pendingId: number): void {
        this.resolves = this.resolves.filter(r => r['pendingId'] !== pendingId);
    }

    public saveResolves(): Subscription {
        if (this.resolves.length > 0) {
            this.validations.isSending = true;
            return this._apiRestService.add<Response>(ResolvePendingComponent.RESOLVE_ENDPOINT, this.resolves)
            .subscribe(rs => {
                this.validations.isSending = false;
                this._dialogService.closeAllDialogs();
                this._dataService.stringMessage('reload');
                this._messageSubscription = this.translateString('OPERATIONS.RESOLVE_PENDING.PENDINGS_SOLVED').add(() => {
                    this._messageService.openSnackBar(this.resolves.length + ' ' + this.snackBarMessage);
                });
            });
        } else {
            this._messageSubscription = this.translateString('OPERATIONS.RESOLVE_PENDING.PENDING_REQUIRED').add(() => {
                this._messageService.openSnackBar(this.snackBarMessage);
            });
        }
    }

    /**
     * Close form modal
     */
    public closeDialog(): void {
        if (this.resolves.length > 0) {
            this.translateString('OPERATIONS.CANCEL_COMPONENT.MESSAGE');
            this._messageService.openFromComponent(CancelComponent, {
                data: {message: this.snackBarMessage},
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        } else {
            this._dialogService.closeAllDialogs();
        }
    }

    private translateString(toTranslate: string): Subscription {
        return this.translate.get(toTranslate).subscribe((res: string) => {
            this.snackBarMessage = res;
        });
    }

    private validateFilledItems(): boolean {
        let counterFilled = 0;
        const defaultValid = 0;
        Object.keys(this.resolveForm.controls).forEach(elem => {
            if (this.resolveForm.controls[elem].valid) {
                counterFilled = counterFilled + 1;
            }
        });
        return counterFilled > defaultValid;
    }


    get resolveForm(): FormGroup {
        return this._resolveForm;
    }

    set resolveForm(value: FormGroup) {
        this._resolveForm = value;
    }


    get groupPendingByArea(): any[] {
        return this._groupPendingByArea;
    }

    set groupPendingByArea(value: any[]) {
        this._groupPendingByArea = value;
    }

    get resolves(): Resolve[] {
        return this._resolves;
    }

    set resolves(value: Resolve[]) {
        this._resolves = value;
    }

    get contingencyId(): number {
        return this._contingencyId;
    }

    set contingencyId(value: number) {
        this._contingencyId = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get validations(): Validation {
        return this._validations;
    }

    set validations(value: Validation) {
        this._validations = value;
    }


    get currentContingency() {
        return this._currentContingency;
    }

    set currentContingency(value) {
        this._currentContingency = value;
    }
}
