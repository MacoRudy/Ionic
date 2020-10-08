import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/Question';

@Injectable({
    providedIn: 'root'
}
)
export class OpenTriviaService {

    constructor(private HttpClient: HttpClient) {

    }

    public async getQuestions(nombreQuestions: number, difficulte: string):
        Promise<Array<Question>> {

            return new Promise((resolve, reject) => {
                  
           this.HttpClient.get('https://opentdb.com/api.php?amount=10')
                .toPromise() .then((response) => {
                    if (response["response_code"] == 0) {
                        resolve(response["results"]);
                        
                    } else {
                        reject("Le server n'a pas trouvé de valeur !")
                    }

                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
}
