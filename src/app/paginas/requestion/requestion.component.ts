import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerI } from 'src/app/models/answer-i';
import { QuestionI } from 'src/app/models/question-i';
import { QuestionService } from 'src/app/Service/question.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceService } from 'src/app/Service/service.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-requestion',
  templateUrl: './requestion.component.html',
  styleUrls: ['./requestion.component.scss']
})
export class RequestionComponent implements OnInit {
  
  userLogged = this.authService.getUserLogged();
  uid: any;
  question:QuestionI | undefined;
  answers: Observable<any> | undefined;
  answersNew: AnswerI[]=[];
  currentAnswer:number=0;
  
  questions: QuestionI[] | undefined;
 
  page: number = 0;

  constructor(
    private modalService: NgbModal,
    private route:ActivatedRoute,
    private questionService:QuestionService,
    private service: QuestionService,
    public authService: ServiceService

    ) {
    }

  id:string | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getQuestions(`${id}`);
    this.get2();
    this.getuser();
    
  }
  
  get2(){
    let id = this.route.snapshot.paramMap.get('id');
    
    this.service.getAnswer(id).subscribe((data) => {  
          this.answers = of(data.answers);
          console.log(data.answers);
          
          
    });
  }

  getQuestions(id:string):void{
    this.questionService.getQuestion(id).subscribe(data=>{
      this.question=data;
      this.answers = of(data.answers);
    })
  }
  getuser(){
    this.userLogged.subscribe(value =>{
      this.uid=value?.uid
      console.log(this.uid);
      
  });
  }

  AddAnwsers(index:number) {
    let last=this.currentAnswer+index;
    for(let i = this.currentAnswer;i<last;i++){
    }
    this.currentAnswer+=10;
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onScroll() {
  }
}
