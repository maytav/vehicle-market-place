import {AspectRatioImageComponent} from "@app/shared/components/aspect-ratio-image/aspect-ratio-image.component";
import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";

@NgModule({
    declarations: [
        AspectRatioImageComponent,
    ],
    imports: [
        CommonModule,
        NgOptimizedImage
    ],


    exports: [
        AspectRatioImageComponent
    ]
})
export class AspectRatioImageModule {
}
