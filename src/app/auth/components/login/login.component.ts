import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const email = this.formGroup.get('email')!.value;
      const senha = this.formGroup.get('senha')!.value;
      
      this.authService.login(email, senha).subscribe({
        next: () => {
          this.router.navigateByUrl('/hardwares/card-list');
        },
        error: (err) => {
          this.showSnackbarTopPosition("Usuário ou senha Inválidos", 'Fechar', 2000);
        }
      });
    } else {
      this.showSnackbarTopPosition("Dados inválidos", 'Fechar', 2000);
    }
  }

  showSnackbarTopPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }
}