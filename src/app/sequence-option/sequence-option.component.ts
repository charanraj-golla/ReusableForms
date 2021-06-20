import { Component, forwardRef, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-sequence-option',
  templateUrl: './sequence-option.component.html',
  styleUrls: ['./sequence-option.component.sass'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SequenceOptionComponent),
      multi: true
    },
    { 
      provide: NG_VALIDATORS, 
      useExisting: forwardRef(() => SequenceOptionComponent),
      multi: true 
    }
  ]
})
export class SequenceOptionComponent implements OnInit , ControlValueAccessor{
  //optionsForm!: FormGroup;
  formArray!: FormArray;  
  
  constructor(private fb: FormBuilder) { 
    this.formArray = this.fb.array([]);
    // this.optionsForm= this.fb.group({
    //   options : this.fb.array([])
    // });
  }
  writeValue(value: any): void {
    if(value){
      //this.optionsForm.patchValue(obj);

      this.formArray = new FormArray(
        value.map( (x:any) => {
          return new FormGroup({
            text: new FormControl(x.text, Validators.required),
            ix: new FormControl(x.ix, Validators.required)
          });
        })
      );
      this.formArray.valueChanges.subscribe(res => {
        this.onChange(res);
      });
    }
  }

  onChange: any = () =>{};
  onTouch: any = () =>{};
  registerOnChange(fn: any): void {
    //this.optionsForm.valueChanges.subscribe(fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch(fn);
  }

  get options(){
    return this.formArray;
    //return this.optionsForm.get('options') as FormArray;
    
  }

  newOption(){
    return this.fb.group({
      text: [null, []],
      ix: [null, []]
    });
  }

  addOption(){
    this.options.push(this.newOption());
  }

  validate({ value }: FormControl) {
    return !this.formArray || this.formArray.valid
      ? null
      : { error: "Some fields are not fullfilled" };
  }

  ngOnInit(): void {
  }

  toFormGroup(obj : AbstractControl){
    return obj as FormGroup;
  }

}
