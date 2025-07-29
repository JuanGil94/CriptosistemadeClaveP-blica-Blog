const claves = {
  e: 7n,   // Exponente público
  d: 103n, // Exponente privado
  n: 187n  // Módulo (producto de dos primos)
};

function convertirTextoANumeros(texto) {
  return texto.split('').map(char => BigInt(char.charCodeAt(0)));
}

function convertirNumerosATexto(numeros) {
  return numeros.map(num => String.fromCharCode(Number(num))).join('');
}

function modExp(base, exponente, modulo) {
  let resultado = 1n;
  base = base % modulo;
  while (exponente > 0) {
    if (exponente % 2n === 1n) {
      resultado = (resultado * base) % modulo;
    }
    exponente = exponente / 2n;
    base = (base * base) % modulo;
  }
  return resultado;
}

function cifrarMensaje() {
  const mensaje = document.getElementById("mensaje").value;
  const numeros = convertirTextoANumeros(mensaje);
  const cifrado = numeros.map(n => modExp(n, claves.e, claves.n));
  document.getElementById("cifrado").innerText = cifrado.join(" ");
  document.getElementById("descifrado").innerText = "";
}

function descifrarMensaje() {
  const cifrado = document.getElementById("cifrado").innerText.trim();
  if (!cifrado) return;
  const numeros = cifrado.split(" ").map(n => BigInt(n));
  const descifrado = numeros.map(n => modExp(n, claves.d, claves.n));
  const texto = convertirNumerosATexto(descifrado);
  document.getElementById("descifrado").innerText = texto;
}
