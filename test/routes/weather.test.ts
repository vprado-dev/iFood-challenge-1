/* eslint-disable @typescript-eslint/no-unused-vars */
import "../fixture";

import { request as req } from "../request";

const AUTHORIZATION_HEADER = {
  authorization: `Bearer ${process.env.API_TOKEN}`,
};

const request = req();

describe("/weather", () => {
  describe("400 - Bad Request", () => {
    test("POST /weather", async () => {
      expect.assertions(5);

      const res1 = await request
        .post("/weather")
        .set(AUTHORIZATION_HEADER)
        .send({});

      const res2 = await request
        .post("/weather")
        .set(AUTHORIZATION_HEADER)
        .send({ invalid: "body" });

      const res3 = await request
        .post("/weather")
        .set(AUTHORIZATION_HEADER)
        .send({
          lat: -22.9064,
        });

      const res4 = await request
        .post("/weather")
        .set(AUTHORIZATION_HEADER)
        .send({
          lat: -91,
          lon: -47.0616,
        });

      const res5 = await request
        .post("/weather")
        .set(AUTHORIZATION_HEADER)
        .send({
          lat: -22.9064,
          lon: -181,
        });

      expect(res1.status).toBe(400);
      expect(res2.status).toBe(400);
      expect(res3.status).toBe(400);
      expect(res4.status).toBe(400);
      expect(res5.status).toBe(400);
    });

    test("GET /weather", async () => {
      expect.assertions(1);

      const res = await request.get("/weather").set(AUTHORIZATION_HEADER);

      expect(res.status).toBe(400);
    });
  });

  describe("404 - Not Found", () => {
    test("GET /weather", async () => {
      expect.assertions(1);

      const res = await request
        .get("/weather?cityName=InvalidCity")
        .set(AUTHORIZATION_HEADER);

      expect(res.status).toBe(404);
    });
  });

  describe("401 - Unauthorized", () => {
    test("POST /weather", async () => {
      expect.assertions(1);

      const res = await request.post("/weather").send({
        lat: -22.9064,
        lon: -181,
      });

      expect(res.status).toBe(401);
    });

    test("GET /weather", async () => {
      expect.assertions(1);

      const res = await request.get("/weather?cityName=InvalidCity");

      expect(res.status).toBe(401);
    });
  });

  describe("200 - Ok", () => {
    test("POST /weather", async () => {
      expect.assertions(1);

      const res = await request
        .post("/weather")
        .set(AUTHORIZATION_HEADER)
        .send({
          lat: -22.9064,
          lon: -47.0616,
        });

      expect(res.status).toBe(200);
    });

    test("GET /weather", async () => {
      expect.assertions(1);

      const res = await request
        .get("/weather?cityName=bauru")
        .set(AUTHORIZATION_HEADER);

      expect(res.status).toBe(200);
    });
  });
});
