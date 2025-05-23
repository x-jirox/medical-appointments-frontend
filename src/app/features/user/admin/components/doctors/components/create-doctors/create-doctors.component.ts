import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-doctors',
  templateUrl: './create-doctors.component.html',
  styleUrls: ['./create-doctors.component.css']
})
export class CreateDoctorsComponent implements OnInit {
  currentStep = 0;

  // Mapeo entre el atributo 'name' del input y el id del span para mostrar revisión
  private fieldMap: { [key: string]: string } = {
    nombreCompleto: 'rev-nombreCompleto',
    fechaNacimiento: 'rev-fechaNacimiento',
    cedula: 'rev-cedula',
    telefono: 'rev-telefono',
    especialidad: 'rev-especialidad',
    cedulaProfesionales: 'rev-cedulaProfesionales',
    universidad: 'rev-universidad',
    aniosExperiencia: 'rev-aniosExperiencia',
    copiaTitulo: 'rev-copiaTitulo',
    copiaCedula: 'rev-copiaCedula',
    foto: 'rev-foto',
    email: 'rev-email',
    password: 'rev-password'
  };

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

    // Validación HTML5 nativa para todos los inputs del paso actual
    for (let i = 0; i < currentInputs.length; i++) {
      const input = currentInputs[i] as HTMLInputElement;
      if (!input.checkValidity()) {
        input.reportValidity();
        return; // si falla validación, no avanza
      }
    }

    // Si está a punto de ir al paso de revisión, llena el resumen
    if (this.currentStep === steps.length - 2) {
      this.fillReview();
    }

    // En el último paso, se debería enviar la solicitud al backend
    if (this.currentStep === steps.length - 1) {
      // Aquí puedes preparar el objeto con los datos y hacer la llamada HTTP
      this.submitForm();
      return; // detener avance
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
    // Por cada campo mapeado, busca input por 'name' y actualiza el span con el id correspondiente
    Object.entries(this.fieldMap).forEach(([name, spanId]) => {
      const input = document.querySelector(`[name="${name}"]`) as HTMLInputElement;
      const span = document.getElementById(spanId);
      if (input && span) {
        if (input.type === 'file') {
          span.textContent = input.files?.length ? input.files[0].name : 'No adjuntado';
        } else {
          span.textContent = input.value;
        }
      }
    });
  }

  submitForm() {
    // Ejemplo: recolectar datos del formulario para enviar al backend
    const formData = new FormData();

    Object.keys(this.fieldMap).forEach(name => {
      const input = document.querySelector(`[name="${name}"]`) as HTMLInputElement;
      if (input) {
        if (input.type === 'file') {
          if (input.files?.length) {
            formData.append(name, input.files[0]);
          }
        } else {
          formData.append(name, input.value);
        }
      }
    });

    // Aquí harías la llamada HTTP para enviar los datos
    // Ejemplo con HttpClient (requiere inyectar HttpClient en el constructor)
    // this.http.post('/api/doctores', formData).subscribe(response => {
    //   alert('Doctor registrado con éxito.');
    //   // Opcional: resetear formulario o navegar a otra página
    // }, error => {
    //   alert('Error al registrar doctor, intente de nuevo.');
    // });

    // Por ahora solo un alert para simular éxito
    alert('Doctor registrado con éxito.');
  }
}

