import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BrandModel, BrandModelFilter} from '../../models';
import {ListContainerMixin} from '@app/shared/containers/list-container.mixin';
import {Decorate} from '@app/shared/decorators/decorate.decorator';
import {ContainerContext} from '@app/shared/stores/models/container-context';
import {BrandModelsActions} from '@app/brand-models/stores/brand-models.actions';
import {BrandModelsState} from '@app/brand-models/stores/brand-models.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-brand-models',
  templateUrl: './brand-models.component.html',
  styleUrls: ['./brand-models.component.scss']
})
@Decorate<ContainerContext>({actions: BrandModelsActions, stateClass: BrandModelsState})
export class BrandModelsComponent extends ListContainerMixin<BrandModel, BrandModelFilter>() implements OnInit {

  brands = '';
  override items$: Observable<BrandModel[]>
  models: any[] = [
    {
      name: 'Model 3',
      description: 'Description for Car Model 1.',
      imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3.png'
    },
    {
      name: 'Model Y',
      description: 'Description for Car Model 2.',
      imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-Y.png'
    },
    {
      name: 'Model S',
      description: 'Description for Car Model 3.',
      imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png'
    },
    {
      name: 'Model X',
      description: 'Description for Car Model 3.',
      imageUrl: 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-X.png'
    }
    // ניתן להוסיף רכבים נוספים כאן
  ];

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector)
  }

  override ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(params => {
      this.brands = params['brand'];
      console.log(this.brands)
    });
  }

  protected override getFilter(): any {
    return {...super.getFilter(), make: this.route.snapshot.params['brand']};
  }
}
