import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ToolTipComponent,
    ErrorMessageComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent,
    ToolTipComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule { }
