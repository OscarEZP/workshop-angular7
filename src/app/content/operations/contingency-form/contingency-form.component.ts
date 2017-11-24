import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-contingency-form',
    templateUrl: './contingency-form.component.html',
    styleUrls: ['./contingency-form.component.scss']
})

export class ContingencyFormComponent {

    myControl: FormControl = new FormControl();
    filteredOptions: Observable<String[]>;

    constructor(
        public dialogRef: MatDialogRef<ContingencyFormComponent>
    ) { }

    options = [
        'AAA-BB',
        'BBB-CC',
        'CCCC-DD',
        'DDD-EE'
    ];

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges
            .startWith('')
            .map(val => this.filter(val));
    }

    filter(val: string): string[] {
        return this.options.filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
