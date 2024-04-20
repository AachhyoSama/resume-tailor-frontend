import { Component } from '@angular/core';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { UserAPI } from '../../../service/api/user-api.service';

@Component({
  selector: 'ai-cover-letter',
  styleUrls: ['./ai-cover-letter.component.scss'],
  templateUrl: './ai-cover-letter.component.html',
})
export class AiCoverLetterComponent {
  status: NbComponentStatus = 'primary' ;
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  size: NbComponentSize =  'tiny';

  jobDescription: string = null;
  loading: boolean = false;

  timer: any;
  seconds: number = 0;

  userId: string;
  formData : any
  constructor(private userAPI: UserAPI, ) {}

  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  ngOnDestroy() {
    this.stopTimer(); // Make sure to stop the timer when the component is destroyed
  }

  

  onGenerateCoverLetter() {
    if (this.jobDescription === null ){
      alert("Please fill out the Job Description"); 
      return; 
    }
    
    
    this.loading = true;
    const requestBody = { jobDesc:this.jobDescription};   

    this.startTimer();
    let loggedInEmail = localStorage.getItem('loggedInEmail');
    this.userAPI.generateCoverLetter(requestBody, loggedInEmail).subscribe(
      (response) => {
        this.loading = false;
        this.stopTimer();        
        console.log(response.data)

        this.formData = response.data
        console.log(this.formData)
      },
      (error: any) => {
        console.error("Error fetching responsibilities:", error);
        this.loading = false;
        this.stopTimer();
      }
    );
  }

  updateReportViewer(response: any){

  }

  getFormData() {
    return this.formData
  }
}
