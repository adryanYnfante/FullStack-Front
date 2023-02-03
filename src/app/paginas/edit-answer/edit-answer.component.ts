import { Component, Input, OnInit } from '@angular/core';
import { AnswerI } from 'src/app/models/answer-i';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { QuestionService } from 'src/app/Service/question.service';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css'],
  providers: [MessageService],
})
export class EditAnswerComponent implements OnInit {
  @Input() answer: AnswerI = {
    id: '',
    userId: '',
    questionId: '',
    answer: '',
    position: 0,
  };
  constructor(
    private modalService: NgbModal,
    private messageService: MessageService,
    private services: QuestionService
  ) {}

  ngOnInit(): void {}

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  updateAnswer(): void {
    if(this.answer.answer && this.answer.position){
      this.modalService.dismissAll();

    this.services.editAnswer(this.answer).subscribe({
      next: (v) => {
        if (v) {
          this.messageService.add({
            severity: 'success',
            summary: 'Se ha actualizado la respuesta',
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
      error: (e) => {
        console.log(e);

      },
      complete: () => console.info('complete'),
    });
  }
  }
}
