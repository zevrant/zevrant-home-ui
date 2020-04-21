import {MatSnackBar} from "@angular/material/snack-bar";

export class SnackBarService {

  constructor( private snackBar: MatSnackBar) {
  }

  displayMessage(message: string, duration: number) {
    this.snackBar.open("Upload Successful!")
    new Promise( resolve => setTimeout(resolve, duration) ).then(() => {
      this.snackBar.dismiss();
    });
  }
}
