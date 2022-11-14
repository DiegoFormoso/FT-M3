const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => 
      agent
        .post('/sumArray').expect(200)
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .expect(200));

    it('responds with an object with the result true if a combination of two numbers get the target', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));


    it('responds with an object with the return false if does not exist a combination of two numbers', () => {
        return agent
          .post("/sumArray")
          .send({array: [1,2,3,4,5], num: 100})
          .then(res => {
            expect(res.body.result).toEqual(false);
        })
    });

    it('no puede sumar dos numeros iguales', () => {
        return agent
          .post("/sumArray")
          .send({array: [1, 2, 3, 4], num: 2})
          .then(res => {
            expect(res.body.result).toEqual(false);
          });
      });
  });

  describe("POST /numString", ()=> {
    it("responde con status 200", () => {
      return agent.post("/numString").send({string: "hola"}).expect(200);
    });
    it("responde con 4 si enviamos hola", () => {
      return agent
          .post("/numString").send({string: "hola"})
          .then(res => {
             expect(res.body.result).toEqual(4);
          })
    });
    it("responder con un status 400 (bad request) si el string es un número", () => {
      return agent.post("/numString").send({string: 5}).expect(400);
    });
    it("responder con un status 400 (bad request) si el string esta vacio", () => {
      return agent.post("/numString").send({string: ""}).expect(400);
    });
  });

  describe("POST /pluck", ()=> {
    it("responde con status 200", () => {
      return agent.post("/pluck")
      .send({
        array: [
          {nombre: "jorge", apellido:"pepe"}, 
          {nombre: "diego", apellido: "formo"}
        ], 
        string: "nombre"}).expect(200);
    });

    it("responde con la funcionalidad de pluck", () => {
      return agent.post("/pluck")
      .send({
        array: [
          {nombre: "jorge", apellido:"pepe"}, 
          {nombre: "diego", apellido: "formo"}
        ], 
        string: "nombre"})
        .then((response) => {
          expect(response.body.result).toEqual(["jorge", "diego"])
        });
    });

    it("responder con un status 400 (bad request) si array no es un arreglo", () => {
      return agent.post("/pluck")
      .send({array: "holis", string: "nombre"}).expect(400);
    });

    it("responder con un status 400 (bad request) si el string propiedad está vacio", () => {
      return agent.post("/pluck")
      .send({
        array: [
          {nombre: "jorge", apellido:"pepe"}, 
          {nombre: "diego", apellido: "formo"}
        ], 
        string: ""}).expect(400);
    });
  });
});