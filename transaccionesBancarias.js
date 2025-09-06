class CuentaBancaria {
  constructor(numeroCuenta, titular, saldoInicial) {
    this.numeroCuenta = numeroCuenta;
    this.titular = titular;
    this.saldo = saldoInicial;
  }

  depositar(monto) {
    if (monto <= 0) {
      console.log("El monto tiene que ser positivo");
      return;
    }
    this.saldo += monto;
    console.log("Deposito exitoso");
  }

  retirar(monto) {
    if (monto <= 0) {
      console.log("El monto tiene que ser positivo");
      return;
    }
    if (monto > this.saldo) {
      console.log("Fondos insuficientes");
      return;
    }
    this.saldo -= monto;
    console.log("Retiro exitoso");
  }
}

class Banco {
  constructor() {
    this.cuentas = [];
  }

  agregarCuenta(cuenta) {
    this.cuentas.push(cuenta);
    console.log("Cuenta agregada");
  }

  buscarCuenta(numeroCuenta) {
    return this.cuentas.find((cuenta) => cuenta.numeroCuenta === numeroCuenta);
  }

  realizarTransaccion(numeroCuenta, tipo, monto) {
    const cuenta = this.buscarCuenta(numeroCuenta);
    if (!cuenta) {
      console.log("Cuenta no encontrada");
      return;
    }
    if (tipo === "deposito") {
      cuenta.depositar(monto);
    } else if (tipo === "retiro") {
      cuenta.retirar(monto);
    } else {
      console.log("Intente un tipo de operacion valido");
    }
  }
}

// --- Simulación ---
console.log("Iniciando simulación bancaria...");

// Crear instancias
const miBanco = new Banco();
const cuentaAna = new CuentaBancaria(101, "Ana Gómez", 5000);
const cuentaCarlos = new CuentaBancaria(102, "Carlos Ruiz", 2500);

// Agregar cuentas al banco
miBanco.agregarCuenta(cuentaAna);
miBanco.agregarCuenta(cuentaCarlos);

// Realizar transacciones de prueba
console.log("\n--- Transacciones ---");

// 1. Depósito exitoso
miBanco.realizarTransaccion(101, "deposito", 1500);

// 2. Retiro exitoso
miBanco.realizarTransaccion(102, "retiro", 1000);

// 3. Retiro con fondos insuficientes (debe mostrar error)
miBanco.realizarTransaccion(101, "retiro", 10000);

// 4. Transacción en una cuenta que no existe (debe mostrar error)
miBanco.realizarTransaccion(999, "deposito", 500);

// 5. Ver saldos finales
console.log("\n--- Saldos Finales ---");
console.log(miBanco.cuentas);
