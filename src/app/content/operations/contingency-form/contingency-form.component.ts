import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { map, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Aircraft } from '../../../shared/_models/aircraft';
import { AircraftSearch } from '../../../shared/_models/configuration/aircraftSearch';
import { Backup } from '../../../shared/_models/backup';
import { DateModel } from '../../../shared/_models/configuration/dateModel';
import { Contingency } from '../../../shared/_models/contingency';
import { Flight } from '../../../shared/_models/flight';
import { FlightSearch } from '../../../shared/_models/configuration/flightSearch';
import { GroupTypes } from '../../../shared/_models/configuration/groupTypes';
import { Location } from '../../../shared/_models/configuration/location';
import { Interval } from '../../../shared/_models/interval';
import { Legs } from '../../../shared/_models/legs';
import { Safety } from '../../../shared/_models/safety';
import { Status } from '../../../shared/_models/status';
import { StatusCode } from '../../../shared/_models/configuration/statusCode';
import { TimeInstant } from '../../../shared/_models/timeInstant';
import { Types } from '../../../shared/_models/configuration/types';
import { Validation } from '../../../shared/_models/validation';
import { ApiRestService } from '../../../shared/_services/apiRest.service';
import { ClockService } from '../../../shared/_services/clock.service';
import { DataService } from '../../../shared/_services/data.service';
import { DatetimeService } from '../../../shared/_services/datetime.service';
import { MessageService } from '../../../shared/_services/message.service';
import { StorageService } from '../../../shared/_services/storage.service';
import { DateUtil } from '../../../shared/util/dateUtil';
import { DialogService } from '../../_services/dialog.service';
import { ContingencyService } from '../_services/contingency.service';
import { CancelComponent } from '../cancel/cancel.component';

@Component({
    selector: 'lsl-contingency-form',
    templateUrl: './contingency-form.component.html',
    styleUrls: ['./contingency-form.component.scss']
})

export class ContingencyFormComponent implements OnInit, OnDestroy {
    private _messageUTCSubscription: Subscription;
    private _aircraftList: Aircraft[];
    private _flightList: Flight[];
    private _statusCodes: StatusCode[];
    private _safetyEventList: Safety[];
    private _maxStatusCodes: StatusCode[];
    private _groupTypeList: GroupTypes[];
    private _contingencyType: Types[];
    private _operator: Types[];
    private _failureType: Types[];
    private _informer: Types[];
    private _contingencyForm: FormGroup;
    private _contingency: Contingency;
    private _stations: Location[];
    
    private _durationArray: number[];
    private _contingencyDateModel: DateModel[];
    private _dateModel: Date;
    private _timeModel: string;
    private _utcModel: TimeInstant;
    private _minDate: Date;
    private _maxDate: Date;
    
    private _alive: boolean;
    private _interval: number;
    private _snackbarMessage: string;
    
    private _isSafetyEvent: boolean;
    private _timeClock: Date;
    
    private _validations: Validation;
    
    private _observableFlightList: Observable<Flight[]>;
    private _observableAircraftList: Observable<Aircraft[]>;
    
