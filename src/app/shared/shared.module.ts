import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ToasterComponent } from './components/toaster/toaster.component';
import { PostComponent } from './components/post/post.component';
import { SliderComponent } from './components/slider/slider.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncreasePostViewsDirective } from './directives/increase-post-views.directive';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchDropDownComponent } from './components/search-drop-down/search-drop-down.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ToolTipComponent,
    CapitalizePipe,
    ToasterComponent,
    PostComponent,
    SliderComponent,
    IncreasePostViewsDirective,
    DropDownComponent,
    FilterPipe,
    SearchDropDownComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    LoadingSpinnerComponent,
    ToolTipComponent,
    ToasterComponent,
    PostComponent,
    SliderComponent,
    IncreasePostViewsDirective,
    DropDownComponent,
    SearchDropDownComponent,
  ],
})
export class SharedModule {}
