import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  coverCards = Array.from({ length: 5 }, (_, i) => ({ name: `Image ${i + 1}` }));
  pickCardAnimation:boolean = false;
  game: Game;
  currentCard: string | undefined = '';

  constructor() {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game!.stack.pop();
      this.pickCardAnimation = true;
      console.log('New card:' + this.currentCard);
      console.log('Game is', this.game);
      
      setTimeout(() => {
        if (this.currentCard) {
          this.game.playerCards.push(this.currentCard);
        }
        this.pickCardAnimation = false;
      }, 1250);
    }
  }
}
