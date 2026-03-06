import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ProcessoService } from '../../processo.service';
import { Processo, StatusProcesso, TipoProcesso } from '../../processo.model';

function numeroProcessoValidator(ctrl: AbstractControl): ValidationErrors | null {
  const v = String(ctrl.value ?? '').trim();
  return /^\d{4}-\d{3}$/.test(v) ? null : { numeroInvalido: true };
}

@Component({
  selector: 'app-formulario-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class FormularioPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly processoService = inject(ProcessoService);

  readonly id = this.route.snapshot.paramMap.get('id');
  readonly editId = this.id ? Number(this.id) : null;

  readonly tipos: TipoProcesso[] = ['Cível', 'Criminal', 'Trabalhista', 'Família', 'Fiscal', 'Outro'];
  readonly status: StatusProcesso[] = ['Novo', 'Ativo', 'Concluído'];

  // ✅ inclui descricao
  readonly form = this.fb.nonNullable.group({
    cliente: ['', [Validators.required, Validators.minLength(3)]],
    numero: ['', [Validators.required, numeroProcessoValidator]],
    tipo: ['Cível' as TipoProcesso, [Validators.required]],
    status: ['Novo' as StatusProcesso, [Validators.required]],
    descricao: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor() {
    if (this.editId) {
      const existente = this.processoService.getById(this.editId);
      if (existente) this.form.patchValue(existente);
    }
  }

  get f() {
    return this.form.controls;
  }

  campoInvalido(nome: keyof typeof this.form.controls) {
    const c = this.form.controls[nome];
    return c.touched && c.invalid;
  }

  erroNumero(): string | null {
    const c = this.f.numero;
    if (!c.touched || !c.errors) return null;
    if (c.errors['required']) return 'Número é obrigatório.';
    if (c.errors['numeroInvalido']) return 'Formato inválido. Use YYYY-NNN (ex: 2026-001).';
    if (c.errors['duplicado']) return 'Já existe um processo com este número.';
    return 'Número inválido.';
  }

  submit() {
    const numero = this.form.value.numero?.trim() ?? '';

    if (this.processoService.numeroExiste(numero, this.editId ?? undefined)) {
      this.f.numero.setErrors({ ...(this.f.numero.errors ?? {}), duplicado: true });
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // payload agora TEM descricao
    const payload = this.form.getRawValue();

    if (this.editId) {
      const existente = this.processoService.getById(this.editId);
      if (!existente) return;

      const atualizado: Processo = { ...existente, ...payload };
      this.processoService.atualizar(atualizado);
      this.router.navigate(['/detalhe', atualizado.id]);
      return;
    }

    this.processoService.adicionar(payload);
    this.router.navigate(['/dashboard']);
  }
}