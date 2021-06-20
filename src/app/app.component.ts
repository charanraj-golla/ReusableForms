import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ReusableForms';

  selected!: string;
  form!: FormGroup;

  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      type: [null, []],
      options: this.fb.control([])
    });
  }

  changeType(event:any){
    this.selected = event?.target.value;

  }
}
