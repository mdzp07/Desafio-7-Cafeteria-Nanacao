const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("1. GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
        const response = await request(server).get("/cafes").send()
        const body = response.body
        const statusCode = response.statusCode

        expect(statusCode).toBe(200); //Status Code 200
        expect(body).toBeInstanceOf(Array); //Dato de tipo arreglo
        expect(body.length).toBeGreaterThan(0); //Contiene al menos 1 objeto
    })

    it("2. DELETE /cafes:id obtiene un código 404 al intentar eliminar un café con un id que no existe", async () => {
        const jwt = "token";
        const { statusCode } = await request(server)
            .delete("/cafes/5")
            .set("Authorization", jwt)
            .send();

        expect(statusCode).toBe(404) //Status code 404
    })

    it("3. POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
        const cafe = { id: 6, nombre: "nuevo cafe" };
        const response = await request(server)
            .post("/cafes")
            .send(cafe);

        const cafes = response.body;
        const statusCode = response.statusCode;

        expect(cafes).toContainEqual(cafe); //Agrega correctamente un nuevo cafe
        expect(statusCode).toBe(201); //Status Code 201
    });

    it("4. PUT /cafes devuelve un status code 400 al intentar actualizar un id diferente al id dentro del payload", async () => {
        const idEnParametros = "un id cualquiera"; //este es el ID que se pasará en los parámetros
        const cafe = { id: "un id diferente al del parámetro", nombre: "Nuevo cafe" }; //Se indica un ID diferente dentro del payload
        const { statusCode } = await request(server)
            .put(`/cafes/${idEnParametros}`)
            .send(cafe);

        expect(statusCode).toBe(400); //Status code 400
    });

});
