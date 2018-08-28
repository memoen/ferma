import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageFieldViewComponent } from './page-field-view/page-field-view.component';
import { HeaderGlobalComponent } from './header-global/header-global.component';
import { FooterComponent } from './fieldView/footer/footer.component';
import { SqCellComponent } from './fieldView/sq-cell/sq-cell.component';
import { CellInfoComponent } from './fieldView/cell-info/cell-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {FieldsStoreService} from './service/fields-store.service';
import {CellInfoService} from './service/cell-info.service';
import {SelectedSeedService} from './service/selected-seed.service';
import {SeedService} from './service/storage/seed.service';
import {VieldViewStateService} from './service/vield-view-state.service';
import { CellAreaComponent } from './fieldView/cell-area/cell-area.component';
import { SideFilterComponent } from './fieldView/side-filter/side-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    PageFieldViewComponent,
    HeaderGlobalComponent,
    FooterComponent,
    SqCellComponent,
    CellInfoComponent,
    CellAreaComponent,
    SideFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule
  ],
  providers: [FieldsStoreService,CellInfoService,VieldViewStateService,SelectedSeedService,SeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
