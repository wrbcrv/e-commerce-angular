import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/models/perfil.modal';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  registerFormGroup!: FormGroup;
  perfis: Perfil[] = [];
  apiResponse: any = null;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });

    this.registerFormGroup = this.formBuilder.group({
      id: [null],
      nome: [null],
      sobrenome: [null],
      cpf: [null],
      rg: [null],
      login: [null],
      senha: [null],
      perfil: [null]
    })

    this.usuarioService.getPerfis().subscribe(data => {
      this.perfis = data;
      this.initializeForm();
    })
  }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      const email = this.loginFormGroup.get('email')!.value;
      const senha = this.loginFormGroup.get('senha')!.value;

      this.authService.login(email, senha).subscribe({
        next: (response) => {
          const role = this.authService.getUserRole();

          if (role === 'Admin')
            this.router.navigateByUrl('/admin/cidades/list');
          else
            this.router.navigateByUrl('/produtos');
        },
        error: (error) => {
          this.showSnackbarTopPosition("Usuário ou senha Inválidos", 'Fechar', 2000);
        }
      });
    } else {
      this.showSnackbarTopPosition("Dados inválidos", 'Fechar', 2000);
    }
  }

  onRegister() {
    if (this.registerFormGroup.valid) {
      const usuario = this.registerFormGroup.value as Usuario;

      if (usuario.id == null) {
        this.usuarioService.create(usuario).subscribe({
          next: (response) => {
            console.log('Usuario cadastrado com sucesso' + JSON.stringify(response));
            this.router.navigateByUrl('/login');
          },
          error: (error) => {
            this.apiResponse = error.error

            this.registerFormGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.registerFormGroup.get('sobrenome')?.setErrors({ apiError: this.getErrorMessage('sobrenome') });
            this.registerFormGroup.get('cpf')?.setErrors({ apiError: this.getErrorMessage('cpf') });
            this.registerFormGroup.get('rg')?.setErrors({ apiError: this.getErrorMessage('rg') });
            this.registerFormGroup.get('login')?.setErrors({ apiError: this.getErrorMessage('login') });
            this.registerFormGroup.get('senha')?.setErrors({ apiError: this.getErrorMessage('senha') });

            console.log('Erro ao incluir' + JSON.stringify(error));
          }
        });
      }
    }
  }

  initializeForm() {
    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];
    const perfil = this.perfis.find(perfis => perfis.id === (usuario?.perfil?.id || 2));

    const formValues = {
      id: [usuario?.id || null],
      nome: [usuario?.nome || null],
      sobrenome: [usuario?.sobrenome || null],
      cpf: [usuario?.cpf || null],
      rg: [usuario?.rg || null],
      login: [usuario?.login || null],
      senha: [usuario?.senha || null],
      perfil: [perfil]
    };

    this.registerFormGroup = this.formBuilder.group(formValues);
  }

  getErrorMessage(field: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.field === field);
    return error ? error.message : '';
  }

  showSnackbarTopPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  togglePanel(isSignIn: boolean): void {
    const container = document.getElementById('container');

    if (isSignIn)
      this.renderer.removeClass(container, 'right-panel-active');
    else
      this.renderer.addClass(container, 'right-panel-active');
  }
}