    constructor(private _dialogService: DialogService,
                private _contingencyService: ContingencyService,
                private _fb: FormBuilder,
                private _datetimeService: DatetimeService,
                private _clockService: ClockService,
                private _messageData: DataService,
                private _messageService: MessageService,
                private _storageService: StorageService,
                private _configService: ApiRestService,
                private _apiRestService: ApiRestService,
                private _dateUtil: DateUtil,
                private _translate: TranslateService) {
        
        const initFakeDate = new Date().getTime();
        
        this.alive = true;
        this.isSafetyEvent = false;
        this.utcModel = new TimeInstant(initFakeDate, null);
        this.durationArray = [];
        
        this.contingency = new Contingency(null, new Aircraft(null, null, null), null, null, null, new Flight(null, null, null, new TimeInstant(initFakeDate, null)), null, false, new Backup(null, new TimeInstant(null, null)), null, new Safety(null, null), new Status(null, null, new TimeInstant(initFakeDate, null), null, new Interval(null, null), new Interval(null, 30), this._storageService.getCurrentUser().username), null, this._storageService.getCurrentUser().username);
        
        this.contingencyType = [];
        this.operator = [];
        this.failureType = [];
        this.informer = [];
        
        this.stations = [new Location(null, null, null)];
        
        this.contingencyDateModel = [
            new DateModel(null),
            new DateModel(null),
            new DateModel(null),
            new DateModel(null)
        ];
        
        this._contingencyForm = _fb.group({
            'tail': [this.contingency.aircraft.tail, Validators.required],
            'fleet': [this.contingency.aircraft.fleet, Validators.required],
            'operator': [this.contingency.aircraft.operator, Validators.required],
            'isBackup': [false, this.contingency.isBackup],
            'station': [this.contingency.backup.location],
            'slotTm': [this.contingencyDateModel[1].timeString],
            'slotDate': [this.contingencyDateModel[1].dateString],
            'flightNumber': [this.contingency.flight.flightNumber, Validators.required],
            'origin': [this.contingency.flight.origin, Validators.required],
            'destination': [this.contingency.flight.destination, Validators.required],
            'tm': [this.contingencyDateModel[0].timeString, Validators.required],
            'dt': [this.contingencyDateModel[0].dateString, Validators.required],
            'informer': [this.contingency.informer, Validators.required],
            'safety': [false, Validators.required],
            'showBarcode': [false],
            'barcode': [this.contingency.barcode, [Validators.pattern('^[a-zA-Z0-9]+\\S$'), Validators.maxLength(80)]],
            'safetyEventCode': [this.contingency.safetyEvent.code],
            'contingencyType': [this.contingency.type, Validators.required],
            'failure': [this.contingency.failure, Validators.required],
            'observation': [this.contingency.status.observation, [Validators.required, Validators.maxLength(400)]],
            'reason': [this.contingency.reason, [Validators.required, Validators.maxLength(400)]],
            'statusCode': [this.contingency.status.code, Validators.required],
            'duration': [this.contingency.status.requestedInterval.duration, Validators.required]
        });
        
        this.validations = new Validation();
    }
    
    
    get messageUTCSubscription(): Subscription {
        return this._messageUTCSubscription;
    }
    
    set messageUTCSubscription(value: Subscription) {
        this._messageUTCSubscription = value;
    }
    
    get aircraftList(): Aircraft[] {
        return this._aircraftList;
    }
    
    set aircraftList(value: Aircraft[]) {
        this._aircraftList = value;
    }
    
    get flightList(): Flight[] {
        return this._flightList;
    }
    
    set flightList(value: Flight[]) {
        this._flightList = value;
    }
    
    get statusCodes(): StatusCode[] {
        return this._statusCodes;
    }
    
    set statusCodes(value: StatusCode[]) {
        this._statusCodes = value;
    }
    
    get safetyEventList(): Safety[] {
        return this._safetyEventList;
    }
    
    set safetyEventList(value: Safety[]) {
        this._safetyEventList = value;
    }
    
    get maxStatusCodes(): StatusCode[] {
        return this._maxStatusCodes;
    }
    
    set maxStatusCodes(value: StatusCode[]) {
        this._maxStatusCodes = value;
    }
    
    get groupTypeList(): GroupTypes[] {
        return this._groupTypeList;
    }
    
    set groupTypeList(value: GroupTypes[]) {
        this._groupTypeList = value;
    }
    
    get contingencyType(): Types[] {
        return this._contingencyType;
    }
    
    set contingencyType(value: Types[]) {
        this._contingencyType = value;
    }
    
    get operator(): Types[] {
        return this._operator;
    }
    
    set operator(value: Types[]) {
        this._operator = value;
    }
    
    get failureType(): Types[] {
        return this._failureType;
    }
    
    set failureType(value: Types[]) {
        this._failureType = value;
    }
    
    get informer(): Types[] {
        return this._informer;
    }
    
    set informer(value: Types[]) {
        this._informer = value;
    }
    
    get contingencyForm(): FormGroup {
        return this._contingencyForm;
    }
    
    set contingencyForm(value: FormGroup) {
        this._contingencyForm = value;
    }
    
    get contingency(): Contingency {
        return this._contingency;
    }
    
    set contingency(value: Contingency) {
        this._contingency = value;
    }
    
    get stations(): Location[] {
        return this._stations;
    }
    
    set stations(value: Location[]) {
        this._stations = value;
    }
    
    get durationArray(): number[] {
        return this._durationArray;
    }
    
    set durationArray(value: number[]) {
        this._durationArray = value;
    }
    
    get dateModel(): Date {
        return this._dateModel;
    }
    
