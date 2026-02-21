import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @Input() control : any;
  @Input() typeInput !: string;
  @Input() idInput !: string;
  @Input() element : string = 'input';
  @Input() labelInput !: string;

  flag: boolean = true;

}
