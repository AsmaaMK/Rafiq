import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ToasterComponent } from './components/toaster/toaster.component';
import { PostComponent } from './components/post/post.component';
import { SliderComponent } from './components/slider/slider.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IncreasePostViewsDirective } from './directives/increase-post-views.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ToolTipComponent,
    CapitalizePipe,
    ToasterComponent,
    PostComponent,
    SliderComponent,
    IncreasePostViewsDirective,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    LoadingSpinnerComponent,
    ToolTipComponent,
    ToasterComponent,
    PostComponent,
    SliderComponent,
    IncreasePostViewsDirective
  ],
})
export class SharedModule {}
