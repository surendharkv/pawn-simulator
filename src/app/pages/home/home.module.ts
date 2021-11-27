import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BoardComponent } from 'src/app/components/board/board.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoardControlsComponent } from 'src/app/components/board-controls/board-controls.component';
import { HistoryComponent } from 'src/app/components/history/history.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
    BoardComponent,
    BoardControlsComponent,
    HistoryComponent,
  ],
})
export class HomePageModule {}
