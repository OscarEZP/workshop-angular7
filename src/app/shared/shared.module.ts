import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './_pipes/pipes.module';
import { CustomInterceptor } from './_services/apiRest.service';
import { CountdownComponent } from './components/countdown.component/countdown.component';
import { MaterialModule } from './modules/material.module';
import { EssComponent } from './components/ess/ess.component';

@NgModule({
    declarations: [
        CountdownComponent,
        EssComponent
    ],
    imports: [
        MaterialModule,
        PipesModule,
        TranslateModule.forRoot()
    ],
    exports: [
        MaterialModule,
        PipesModule,
        CountdownComponent,
        TranslateModule,
        EssComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptor,
            multi: true
        }
    ]
})

export class SharedModule { }
