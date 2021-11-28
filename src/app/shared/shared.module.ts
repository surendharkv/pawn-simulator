import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputControl } from './controls/input/input.control';
import { SelectControl } from './controls/select/select.control';

const declareAndExport = [InputControl, SelectControl];
const importAndExport = [IonicModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [...declareAndExport],
  imports: [CommonModule, ...importAndExport],
  exports: [...declareAndExport, ...importAndExport],
})
export class SharedModule {}
