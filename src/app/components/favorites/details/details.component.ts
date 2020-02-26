import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HourlyWeather } from 'src/app/interfaces/HourlyWeather';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

currentHourInfo: HourlyWeather;
currentIndex: number = 0;
  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.currentHourInfo = this.data[this.currentIndex];
  }

  getHourUP():void{
    this.currentIndex++
    this.currentHourInfo = this.data[this.currentIndex]   
  }

  getHourDOWN():void{
    this.currentIndex--
    this.currentHourInfo = this.data[this.currentIndex]   
  }

  
}
