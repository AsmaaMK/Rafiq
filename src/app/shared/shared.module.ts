import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ToasterComponent } from './components/toaster/toaster.component';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ToolTipComponent,
    CapitalizePipe,
    ToasterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    ToolTipComponent,
    ToasterComponent
  ]
})
export class SharedModule { }
