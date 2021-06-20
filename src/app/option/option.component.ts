import { Component, forwardRef, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.sass'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionComponent),
      multi: true
    },
    { 
      provide: NG_VALIDATORS, 
      useExisting: forwardRef(() => OptionComponent),
      multi: true 
    }
  ]
})
export class OptionComponent implements OnInit , ControlValueAccessor{
  formArray!: FormArray; 
   
  constructor(private fb: FormBuilder) { 
    this.formArray = this.fb.array([]);
  }

  writeValue(value: any): void {
    if(value){
      this.formArray = new FormArray(
        value.map( (x:any) => {
          return new FormGroup({
            text: new FormControl(x.text, Validators.required),
            description: new FormControl(x.description, Validators.required)
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
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch(fn);
  }

  get options(){
    return this.formArray;
  }

  
  newOption(){
    return this.fb.group({
      text: [null, []],
      description: [null, []]
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

  toFormGroup(obj : AbstractControl){
    return obj as FormGroup;
  }
  
  ngOnInit(): void {
    
  }

  //#region   OLD
  /*
  optionsForm!: FormGroup;  
  
  constructor(private fb: FormBuilder) { 
    this.optionsForm= this.fb.group({
      options : this.fb.array([])
    });
  }
  writeValue(obj: any): void {
    if(obj){
      this.optionsForm.patchValue(obj);
    }
  }

  onChange: any = () =>{};
  onTouch: any = () =>{};
  registerOnChange(fn: any): void {
    this.optionsForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouch(fn);
  }

  get options(){
    return this.optionsForm.get('options') as FormArray;
  }

  newOption(){
    return this.fb.group({
      text: [null, []],
      description: [null, []]
    });
  }

  addOption(){
    this.options.push(this.newOption());
  }

  ngOnInit(): void {
  }
  */
  //#endregion
}
