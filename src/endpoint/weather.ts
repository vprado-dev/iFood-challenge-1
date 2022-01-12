import { endpoint } from "../functions/endpoint";

export const weatherPostOne = endpoint(async (req, res) => {
  const { lat, lon } = req.body;

  console.log({ lat, lon });

  res.status(501).end();
});
