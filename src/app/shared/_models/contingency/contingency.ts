import { Aircraft } from '../aircraft';
import { Backup } from '../backup';
import { Flight } from '../flight';
import { Safety } from '../safety';
import { Status } from '../status';
import { TimeInstant } from '../timeInstant';
import { Close } from './close';

export class Contingency {

    private _id: number;
    private _aircraft: Aircraft;
    private _barcode: string;
    private _creationDate: TimeInstant;
    private _close: Close;
    private _lastInformationPercentage: number;
    private _failure: string;
    private _flight: Flight;
    private _informer: string;
    private _isBackup: boolean;
    private _isClose: boolean;
    private _backup: Backup;
    private _reason: string;
    private _safetyEvent: Safety;
    private _status: Status;
    private _type: string;
    private _username: string;
    private _ttlPending: number;
    private _hasPendingMeeting: boolean;
    private _openDate: TimeInstant;
    private _isPlannedFlight: boolean;

    private constructor(

    ) {
        this._id = null;
        this._aircraft = Aircraft.getInstance();
        this._barcode = null;
        this._creationDate = TimeInstant.getInstance();
        this._failure = null;
        this._flight = Flight.getInstance();
        this._informer = null;
        this._isBackup = false;
        this._isClose = false;
        this._backup = Backup.getInstance();
        this._reason = null;
        this._safetyEvent = Safety.getInstance();
        this._status = Status.getInstance();
        this._type = null;
        this._username = null;
        this._ttlPending = 0;
        this._hasPendingMeeting = false;
        this._openDate = TimeInstant.getInstance();
        this._isPlannedFlight = false;
    }

    static getInstance(): Contingency {
        return new Contingency();
    }

    set lastInformationPercentage(value: number) {
        this._lastInformationPercentage = value;
    }

    get lastInformationPercentage(): number {
        return this._lastInformationPercentage;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get aircraft(): Aircraft {
        return this._aircraft;
    }

    set aircraft(value: Aircraft) {
        this._aircraft = value;
    }

    get barcode(): string {
        return this._barcode;
    }

    set barcode(value: string) {
        this._barcode = value;
    }

    get creationDate(): TimeInstant {
        return this._creationDate;
    }

    set creationDate(value: TimeInstant) {
        this._creationDate = value;
    }

    get failure(): string {
        return this._failure;
    }

    set failure(value: string) {
        this._failure = value;
    }

    get flight(): Flight {
        return this._flight;
    }

    set flight(value: Flight) {
        this._flight = value;
    }

    get informer(): string {
        return this._informer;
    }

    set informer(value: string) {
        this._informer = value;
    }

    get isBackup(): boolean {
        return this._isBackup;
    }

    set isBackup(value: boolean) {
        this._isBackup = value;
    }

    get isClose(): boolean {
        return this._isClose;
    }

    set isClose(value: boolean) {
        this._isClose = value;
    }

    get reason(): string {
        return this._reason;
    }

    set reason(value: string) {
        this._reason = value;
    }

    get safetyEvent(): Safety {
        return this._safetyEvent;
    }

    set safetyEvent(value: Safety) {
        this._safetyEvent = value;
    }

    get status(): Status {
        return this._status;
    }

    set status(value: Status) {
        this._status = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get close(): Close {
        return this._close;
    }

    set close(value: Close) {
        this._close = value;
    }

    get backup(): Backup {
        return this._backup;
    }

    set backup(value: Backup) {
        this._backup = value;
    }

    get ttlPending(): number {
        return this._ttlPending;
    }

    set ttlPending(value: number) {
        this._ttlPending = value;
    }
    get hasPendingMeeting(): boolean {
        return this._hasPendingMeeting;
    }

    set hasPendingMeeting(value: boolean) {
        this._hasPendingMeeting = value;
    }

    get openDate(): TimeInstant {
        return this._openDate;
    }

    set openDate(value: TimeInstant) {
        this._openDate = value;
    }

    static fromJsonArray(array: Array<Object>): Contingency[] {

        return array.map(obj => Contingency.parser(obj)
        );
    }

    get isPlannedFlight(): boolean {
        return this._isPlannedFlight;
    }

    set isPlannedFlight(value: boolean) {
        this._isPlannedFlight = value;
    }

    private static parser(obj: Object): Contingency {
        const item = new Contingency();
        item.id = obj['id'];
        item.aircraft = obj['aircraft'];
        item.barcode = obj['barcode'];
        item.creationDate = obj['creationDate'];
        item.failure = obj['failure'];
        item.flight = obj['flight'];
        item.informer = obj['informer'];
        item.isBackup = obj['isBackup'];
        item.isClose = obj['isClose'];
        item.backup = obj['backup'];
        item.reason = obj['reason'];
        item.safetyEvent = obj['safetyEvent'];
        item.status = obj['status'];
        item.type = obj['type'];
        item.username = obj['username'];
        item.ttlPending = obj['ttlPending'];
        item.hasPendingMeeting = obj['hasPendingMeeting'];
        item.openDate = obj['openDate'];
        return item;

    }

}
