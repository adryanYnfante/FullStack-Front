import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api'
// import { answe } from 'src/app/models/answe';
import { AnswerI } from 'src/app/models/answer-i';
import { QuestionI } from 'src/app/models/question-i';
import { QuestionService } from 'src/app/Service/question.service';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css'],
  providers: [MessageService],
})
export class EditAnswerComponent implements OnInit {
  @Input() question2: QuestionI[] | undefined;
  userLogged = this.authService.getUserLogged();
  answers: AnswerI[] | undefined;
  @Input() idanswer!: AnswerI;
  answer!: AnswerI;
  // answer: AnswerI = {
  //   id: '',
  //   userId: '',
  //   questionId: '',
  //   answer: '',
  //   position: 0
  // };
  constructor(
    private modalService: NgbModal,
    public authService: ServiceService,
    private services: QuestionService,
    private toastr: ToastrService,
    private route: Router,
    private messageService: MessageService
  ) {
      this.answer = {
    id: '',
    userId: '',
    questionId: '',
    answer: '',
    position: 0
  };
   }

  ngOnInit(): void {
  }

  editAnswer(answer: AnswerI){
    console.log('this.idanswer :>> ', this.idanswer);
    answer.questionId=this.idanswer.questionId;
    answer.userId=this.idanswer.userId;
    answer.id = this.idanswer.id;
    console.log('answer :>> ', this.answer);
   this.services.editAnswer(answer).subscribe((v)=>{

   });

   this.modalService.dismissAll();
   this.messageService.add({
     severity: 'success',
     summary: 'Se ha actualizado la pregunta',
    });
  //  setTimeout(() => {
  //    window.location.reload();
  //  }, 2000);
  }

  openVerticallyCentered(content: any) {
    console.log("hola");
    this.modalService.open(content, { centered: true });
  }

}
