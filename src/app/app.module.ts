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
import {FieldsStoreService,Market} from './service/fields-store.service';
import {CellInfoService, CellFactoryInfoService} from './service/cell-info.service';
import {SelectedSeedService} from './service/selected-seed.service';
import {SeedService} from './service/storage/seed.service';
import {VieldViewStateService,StorePageView} from './service/vield-view-state.service';
import { CellAreaComponent } from './fieldView/cell-area/cell-area.component';
import { SideFilterComponent } from './fieldView/side-filter/side-filter.component';
import { GeneralStorePageComponent } from './store/general-store-page/general-store-page.component';
import { MarketPageViewComponent } from './market-page-view/market-page-view.component';
import { RouterModule, Routes } from '@angular/router';
import { SellMenuComponent } from './store/sell-menu/sell-menu.component';
import { ForceTimeComponent } from './force-time/force-time.component';
import { FactoryViewPageComponent } from './factory-view-page/factory-view-page.component';
import { FactoryFieldComponent } from './factoryViewPage/factory-field/factory-field.component';
import { FactoryListComponent } from './factoryViewPage/factory-list/factory-list.component';
import { UpdateListComponent } from './update-list/update-list.component';
import { UpdateListViewComponentComponent } from './update-list-view-component/update-list-view-component.component';
import { FactorySqComponent } from './factoryViewPage/factory-sq/factory-sq.component';
import { FactoryConsoleComponent } from './factoryViewPage/factory-console/factory-console.component';



import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



var links:Routes =[
  {path: 'field/:id', component: PageFieldViewComponent},
  {path: 'market', component: MarketPageViewComponent},
  {path:'updates', component: UpdateListViewComponentComponent},
  {path: 'factory', component: FactoryViewPageComponent},
  {path: 'storage', component: GeneralStorePageComponent},
  {path: '', redirectTo: '/storage' ,pathMatch: 'full'},
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
    SellMenuComponent,
    ForceTimeComponent,
    FactoryViewPageComponent,
    FactoryFieldComponent,
    FactoryListComponent,
    UpdateListComponent,
    UpdateListViewComponentComponent,
    FactorySqComponent,
    FactoryConsoleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(links),
  ],
  providers: [FieldsStoreService,CellInfoService,
    VieldViewStateService,SelectedSeedService,
    SeedService,Market,StorePageView,CellFactoryInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
