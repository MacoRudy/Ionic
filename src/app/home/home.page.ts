import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Question } from '../models/Question';
import { OpenTriviaService } from '../providers/OpenTriviaService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public toastCtrl: ToastController, public openTriviaService: OpenTriviaService) { }

  public result: boolean = false;
  public pseudo: string = "Rudy";
  public difficulte: string = "easy";
  public error: string = "";
  public reponse: boolean = false;
  public saveinfos = false;
  public listeQuestions: Question[] = [];
  public numQuestion: number = 0;
  public question: Question;
  public listeReponses: string[] = [];
  public fin: boolean = false;
  public next: boolean = false;
  public btnColor: string = "medium";


  async showToast(erreur: string) {
    const toast = await this.toastCtrl.create({
      message: erreur,
      duration: 3000
    });
    toast.present();
  }

  public async verification() {

    if (!this.pseudo || this.pseudo.length < 3) {
      this.showToast("Veuillez choisir un pseudo d'au moins 3 caractères");
      this.result = false;
      return;
    }

    if (this.difficulte == "") {
      this.showToast("Veuillez choisir une difficulte");
      this.result = false
      return;
    }

    
   await this.getListeQuestions();
   this.listeQuestions = this.shuffle(this.listeQuestions);
   this.afficherQuestion();
   this.result = true;
    
  }

  public async getListeQuestions() {
    try {
      this.listeQuestions = await this.openTriviaService.getQuestions(1, this.difficulte);
      console.log( this.listeQuestions)
     
    } catch {
        console.log("erreur")
      
    }
  }

  public afficherQuestion() {
    this.question = this.listeQuestions[this.numQuestion];
    // creation de la liste de reponses
    this.listeReponses.push(this.question.correct_answer)
    for (let rep of this.question.incorrect_answers) {
      this.listeReponses.push(rep)
    }
    this.listeReponses = this.shuffle(this.listeReponses);
  }

  ClicReponse(value: string) {

    // changement de couleur en fonction de la bonne reponse
    if (value === this.question.correct_answer) {
      this.btnColor = "success"
    } else {
      this.btnColor = "danger"
    }

    if (this.numQuestion >= this.listeQuestions.length - 1) {
      this.fin = true;
    } else {
      this.next = true;
    }

  }

  ClicNext() {

    this.numQuestion++;
    this.listeReponses = [];
    this.afficherQuestion();
    this.next = false;


  }

  ClicAccueil() {
    this.result = false;
    this.numQuestion = 0;
    this.listeReponses = [];
    this.next = false;
    this.listeQuestions = [];
    this.fin = false;
  }

  public shuffle(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * (i + 1));
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }


  ngOnInit() { }
}

