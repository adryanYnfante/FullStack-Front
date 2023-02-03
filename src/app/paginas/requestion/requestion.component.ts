import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerI } from 'src/app/models/answer-i';
import { QuestionI } from 'src/app/models/question-i';
import { QuestionService } from 'src/app/Service/question.service';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-requestion',
  templateUrl: './requestion.component.html',
  styleUrls: ['./requestion.component.css']
})
export class RequestionComponent implements OnInit {
  userLogged = this.authService.getUserLogged();
  question:QuestionI | undefined;
  answers: AnswerI[] | undefined | any[] ;
  answersNew: AnswerI[]| undefined | any[] ;
  currentAnswer:number=0;
  agregarRespuestas=4
  questions: QuestionI[] | undefined;
  throttle :number=0;
  distance: number=1;
  page: number = 0;
  uid: any;

  constructor(
    private route:ActivatedRoute,
    private questionService:QuestionService,
    private service: QuestionService,
    public authService: ServiceService,

    ) {

    }

  id:string | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getQuestions(`${id}`);
    this.get2();

  }
  get2(){
    let id = this.route.snapshot.paramMap.get('id');
    this.service.getAnswer(id).subscribe((data) => {
          this.answers = data.answers;
          this.answersNew=this.answers?.slice(0,4);

    });
  }
  getQuestions(id:string):void{
    this.questionService.getQuestion(id).subscribe(data=>{
      this.question=data;

    })

  }
  AddAnwsers(index:number) {
    let last=this.currentAnswer+index;
    for(let i = this.currentAnswer;i<last;i++){
    }
    this.currentAnswer+=10;
  }
  onScroll() {
    this.agregarRespuestas=this.agregarRespuestas+=4
    this.answersNew=this.answers?.slice(0,this.agregarRespuestas);
    console.log("cargar mas datos")
  }

}
