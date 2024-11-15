import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule  } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  coverCards = Array.from({ length: 5 }, (_, i) => ({ name: `Image ${i + 1}` }));
  pickCardAnimation:boolean = false;
  game: Game;
  currentCard: string | undefined = '';

  constructor(public dialog: MatDialog) {
    this.game = new Game();
  }

  ngOnInit(): void {
    
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game!.stack.pop();
      this.pickCardAnimation = true;
      
      setTimeout(() => {
        if (this.currentCard) {
          this.game.playerCards.push(this.currentCard);
        }
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.pickCardAnimation = false;
      }, 1250);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);        
      }
    });
  }
}
