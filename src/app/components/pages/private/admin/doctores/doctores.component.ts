import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent implements OnInit {
  currentStep = 0;

  ngOnInit() {
    this.showStep(this.currentStep);
  }

  showStep(index: number) {
    const steps = document.querySelectorAll('.form-step');
    const indicators = document.querySelectorAll('.step');

    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
      indicators[i].classList.toggle('active', i === index);
    });

    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;

    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
    nextBtn.textContent = index === steps.length - 1 ? 'Registrar' : 'Siguiente';
  }

  nextStep() {
    const steps = document.querySelectorAll('.form-step');
    const currentInputs = steps[this.currentStep].querySelectorAll('input, select');

    for (let i = 0; i < currentInputs.length; i++) {
      const input = currentInputs[i] as HTMLInputElement;
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
    }

    if (this.currentStep === steps.length - 2) {
      this.fillReview();
    }

    if (this.currentStep === steps.length - 1) {
      alert("Doctor registrado con éxito.");
      return;
    }

    this.currentStep++;
    this.showStep(this.currentStep);
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep(this.currentStep);
    }
  }

  fillReview() {
    const inputs = document.querySelectorAll('input, select');
    const ids = [
      'rev-nombre', 'rev-apellido', 'rev-nacimiento', 'rev-cedula',
      'rev-ocupacion', 'rev-titulo', 'rev-experiencia', 'rev-genero',
      'rev-lugar', 'rev-tituloAcad', 'rev-graduacion',
      'rev-correo', 'rev-password'
    ];

    inputs.forEach((input, index) => {
      const span = document.getElementById(ids[index]);
      if (span) span.textContent = (input as HTMLInputElement).value;
    });
  }
}