    set dateModel(value: Date) {
        this._dateModel = value;
    }
    
    get timeModel(): string {
        return this._timeModel;
    }
    
    set timeModel(value: string) {
        this._timeModel = value;
    }
    
    get utcModel(): TimeInstant {
        return this._utcModel;
    }
    
    set utcModel(value: TimeInstant) {
        this._utcModel = value;
    }
    
    get minDate(): Date {
        return this._minDate;
    }
    
    set minDate(value: Date) {
        this._minDate = value;
    }
    
    get maxDate(): Date {
        return this._maxDate;
    }
    
    set maxDate(value: Date) {
        this._maxDate = value;
    }
    
    get alive(): boolean {
        return this._alive;
    }
    
    set alive(value: boolean) {
        this._alive = value;
    }
    
    get interval(): number {
        return this._interval;
    }
    
    set interval(value: number) {
        this._interval = value;
    }
    
    get snackbarMessage(): string {
        return this._snackbarMessage;
    }
    
    set snackbarMessage(value: string) {
        this._snackbarMessage = value;
    }
    
    get isSafetyEvent(): boolean {
        return this._isSafetyEvent;
    }
    
    set isSafetyEvent(value: boolean) {
        this._isSafetyEvent = value;
    }
    
    get timeClock(): Date {
        return this._timeClock;
    }
    
    set timeClock(value: Date) {
        this._timeClock = value;
    }
    
    get validations(): Validation {
        return this._validations;
    }
    
    set validations(value: Validation) {
        this._validations = value;
    }
    
    get contingencyDateModel(): DateModel[] {
        return this._contingencyDateModel;
    }
    
    set contingencyDateModel(value: DateModel[]) {
        this._contingencyDateModel = value;
    }
    
    get observableFlightList(): Observable<Flight[]> {
        return this._observableFlightList;
    }
    
    set observableFlightList(value: Observable<Flight[]>) {
        this._observableFlightList = value;
    }
    
    get observableAircraftList(): Observable<Aircraft[]> {
        return this._observableAircraftList;
    }
    
    set observableAircraftList(value: Observable<Aircraft[]>) {
        this._observableAircraftList = value;
    }
    
    public ngOnInit() {
        
        this._messageUTCSubscription = this._messageData.currentNumberMessage.subscribe(message => this.utcModel.epochTime = message);
        
        TimerObservable.create(0, this._interval)
                       .takeWhile(() => this.alive)
                       .subscribe(() => {
                           this._datetimeService.getTime()
                               .subscribe((data) => {
                                   this.utcModel = new TimeInstant(data.currentTimeLong, data.currentTime);
                                   this.newMessage();
                                   this.initDateModels(this.utcModel.epochTime);
                                   this._clockService.setClock(this.utcModel.epochTime);
                               });
                       });
        
        this._clockService.getClock().subscribe(time => this.timeClock = time);
        
        this.getAircraftList();
        this.getFlightList();
        this.getSafetyEventList();
        this.getGroupTypes();
        this.getLocationsList();
        this.generateIntervalSelection();
    }
    
    /**
     * Method to init date model for contingency creation, there will be 4 values:
     * 1) Flight Contingency date model
     * 2) Backup date model
     * 3) Minimum date model
     * 4) Maximum date model
     * @return {DateModel[]}
     */
    private initDateModels(epochDate: number): DateModel[] {
        return this.contingencyDateModel = [
            new DateModel(null),
            new DateModel(null),
            new DateModel(epochDate, -24),
            new DateModel(epochDate, 24)
        ];
    }
    
    /**
     * Unsubscribe messages when the component is destroyed
     * @return {void}
     */
    public ngOnDestroy() {
        this._messageUTCSubscription.unsubscribe();
    }
    
