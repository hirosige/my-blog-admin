import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, User } from '../class/chat';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { SessionService } from '../core/service/session.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public content = '';
  public comments: Observable<Comment[]>;
  public current_user: User;

  constructor(
    private db: AngularFirestore,
    private session: SessionService
  ) {
    this.session
      .sessionState
      .subscribe((data) => {
        this.current_user = data.user;
      });
  }

  ngOnInit() {
    this.comments = this.db
      .collection<Comment>('comments', ref => {
        return ref.orderBy('date', 'asc');
      })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as Comment;
          const key = action.payload.doc.id;
          const comment_data = new Comment(data.user, data.content);

          comment_data.setData(data.date, key);
          return comment_data;
        })));
  }

  addComment(e: Event, comment: string) {
    e.preventDefault();
    if (comment) {
      this.db
        .collection('comments')
        .add(new Comment(this.current_user, comment).deserialize());
      this.content = '';
    }
  }

  toggleEditComment(comment: Comment) {
    comment.edit_flag = (!comment.edit_flag);
  }

  saveEditComment(comment: Comment) {
    this.db
      .collection('comments')
      .doc(comment.key)
      .update({
        content: comment.content,
        date: comment.date
      })
      .then(() => {
        alert('コメントを更新しました');
        comment.edit_flag = false;
      });
  }

  resetEditComment(comment: Comment) {
    comment.content = '';
  }

  deleteComment(key: string) {
    this.db
      .collection('comments')
      .doc(key)
      .delete()
      .then(() => {
        alert('コメントを削除しました');
      });
  }
}
