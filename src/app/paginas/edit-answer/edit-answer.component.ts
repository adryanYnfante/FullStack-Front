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
  styleUrls: ['./edit-answer.component.css']
})
export class EditAnswerComponent implements OnInit {

  @Input() answer2: AnswerI[] | undefined;

  userLogged = this.authService.getUserLogged();
  @Input() idanswer: any = '';
  answers: AnswerI = {
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
    this.getData();
    this.getDatos();
  }

  getDatos() {
    this.answers = this.idanswer;
  }


  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  getData() {
    this.userLogged.subscribe(value => {
    })

  }


  editAnswers(answers: AnswerI): void {
    answers.questionId = this.answers.questionId;
    answers.userId = this.answers.userId;

    this.services.editAnswer(answers).subscribe((v) => {

    });

    this.modalService.dismissAll();
    this.messageService.add({
      severity: 'success',
      summary: 'Se ha actualizado la respuesta',
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  saveAnswer(answers: AnswerI): void {
    if (answers.answer) {
      this.modalService.dismissAll();
      this.services.saveAnswer(answers).subscribe({
        next: (v) => {
          if (v) {
            this.messageService.add({
              severity: 'success',
              summary: 'Se ha agregado la respuesta',

            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {

          }
        },
        error: (e) =>
          this.toastr.error(e.mesaje, 'Fail', {
            timeOut: 3000,
          }),
        complete: () => console.info('complete'),
      });
    } else {

      this.messageService.add({
        severity: 'error',
        summary: 'Rectifique los datos',
        detail: '(Campos Vacios)-Intente de Nuevo',
      });
    }
  }
}