    /**
     * Submit form of contingency
     * @param value
     * @return {Subscription}
     */
    public submitForm(value: any) {
        console.log('Station: ' + this.contingencyForm.get('station').valid)
        console.log('SlotTm: ' + this.contingencyForm.get('slotTm').valid)
        console.log('SlotDate: ' + this.contingencyForm.get('slotDate').valid)
        if(this.contingencyForm.valid) {
            
            this.isBackupCheck();
            
            this.validations.isSending = true;
            
            let res: Response;
            
            this._apiRestService
                .add<Response>('contingencyList', this.contingency)
                .subscribe(response => res = response,
                    err => {
                        this.getTranslateString('OPERATIONS.CONTINGENCY_FORM.FAILURE_MESSAGE');
                        const message: string = err.error.message !== null ? err.error.message : this.snackbarMessage;
                        this._messageService.openSnackBar(message);
                        this.validations.isSending = false;
                    }, () => {
                        this.getTranslateString('OPERATIONS.CONTINGENCY_FORM.SUCCESSFULLY_MESSAGE');
                        this._messageService.openSnackBar(this.snackbarMessage);
                        this._dialogService.closeAllDialogs();
                        this._messageData.stringMessage('reload');
                        this.validations.isSending = false;
                    });
        } else {
            this.getTranslateString('OPERATIONS.VALIDATION_ERROR_MESSAGE');
            this._messageService.openSnackBar(this.snackbarMessage);
            this.validations.isSending = false;
        }
    }
    
    /**
     * Method to take values from slot time, slot date and set value of slot date in contingency model
     */
    private isBackupCheck(): void {
        if (this.contingency.isBackup) {
            const finalDate = this._dateUtil.createEpochFromTwoStrings(this.contingencyDateModel[1].dateObj, this.contingencyDateModel[1].timeString)
            console.log('finalDate: ' + finalDate);
            this.contingency.backup.slot.epochTime = finalDate;
        }
    }
    
    /**
     * Generate value array for combo box of time at intervals of 5 minutes to 180.
     * @return {number[]}
     */
    private generateIntervalSelection(): number[] {
        let i: number;
        const quantity = 36;
        
        for(i = 0; i < quantity; i++) {
            this.durationArray.push(i * 5 + 5);
        }
        
        return this.durationArray;
    }
    
    /**
     * Get Safety Event List Configuration
     * @return {Subscription}
     */
    
    private getSafetyEventList(): Subscription {
        return this._apiRestService
                   .getAll<Safety[]>('safetyEvent')
                   .subscribe(data => this.safetyEventList = data,
                       error => () => {
                           this._messageService.openSnackBar(error.message);
                       });
    }
    
    /**
     * Get aircraft list and create an observable list of fligths will be consumed in the view
     * @return {Subscription}
     */
    
    private getAircraftList() {
        
        return this._apiRestService
                   .search<Aircraft[]>('aircraftsSearch', new AircraftSearch(1))
                   .subscribe((response: Aircraft[]) => {
                       this.aircraftList = response
                       
                       this.observableAircraftList = this.contingencyForm
                           .controls['tail']
                           .valueChanges
                           .pipe(
                               startWith(''),
                               map(val => this.aircraftFilter(val))
                           );
                   });
    }
    
    /**
     * Get Flight List and create an observable list of fligths will be consumed in the view
     * @return {Subscription}
     */
    private getFlightList(): Subscription {
        const actualTime = new TimeInstant(this.utcModel.epochTime, null);
        const defaultFlightSearch = new FlightSearch(actualTime);
        
        return this._apiRestService
                   .search<Flight[]>('flights', defaultFlightSearch)
                   .subscribe((response: Flight[]) => {
                       this.flightList = response;
            
                       this.observableFlightList = this.contingencyForm
                           .controls['flightNumber']
                           .valueChanges
                           .pipe(
                               startWith(''),
                               map(val => this.flightFilter(val))
                           );
                   });
    }
    
    /**
     * Get all group types
     * @return {Subscription}
     */
    private getGroupTypes(): Subscription {
        
        return this._apiRestService
                   .getAll<GroupTypes[]>('types')
                   .subscribe((response: GroupTypes[]) => {
                       this.groupTypeList = response;
                       this.getSelectedGroupType();
                   });
    }
    
    /**
     * Split the groups accord to they purpose and init they instances variables
     */
    private getSelectedGroupType(): void {
        let variableName: string;
        let i: number;
        this.groupTypeList.forEach(function(value) {
            variableName = value.groupName.toLowerCase().replace(/(\_\w)/g, function(m) {
                return m[1].toUpperCase();
            });
            this[variableName] = value.types;
            
        }, this);
    }
    
    /**
     * Get the location list from server
     * @return {Subscription}
     */
    private getLocationsList(): Subscription {
        return this._apiRestService
                   .getAll<Location[]>('locations')
                   .subscribe((response: Location[]) => {
                       this.stations = response;
                   });
    }
    
