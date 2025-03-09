import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'alert-dialog',
  template: `
    <div>
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <mat-dialog-content>
        <p>{{ data.content }}</p>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button
          *ngFor="let btn of data.btnList"
          mat-button
          [style.width.%]="btnWidth"
          (click)="executeAction(btn)"
        >
          {{ btn.label }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  imports: [CommonModule, MatDialogModule],
})
export class AlertDialog implements OnInit {
  public btnWidth = 100;
  constructor(
    private dialogRef: MatDialogRef<AlertDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      btnList: any[];
      title: string;
      content: string;
    }
  ) {}

  ngOnInit(): void {
    if (this.data.btnList.length > 0) {
      this.btnWidth = 100 / this.data.btnList.length;
    }
  }

  executeAction(btn: { label: string; action?: () => void }) {
    if (btn.action) {
      btn.action(); // ✅ Call the provided function dynamically
    }
    this.dialogRef.close(); // ✅ Close dialog after action
  }
}
