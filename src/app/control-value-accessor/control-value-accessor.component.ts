import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Rating } from '../../../projects/ngx-ui-components/src/lib/cva/star-rater/star-rater.component';

@Component({
  selector: 'app-control-value-accessor',
  templateUrl: './control-value-accessor.component.html',
  styleUrls: ['./control-value-accessor.component.scss'],
})
export class ControlValueAccessorComponent implements OnInit {
  public ratings: Rating[] = [
    {
      text: 'must GTFO ASAP',
      color: '#ff3722',
    },
    {
      text: 'meh',
      color: '#ff8622',
    },
    {
      text: "it's ok",
      color: '#ffce00',
    },
    {
      text: "I'd be sad if a black hole ate it",
      color: '#73cf11',
    },
    {
      text: '10/10 would write review on Amazon',
      color: '#00b67a',
    },
  ];

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    rating: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {}
}
