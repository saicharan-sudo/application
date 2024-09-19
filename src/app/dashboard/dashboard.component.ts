import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  
  intervalId:any;
  progressPercentage:number = 0;
  displayOffCanvas:boolean = false;
  hideAndShowModal:boolean = true;
  
  
  constructor(private toastr: ToastrService) {
  }
  
  start(){
    clearInterval(this.intervalId);
    this.displayOffCanvas = true;
    
    this.countdownTimer(10, (timeleft, timerEnded, intervalId) => {
      
      this.progressPercentage = this.progressPercentage + 10;
      this.intervalId = intervalId;
      
      if (timerEnded) {
        this.progressPercentage = 0;
        this.displayOffCanvas = false;
        this.toastr.success('Migration applied successfully','Success');
      }
    });
  }
  
  countdownTimer(countdownSeconds, callback) {
    
    let timer = countdownSeconds;
    
    const intervalId = setInterval(() => {

      let timeleft : number = 0;
      
      callback(timeleft, false, intervalId);
      
      if (--timer < 0) {
        clearInterval(intervalId);
        callback(0, true, intervalId); // Flag indicating timer ended
      }
    }, 1000);
  }
  hideAndShowFn(){
    // if(this.displayOffCanvas){
      this.hideAndShowModal = !this.hideAndShowModal;
    // }
  }
}
