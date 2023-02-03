import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { answe } from 'src/app/models/answe';
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

  @Input() answer: AnswerI={
    id: '',
    userId:'',
    questionId:'',
    answer:'',
    position:0
  };

  constructor(
    private modalService: NgbModal,
    private messageService: MessageService,
    private services: QuestionService,
  ) { }

  ngOnInit(): void {

  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  editAnswers(answers: AnswerI): void {
    answers.questionId = this.answer.questionId;
    answers.userId = this.answer.userId;

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






  saveAnswer(): void {
    this.answer.questionId = this.answer.questionId;
    this.services.editAnswer(this.answer).subscribe({

      next: (v) => {
        console.log(v)
        if(v){
          this.modalService.dismissAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Se ha agregado la respuesta',

           });
        //    setTimeout(() => {
        //    window.location.reload();
        //  }, 1000);
        }
      },
      error: (e) =>
      {
        console.log(e)
        if(e.status == 200){
          this.modalService.dismissAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Respuesta editada correctamente',

           });
        //    setTimeout(() => {
        //    window.location.reload();
        //  }, 1000);
        }
      //   this.modalService.dismissAll();
      //   this.messageService.add({
      //   severity: 'error',
      //   summary: 'Rectifique los datos',
      //   detail: '(Campos Vacios)-Intente de Nuevo',
      // })
    },
      complete: () => console.info('complete'),
    });
  }
}




















































//   userLogged = this.authService.getUserLogged();
//   question:QuestionI | undefined;
//   answers: AnswerI[] | undefined;

//   @Input() item: any;
//   constructor(
//     private route:ActivatedRoute,
//     private modalService: NgbModal,
//     private services: QuestionService,
//     private toastr: ToastrService,
//     private router: Router,
//     private formBuilder: FormBuilder,
//     private messageService: MessageService,
//     public authService: ServiceService
//   ) {}
//   @Input() idanswer: any ='';
//   @Input() answer: AnswerI = {
//     id: '',
//     userId: '',
//     questionId: '',
//     answer: '',
//     position: 0,
//   };

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     this.getQuestions(`${id}`);
//     this.get2();
//   }

//   get2(){
//     let id = this.route.snapshot.paramMap.get('id');
//     this.services.getAnswer(id).subscribe((data) => {
//           this.answers = data.answers;
//     });
//   }

//   // getDatos(){
//   //   let id = this.route.snapshot.paramMap.get('id');
//   //   this.services.getAnswer(id)
//   // }



//   getQuestions(id:string):void{
//     this.services.getQuestion(id).subscribe(data=>{
//       this.question=data;
//       this.answers = data.answers;
//     })

//  }

  // getData(){
  //   this.userLogged.subscribe(value=>{
  //   })

  // }

  // openVerticallyCentered(content: any) {
  //   this.modalService.open(content, { centered: true });
  // }




  // editAnswer(answer: AnswerI): void{
  //   answer.id = this.idanswer.id;

  //   this.services.editAnswer(answer).subscribe((v)=>{

  //   });

  //   this.modalService.dismissAll();
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Se ha actualizado la pregunta',
  //    });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);

  // }












  // saveAnswer(): void {
  //   console.log(this.answer);
  //   this.answer.userId = this.answer.userId;
  //   console.log(this.item.userId);
  //   this.answer.questionId = this.item.id;
  //   this.services.editAnswer(this.answer).subscribe({
  //     next: (v) => {
  //       if(v){
  //         this.modalService.dismissAll();
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Se ha agregado la respuesta',

  //          });
  //          setTimeout(() => {
  //          window.location.reload();
  //        }, 1000);
  //       }
  //     },
  //     error: (e) =>{
  //       console.log(e);
  //     }

      // this.messageService.add({
      //   severity: 'error',
      //   summary: 'Rectifique los datos',
      //   detail: '(Campos Vacios)-Intente de Nuevo',

      // }
      // )
//       ,
//       complete: () => console.info('complete'),
//     });
//   }
// }
