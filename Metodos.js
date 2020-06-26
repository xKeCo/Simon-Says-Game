const spanLevel = document.querySelector("#Level");
const spanScore = document.querySelector("#score");
spanLevel.innerHTML = 0;
spanScore.innerHTML = 0;
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 20;

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this);
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500);
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    spanLevel.innerHTML = this.nivel;
    this.score = 0;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map((n) => Math.floor(Math.random() * 4));
  }

  siguienteNivel() {
    this.subNivel = 0;
    this.iluminarSecuencia();
    this.agregarEventosClick();
  }

  transformarColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 800 * i);
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const NumeroColor = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);

    if (NumeroColor === this.secuencia[this.subNivel]) {
      this.subNivel++;

      if (this.subNivel === this.nivel) {
        this.nivel++;
        this.eliminarEventosClick();

        if (this.nivel === ULTIMO_NIVEL + 1) {
          //Ganador
          this.score += 100;
          spanScore.innerHTML = this.score;
          this.ganoElJuego();
        } else {
          this.score += 100;
          spanScore.innerHTML = this.score;
          this.mostrarNivel();
          setTimeout(this.siguienteNivel, 2000);
        }
      }
    } else {
      //Perdedor
      this.perdioElJuego();
    }
  }

  mostrarNivel() {
    swal("Bien hecho!", `Siguiente Nivel`, {
      buttons: false,
      timer: 800,
    });
    spanLevel.innerHTML = this.nivel;
  }

  ganoElJuego() {
    swal(
      "Ganaste el juego!!",
      `Felicitaciones, te ganaste la lavada de platos de mañana. Tu puntuacion es ${this.score}`,
      "success"
    ).then(this.inicializar);
    spanScore.innerHTML = 0;
  }
  perdioElJuego() {
    swal(
      "Perdiste!! :(",
      `Te toca lavar los platos mañana. Tu puntuacion es ${this.score}`,
      "error"
    ).then(() => {
      this.eliminarEventosClick();
      this.inicializar();
    });
    this.nivel = 0;
  }
}

var empezarJuego = () => {
  window.juego = new Juego();
};