    private getTranslateString(toTranslate: string) {
        this._translate.get(toTranslate).subscribe((res: string) => {
            this.snackbarMessage = res;
        });
    }
    
    public openCancelDialog(): void {
        if(this.validateFilledItems()) {
            this.getTranslateString('OPERATIONS.CANCEL_COMPONENT.MESSAGE');
            this._messageService.openFromComponent(CancelComponent, {
                data: {message: this.snackbarMessage},
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        } else {
            this._dialogService.closeAllDialogs();
        }
    }
    
    /**
     *
     * @return {boolean}
     */
    private validateFilledItems(): boolean {
        let counterFilled = 0;
        const defaultValid = 6;
        Object.keys(this._contingencyForm.controls).forEach(elem => {
            if(this._contingencyForm.controls[elem].valid) {
                counterFilled = counterFilled + 1;
            }
        });
        return counterFilled > defaultValid ? true : false;
    }
    
    /**
     * Method triggered when aircraft tail is selected, populate the fields and the model in contingency aircraft & flight
     * Also force selection of first flight in the form and recalculate the flight etd
     * @param {string} selectedOption
     */
    public onSelectAircraft(selectedOption: string): void {
        
        for(const item of this.aircraftList) {
            if(item.tail === selectedOption) {
                this.contingency.aircraft = new Aircraft(item.tail, item.fleet, item.operator);
                this.contingency.flight = new Flight(
                    this.flightList[0].flightNumber,
                    this.flightList[0].origin,
                    this.flightList[0].destination,
                    new TimeInstant(
                        this.flightList[0].etd.epochTime,
                        this.flightList[0].etd.label
                    ));
                
                this.contingencyDateModel[0].updateFromEpoch(this.contingency.flight.etd.epochTime);
                
                this.contingencyForm.get('flightNumber').setValue(this.contingency.flight.flightNumber);
                this.contingencyForm.get('flightNumber').updateValueAndValidity();
            }
        }
    }
    
    /**
     * Method triggered when a flight is selected and populate selected values in the contingency.flight model
     * @param {Event} event
     * @param {Flight} fl
     */
    public onSelectFlight(event: Event, fl: Flight): void {
        
        this.contingency.flight.flightNumber = fl.flightNumber;
        this.contingency.flight.origin = fl.origin;
        this.contingency.flight.destination = fl.destination;
        this.contingency.flight.etd.epochTime = fl.etd.epochTime;
        this.contingency.flight.etd.label = fl.etd.label;
        this.contingencyDateModel[0].updateFromEpoch(fl.etd.epochTime);
    }
    
    /**
     * Method to change form validation depending of selecting or not one checkbox (optional until is selected)
     */
    public onSelectOptional(checkboxName: string, itemsToValidate: string[]) {
        let i: number;
        
        for (i = 0; i < itemsToValidate.length; i++) {
            this.contingencyForm.get(itemsToValidate[i]).setValue(null);
            !this.contingencyForm.get(checkboxName).value ? this.contingencyForm.get(itemsToValidate[i]).setValidators(Validators.required) : this.contingencyForm.get(itemsToValidate[i]).clearValidators();
            this.contingencyForm.get(itemsToValidate[i]).updateValueAndValidity();
        }
    }
    
    private onCloseCreationContingencyForm(): void {
        this._dialogService.closeAllDialogs();
    }
    
    private newMessage(): void {
        this._messageData.changeTimeUTCMessage(this.utcModel.epochTime);
    }
    
    public validateAircraft(value: string): Boolean {
        let match = false;
        
        for(const item of this.aircraftList) {
            if(item.tail === value) {
                match = true;
            }
        }
        return match;
    }
    
    /**
     * Filter for aircraft observable list in view
     * @param {string} val
     * @return {Aircraft[]}
     */
    private aircraftFilter(val: string): Aircraft[] {
        return this.aircraftList.filter(aircraft =>
            aircraft.tail.toLocaleLowerCase().search(val.toLocaleLowerCase()) !== -1);
    }
    
    /**
     * Filter for flights observable list in view
     * @param {string} val
     * @return {Flight[]}
     */
    private flightFilter(val: string): Flight[] {
        return this.flightList.filter(flight =>
            flight.flightNumber.toLocaleLowerCase().search(val.toLocaleLowerCase()) !== -1);
    }
}
