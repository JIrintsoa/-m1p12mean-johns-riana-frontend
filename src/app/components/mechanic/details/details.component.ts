import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentModel } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  token: string;
  appointmentId = '67e11b7fe354279629bf3779';
  comments: CommentModel[] = []
  newComment: string
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
  ) {
    this.token = authService.getToken();
  }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.commentService.getComments(this.appointmentId, this.token).subscribe({
      next: (response: any) => {
        const result = response;
        this.comments = result.items || [];
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      }
    });
  }

  addComment(): void {
    this.commentService.addComment(this.appointmentId, this.newComment, this.token).subscribe({
      next: (response) => {
        console.log('Vehicle added successfully:', response);
        this.showMessage('Véhicule ajouté avec succès!', 'success');
        this.fetchComments(); // Refresh the vehicle list
        this.resetForm(); // Optionally reset the form after submission
      },
      error: (error) => {
        this.showMessage('Erreur lors de l\'ajout du véhicule.', 'error');
        console.error('Error adding vehicle:', error);
      }
    });
}
resetForm(): void {
  this.newComment = '';
}

showMessage(message: string, type: 'success' | 'error'): void {
  if(type === 'success') {
  this.successMessage = message;
  this.errorMessage = '';
} else {
  this.errorMessage = message;
  this.successMessage = '';
}

// Hide the message after 3 seconds
setTimeout(() => {
  if (type === 'success') {
    this.successMessage = '';
  } else {
    this.errorMessage = '';
  }
}, 10000); 
  }
}

