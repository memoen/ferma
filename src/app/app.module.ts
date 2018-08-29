import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { PageFieldViewComponent } from './page-field-view/page-field-view.component';
import { HeaderGlobalComponent } from './header-global/header-global.component';
import { FooterComponent } from './fieldView/footer/footer.component';
import { SqCellComponent } from './fieldView/sq-cell/sq-cell.component';
import { CellInfoComponent } from './fieldView/cell-info/cell-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {FieldsStoreService,DayTimer,Market} from './service/fields-store.service';
import {CellInfoService} from './service/cell-info.service';
import {SelectedSeedService} from './service/selected-seed.service';
import {SeedService} from './service/storage/seed.service';
import {VieldViewStateService,StorePageView} from './service/vield-view-state.service';
import { CellAreaComponent } from './fieldView/cell-area/cell-area.component';
import { SideFilterComponent } from './fieldView/side-filter/side-filter.component';
import { GeneralStorePageComponent } from './store/general-store-page/general-store-page.component';
import { MarketPageViewComponent } from './market-page-view/market-page-view.component';
import { RouterModule, Routes } from '@angular/router';
import { SellMenuComponent } from './store/sell-menu/sell-menu.component';


var links:Routes =[
  {path: 'field', component: PageFieldViewComponent},
  {path: 'market', component: MarketPageViewComponent},
  {path: 'storage', component: GeneralStorePageComponent},
  {path: '', redirectTo: '/field' ,pathMatch: 'full'},
]
@NgModule({
  declarations: [
    AppComponent,
    PageFieldViewComponent,
    HeaderGlobalComponent,
    FooterComponent,
    SqCellComponent,
    CellInfoComponent,
    CellAreaComponent,
    SideFilterComponent,
    GeneralStorePageComponent,
    MarketPageViewComponent,
    SellMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    FormsModule,
    RouterModule.forRoot(links),
  ],
  providers: [FieldsStoreService,CellInfoService,
    VieldViewStateService,SelectedSeedService,
    SeedService,DayTimer,Market,StorePageView],
  bootstrap: [AppComponent]
})
export class AppModule { }
