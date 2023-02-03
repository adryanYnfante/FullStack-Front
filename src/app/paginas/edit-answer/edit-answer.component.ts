import { Component, Input, OnInit } from '@angular/core';
import { AnswerI } from 'src/app/models/answer-i';


import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { answe } from 'src/app/models/answe';

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




  @Input()answerEdit: AnswerI = {
   id:"",
   userId:"",
   questionId:"",
   answer:"",
   position:0,
  };

  constructor(
    private modalService: NgbModal,
    public authService: ServiceService,
    private services: QuestionService,
    private toastr: ToastrService,
    private route: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }


  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  EditAnswer(){
    this.services.editAnswer(this.answerEdit).subscribe({
      next: (v) => {
        console.log(v)
        if(v){
          this.modalService.dismissAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Se ha agregado la respuesta',
           })}},

    });



  }

}
