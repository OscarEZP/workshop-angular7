import { Injectable } from '@angular/core';
import {MatSidenav, MatDrawerToggleResult} from '@angular/material';

@Injectable()
export class SidenavService {

    private sidenav: MatSidenav;

    public setSidenav(sidenav:MatSidenav){
        this.sidenav = sidenav;
    }

    public openSidenav():Promise<MatDrawerToggleResult>{
        return this.sidenav.open();
    }

    public closeSidenav():Promise<MatDrawerToggleResult>{
        return this.sidenav.close();
    }

    public toggleSidenav(isOpen?:boolean):Promise<MatDrawerToggleResult>{
        return this.sidenav.toggle(isOpen);
    }

}
