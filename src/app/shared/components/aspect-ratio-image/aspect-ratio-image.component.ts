import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-aspect-ratio-image',
    templateUrl: './aspect-ratio-image.component.html',
    styleUrls: ['./aspect-ratio-image.component.css']
})
export class AspectRatioImageComponent {
    @Input()
    public src: string;

    @Input()
    public minAspectRatio: number = 4 / 3;

    @Input()
    public maxAspectRatio: number = 1.77; // (16:9)

    public minHeight = 50;
    public maxHeight = "auto";

    constructor() {
    }

    public onLoad(event: Event) {
        const el: HTMLImageElement = event.target as HTMLImageElement;
        const originalWidth = el.naturalWidth;
        const originalHeight = el.naturalHeight;
        const targetAspectRatio = originalWidth / originalHeight;
        const currentAspectRatio = el.width / el.height;
        console.log(el.height)
        console.log(originalHeight)

        if (currentAspectRatio > targetAspectRatio) {
            // התמונה רחבה יותר מהיחס הרצוי
            el.width = el.height * targetAspectRatio
        } else {
            // התמונה גבוהה יותר מהיחס הרצוי או זהה לו
            // el.width = originalWidth;
            el.height = el.width / targetAspectRatio;

        }
        /*   if (aspectRatio >= this.maxAspectRatio) {
             this.maxHeight = "auto";
           } else {
             // ideally instead of 300 this would be something more dynamic
             this.maxHeight = Math.min(height, 300) + "px";
           }*/

        console.log("loaded", targetAspectRatio, this.maxAspectRatio);
    }
}
