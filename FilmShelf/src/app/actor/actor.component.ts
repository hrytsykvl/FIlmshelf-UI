import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CastMember } from '../models/cast-member';

@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss'
})
export class ActorComponent {
  actor = input.required<CastMember>();
  actorClicked = output<number>();

  onActorClicked() {
    if (this.actor) {
      this.actorClicked.emit(this.actor().id);
    }
  }
}
