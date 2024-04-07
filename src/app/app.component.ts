import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div id="statusArea" className="status">Next player: <span>{{playerTurn}}</span></div>
    <div id="winnerArea" className="winner">Winner: <span>{{winner}}</span></div>
    <button (click)="restartGame()">Reset</button>
    <section>
      <div class="row" *ngFor="let columns of board; let i = index">
        <button *ngFor="let col of columns; let j = index" (click)="markPosition(i, j)" class="square" style="width:50px;height:50px;">{{col}}</button>
      </div>
    </section>
  `,
  styles: [`
    .row {
      display:flex;
    }
  `],

  standalone: true,
  imports: [RouterOutlet, CommonModule],
})
export class AppComponent implements OnInit {
  // code goes here
  winner = "None";
  gameOver = false;
  playerTurn = 'X';
  player1 = 'X';
  player2 = 'O';
  
  board: any [][] = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  ngOnInit() { 
    this.playerTurn = this.player1;
  }

  markPosition(row: number, column: number) {
    if (this.gameOver){
      alert('The game is already over. Reset is required');
      return;
    }
    if (this.board[row][column] != ' ') {
      alert('El cuadrante ya esta marcado');
      return;
    }
    this.board[row][column] = this.playerTurn;
    this.checkConditionToWin(row, column);
    this.playerTurn = this.playerTurn == this.player1 ? this.player2 : this.player1;
    
  }

  checkConditionToWin(row: number, column: number) {
    let totalMarksVertical = 0;
    let totalMarksHorizontal = 0;
    let diagonal1 = 0;
    let diagonal2 = 0;
    for (let i = 0; i < 3; i++) {
      totalMarksVertical += (this.playerTurn == this.board[(row+i)%3][column] ? 1 : 0);
      totalMarksHorizontal += (this.playerTurn == this.board[row][(column+i)%3] ? 1 : 0);
      diagonal1 += (this.playerTurn == this.board[i][i] ? 1 : 0);
      diagonal2 += (this.playerTurn == this.board[i][2-i] ? 1 : 0);
    }
    if (totalMarksVertical > 2 || totalMarksHorizontal > 2 || diagonal1 > 2 || diagonal2 > 2){
      this.winner = this.playerTurn;
      alert(`El ganador es el player: ${this.playerTurn}`);
      this.gameOver = true;
    }
  }

  restartGame() {
    this.gameOver = false;
    this.playerTurn = this.player1;
    this.winner = "None";
    this.board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];
  }

}
